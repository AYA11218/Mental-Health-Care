import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  onSnapshot,
  Unsubscribe,
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { Review } from '../types';

const REVIEWS_COLLECTION = 'reviews';
const LOCAL_REVIEWS_KEY = 'selamcare_local_reviews';

export function getLocalReviews(): Review[] {
  try {
    const raw = localStorage.getItem(LOCAL_REVIEWS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalReviews(reviews: Review[]): void {
  try {
    localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.error('Failed to save reviews to local storage', e);
  }
}

export interface NewReviewInput {
  psychiatristId: string;
  rating: number;
  comment: string;
  isAnonymous: boolean;
  appointmentId?: string;
  verifiedSession?: boolean;
}

/**
 * Submit an anonymous or attributed review to Firestore
 */
export async function submitReview(input: NewReviewInput): Promise<Review> {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) {
    throw new Error('You must be signed in to submit a review.');
  }

  const reviewId = `rev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const displayName = auth.currentUser?.displayName || auth.currentUser?.email?.split('@')[0] || 'Patient';

  const newReview: Review = {
    id: reviewId,
    psychiatristId: input.psychiatristId,
    userId: currentUid,
    userName: input.isAnonymous ? 'Anonymous Patient' : displayName,
    isAnonymous: input.isAnonymous,
    rating: input.rating,
    comment: input.comment,
    date: new Date().toISOString().split('T')[0],
    verifiedSession: input.verifiedSession ?? true,
    appointmentId: input.appointmentId,
  };

  try {
    const docRef = doc(db, REVIEWS_COLLECTION, reviewId);
    await setDoc(docRef, newReview);

    // Update local cache
    const existing = getLocalReviews();
    saveLocalReviews([newReview, ...existing.filter(r => r.id !== reviewId)]);

    return newReview;
  } catch (error) {
    console.warn('Firestore review write failed, caching locally:', error);
    const existing = getLocalReviews();
    saveLocalReviews([newReview, ...existing.filter(r => r.id !== reviewId)]);

    try {
      handleFirestoreError(error, OperationType.WRITE, `${REVIEWS_COLLECTION}/${reviewId}`);
    } catch {
      // Allow local fallback
    }
    return newReview;
  }
}

/**
 * Fetch reviews for a psychiatrist from Firestore and local cache
 */
export async function fetchPsychiatristReviews(psychiatristId: string): Promise<Review[]> {
  const localList = getLocalReviews().filter(r => r.psychiatristId === psychiatristId);
  try {
    const q = query(collection(db, REVIEWS_COLLECTION), where('psychiatristId', '==', psychiatristId));
    const snapshot = await getDocs(q);
    const serverList: Review[] = [];
    snapshot.forEach(docSnap => {
      serverList.push(docSnap.data() as Review);
    });

    const combinedMap = new Map<string, Review>();
    localList.forEach(r => combinedMap.set(r.id, r));
    serverList.forEach(r => combinedMap.set(r.id, r));

    return Array.from(combinedMap.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.warn('Could not query Firestore reviews:', error);
    return localList;
  }
}

/**
 * Subscribe in real-time to reviews for a psychiatrist
 */
export function subscribeToPsychiatristReviews(
  psychiatristId: string,
  onUpdate: (reviews: Review[]) => void
): Unsubscribe {
  const q = query(collection(db, REVIEWS_COLLECTION), where('psychiatristId', '==', psychiatristId));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: Review[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as Review);
      });
      list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      const localList = getLocalReviews().filter(r => r.psychiatristId === psychiatristId);
      const combinedMap = new Map<string, Review>();
      localList.forEach(r => combinedMap.set(r.id, r));
      list.forEach(r => combinedMap.set(r.id, r));

      onUpdate(Array.from(combinedMap.values()));
    },
    (error) => {
      console.warn('Realtime reviews snapshot error:', error);
      const localList = getLocalReviews().filter(r => r.psychiatristId === psychiatristId);
      onUpdate(localList);
    }
  );
}
