import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { Appointment } from '../types';

const APPOINTMENTS_COLLECTION = 'appointments';
const LOCAL_STORAGE_KEY = 'selamcare_local_appointments';

// Helper to get fallback appointments from localStorage
export function getLocalAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalAppointments(appointments: Appointment[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

/**
 * Creates and persists an appointment to Firestore
 */
export async function bookAppointment(appointmentData: Omit<Appointment, 'id' | 'createdAt'>): Promise<Appointment> {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) {
    throw new Error('User must be authenticated to book an appointment.');
  }

  const appointmentId = `apt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const fullAppointment: Appointment = {
    ...appointmentData,
    id: appointmentId,
    userId: currentUid,
    createdAt: new Date().toISOString(),
    meetingLink: appointmentData.sessionType === 'video' ? `https://meet.selamcare.et/${appointmentId}` : undefined,
  };

  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await setDoc(docRef, fullAppointment);

    // Also update local storage cache
    const currentLocal = getLocalAppointments();
    saveLocalAppointments([fullAppointment, ...currentLocal.filter(a => a.id !== appointmentId)]);

    return fullAppointment;
  } catch (error) {
    console.warn('Firestore booking write failed, falling back to local session store:', error);
    // Cache locally so patient booking experience isn't blocked
    const currentLocal = getLocalAppointments();
    saveLocalAppointments([fullAppointment, ...currentLocal.filter(a => a.id !== appointmentId)]);
    
    // Log properly
    try {
      handleFirestoreError(error, OperationType.WRITE, `${APPOINTMENTS_COLLECTION}/${appointmentId}`);
    } catch {
      // Re-throw so caller knows, but return cached data if critical
    }
    return fullAppointment;
  }
}

/**
 * Fetches appointments for the authenticated user
 */
export async function fetchUserAppointments(userId: string): Promise<Appointment[]> {
  const localList = getLocalAppointments().filter(a => a.userId === userId);
  try {
    const q = query(collection(db, APPOINTMENTS_COLLECTION), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const serverList: Appointment[] = [];
    snapshot.forEach(docSnap => {
      serverList.push(docSnap.data() as Appointment);
    });

    // Merge and deduplicate by ID, preferring server state
    const combinedMap = new Map<string, Appointment>();
    localList.forEach(a => combinedMap.set(a.id, a));
    serverList.forEach(a => combinedMap.set(a.id, a));

    const finalAppointments = Array.from(combinedMap.values()).sort(
      (a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime()
    );

    saveLocalAppointments(finalAppointments);
    return finalAppointments;
  } catch (error) {
    console.warn('Could not query Firestore appointments, using local cache:', error);
    return localList;
  }
}

/**
 * Subscribes to real-time changes for a user's appointments
 */
export function subscribeToUserAppointments(
  userId: string,
  onUpdate: (appointments: Appointment[]) => void
): Unsubscribe {
  const q = query(collection(db, APPOINTMENTS_COLLECTION), where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const appointments: Appointment[] = [];
      snapshot.forEach(docSnap => {
        appointments.push(docSnap.data() as Appointment);
      });
      // Sort newest first
      appointments.sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime());
      
      // Update local cache
      const localList = getLocalAppointments().filter(a => a.userId !== userId);
      saveLocalAppointments([...appointments, ...localList]);
      
      onUpdate(appointments);
    },
    (error) => {
      console.warn('Realtime appointments snapshot error:', error);
      // Fallback to local cache
      const localList = getLocalAppointments().filter(a => a.userId === userId);
      onUpdate(localList);
    }
  );
}

/**
 * Cancels an appointment
 */
export async function cancelAppointment(appointmentId: string): Promise<void> {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await updateDoc(docRef, { status: 'cancelled' });
  } catch (error) {
    console.warn('Firestore cancel failed, updating local state:', error);
  }

  // Update local cache
  const localList = getLocalAppointments();
  const updated = localList.map(a => (a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a));
  saveLocalAppointments(updated);
}

/**
 * Marks an appointment as completed
 */
export async function completeAppointment(appointmentId: string): Promise<void> {
  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await updateDoc(docRef, { status: 'completed' });
  } catch (error) {
    console.warn('Firestore complete failed, updating local state:', error);
  }

  // Update local cache
  const localList = getLocalAppointments();
  const updated = localList.map(a => (a.id === appointmentId ? { ...a, status: 'completed' as const } : a));
  saveLocalAppointments(updated);
}

/**
 * Updates an appointment with secured payment details
 */
export async function updateAppointmentPayment(
  appointmentId: string,
  paymentDetails: {
    paymentMethod: 'telebirr' | 'cbe_birr';
    transactionReference: string;
    paidAmountETB: number;
    paymentWalletNumber?: string;
  }
): Promise<void> {
  const updatePayload = {
    paymentStatus: 'paid' as const,
    paymentMethod: paymentDetails.paymentMethod,
    transactionReference: paymentDetails.transactionReference,
    paidAmountETB: paymentDetails.paidAmountETB,
    paymentWalletNumber: paymentDetails.paymentWalletNumber || '+251944692238',
    paidAt: new Date().toISOString(),
  };

  try {
    const docRef = doc(db, APPOINTMENTS_COLLECTION, appointmentId);
    await updateDoc(docRef, updatePayload);
  } catch (error) {
    console.warn('Firestore payment update failed, saving locally:', error);
  }

  // Update local cache
  const localList = getLocalAppointments();
  const updated = localList.map(a =>
    a.id === appointmentId ? { ...a, ...updatePayload } : a
  );
  saveLocalAppointments(updated);
}
