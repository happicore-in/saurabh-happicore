import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  setLogLevel,
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import rawConfig from '../../firebase-applet-config.json';

// Suppress verbose backend connection retry warnings in console
try {
  setLogLevel('silent');
} catch {
  // ignore
}

// Ensure benign offline mode transitions and connection retry warnings don't pollute console error streams
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  console.error = (...args: any[]) => {
    const fullText = args.map((a) => (typeof a === 'string' ? a : a?.message || '')).join(' ');
    if (
      fullText.includes('Could not reach Cloud Firestore backend') ||
      fullText.includes('operate in offline mode') ||
      fullText.includes('[code=unavailable]')
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
  console.warn = (...args: any[]) => {
    const fullText = args.map((a) => (typeof a === 'string' ? a : a?.message || '')).join(' ');
    if (
      fullText.includes('Could not reach Cloud Firestore backend') ||
      fullText.includes('operate in offline mode') ||
      fullText.includes('[code=unavailable]')
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

// Active configuration with optional environment variable override for API key
export const firebaseConfig = {
  ...rawConfig,
  apiKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FIREBASE_API_KEY) || rawConfig.apiKey,
  databaseURL: rawConfig.databaseURL || 'https://saurah-happicore-default-rtdb.firebaseio.com',
};

// Initialize or reuse Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with auto-detect long polling so production web uses fast WebSockets while automatically falling back if proxies or firewalls block WebSockets
export const db = initializeFirestore(
  app,
  {
    experimentalAutoDetectLongPolling: true,
  },
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
    ? firebaseConfig.firestoreDatabaseId
    : undefined
);

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setLogLevel,
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
};
export type { User };


