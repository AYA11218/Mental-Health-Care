import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { handleFirestoreError, OperationType } from '../firebase/errors';
import { UserProfile, Language } from '../types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, pass: string, displayName: string, phone?: string) => Promise<void>;
  logIn: (email: string, pass: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  updateUserLanguagePreference: (lang: Language) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch or create user profile from Firestore
  const fetchUserProfile = async (user: User): Promise<UserProfile> => {
    const userDocRef = doc(db, 'users', user.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        setUserProfile(data);
        return data;
      } else {
        // Create initial profile if missing
        const newProfile: UserProfile = {
          id: user.uid,
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'Patient',
          role: user.email === 'ayanatamene80@gmail.com' ? 'admin' : 'patient',
          language: 'en',
          createdAt: new Date().toISOString(),
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
        return newProfile;
      }
    } catch (error) {
      console.warn('Could not read user profile from Firestore, using fallback auth data', error);
      const fallbackProfile: UserProfile = {
        id: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Patient',
        role: user.email === 'ayanatamene80@gmail.com' ? 'admin' : 'patient',
        language: 'en',
        createdAt: new Date().toISOString(),
      };
      setUserProfile(fallbackProfile);
      return fallbackProfile;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, pass: string, displayName: string, phone?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    const profile: UserProfile = {
      id: cred.user.uid,
      email,
      displayName,
      phone: phone || '',
      role: email === 'ayanatamene80@gmail.com' ? 'admin' : 'patient',
      language: 'en',
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'users', cred.user.uid), profile);
      setUserProfile(profile);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${cred.user.uid}`);
    }
  };

  const logIn = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    await fetchUserProfile(cred.user);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await fetchUserProfile(cred.user);
  };

  const logOut = async () => {
    await fbSignOut(auth);
    setUserProfile(null);
    setCurrentUser(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const refreshUserProfile = async () => {
    if (auth.currentUser) {
      await fetchUserProfile(auth.currentUser);
    }
  };

  const updateUserLanguagePreference = async (lang: Language) => {
    if (!currentUser) return;
    try {
      const ref = doc(db, 'users', currentUser.uid);
      await setDoc(ref, { language: lang }, { merge: true });
      if (userProfile) {
        setUserProfile({ ...userProfile, language: lang });
      }
    } catch {
      // Ignored non-critical update failure
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        signUp,
        logIn,
        signInWithGoogle,
        logOut,
        resetPassword,
        refreshUserProfile,
        updateUserLanguagePreference,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
