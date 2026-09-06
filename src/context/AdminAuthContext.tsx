import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '../lib/firebase';

interface AdminAuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  authNotice: string | null;
  signInWithEmail: (email: string, pass: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<boolean>;
  signInAsAdmin: (customEmail?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

/*
 * ============================================================
 * ADMIN CONFIGURATION
 * ============================================================
 *
 * ONLY THIS EMAIL IS ALLOWED TO ACCESS THE ADMIN PANEL.
 *
 * Firebase Authentication still verifies the actual password.
 * This email check only decides whether the authenticated user
 * is allowed to enter the admin dashboard.
 */
const ADMIN_EMAIL = 'happicore.in@gmail.com';

const ADMIN_STORAGE_KEY = 'saurabh_admin_session';

/*
 * Normalize email before comparing.
 */
const normalizeEmail = (email: string | null | undefined): string => {
  return (email || '').trim().toLowerCase();
};

/*
 * Check whether the authenticated Firebase user is the
 * authorized administrator.
 */
const isAuthorizedAdmin = (firebaseUser: User | null): boolean => {
  if (!firebaseUser?.email) {
    return false;
  }

  return normalizeEmail(firebaseUser.email) === ADMIN_EMAIL;
};

export function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [authNotice, setAuthNotice] = useState<string | null>(null);

  /*
   * ============================================================
   * FIREBASE AUTH STATE
   * ============================================================
   *
   * IMPORTANT:
   * We do NOT restore a fake/local admin user here.
   *
   * Only a real Firebase authenticated user can become admin.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        /*
         * No Firebase user = no admin access.
         */
        if (!currentUser) {
          setUser(null);
          localStorage.removeItem(ADMIN_STORAGE_KEY);
          setLoading(false);
          return;
        }

        /*
         * Firebase user exists.
         *
         * Now check whether their email is the ONLY
         * authorized admin email.
         */
        if (!isAuthorizedAdmin(currentUser)) {
          /*
           * Someone authenticated successfully with Firebase,
           * but they are NOT the authorized admin.
           *
           * Immediately sign them out.
           */
          await signOut(auth);

          setUser(null);
          localStorage.removeItem(ADMIN_STORAGE_KEY);

          setError(
            'This account is not authorized to access the admin panel.'
          );

          setLoading(false);
          return;
        }

        /*
         * Authorized admin.
         */
        setUser(currentUser);

        localStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({
            email: currentUser.email,
            uid: currentUser.uid,
            type: 'firebase',
          })
        );

        setLoading(false);
      } catch (err) {
        console.error('Admin auth state error:', err);

        setUser(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  /*
   * ============================================================
   * CLEAR ERROR
   * ============================================================
   */
  const clearError = () => {
    setError(null);
    setAuthNotice(null);
  };

  /*
   * ============================================================
   * EMAIL + PASSWORD LOGIN
   * ============================================================
   *
   * REAL FIREBASE AUTH ONLY.
   *
   * There is NO fallback login.
   * There is NO fake user.
   * There is NO "password length >= 4" bypass.
   */
  const signInWithEmail = async (
    email: string,
    pass: string
  ): Promise<boolean> => {
    setError(null);
    setAuthNotice(null);

    const normalizedEmail = normalizeEmail(email);

    /*
     * First make sure the entered email is the authorized
     * administrator email.
     */
    if (normalizedEmail !== ADMIN_EMAIL) {
      setError('This email is not authorized to access the admin panel.');
      return false;
    }

    /*
     * Basic validation.
     */
    if (!pass.trim()) {
      setError('Please enter your password.');
      return false;
    }

    try {
      /*
       * Firebase now checks the REAL password.
       */
      const credential = await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        pass
      );

      const firebaseUser = credential.user;

      /*
       * Double-check the authenticated account.
       */
      if (!isAuthorizedAdmin(firebaseUser)) {
        await signOut(auth);

        setUser(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);

        setError(
          'This account is not authorized to access the admin panel.'
        );

        return false;
      }

      /*
       * Save only the real Firebase session information.
       */
      localStorage.setItem(
        ADMIN_STORAGE_KEY,
        JSON.stringify({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          type: 'firebase',
        })
      );

      setUser(firebaseUser);

      return true;
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;

      /*
       * IMPORTANT:
       * NEVER create a local/fake admin session here.
       */

      switch (code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          setError('Wrong password. Please try again.');
          break;

        case 'auth/user-not-found':
          setError('This admin account does not exist.');
          break;

        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;

        case 'auth/too-many-requests':
          setError(
            'Too many failed attempts. Please wait a while and try again.'
          );
          break;

        case 'auth/operation-not-allowed':
          setError(
            'Email/password authentication is not enabled in Firebase.'
          );
          break;

        case 'auth/network-request-failed':
          setError(
            'Network error. Please check your internet connection and try again.'
          );
          break;

        default:
          setError(
            'Unable to sign in. Please check your email and password.'
          );
          break;
      }

      return false;
    }
  };

  /*
   * ============================================================
   * GOOGLE LOGIN
   * ============================================================
   *
   * Google authentication is allowed ONLY when the Google
   * account email matches ADMIN_EMAIL.
   */
  const signInWithGoogle = async (): Promise<boolean> => {
    setError(null);
    setAuthNotice(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;

      /*
       * Check Google account email.
       */
      if (!isAuthorizedAdmin(firebaseUser)) {
        await signOut(auth);

        setUser(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);

        setError(
          `Only ${ADMIN_EMAIL} is authorized to access the admin panel.`
        );

        return false;
      }

      /*
       * Authorized Google account.
       */
      localStorage.setItem(
        ADMIN_STORAGE_KEY,
        JSON.stringify({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          type: 'firebase',
        })
      );

      setUser(firebaseUser);

      return true;
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code;

      /*
       * DO NOT FALL BACK TO LOCAL ADMIN LOGIN.
       */

      switch (code) {
        case 'auth/popup-closed-by-user':
          setError('Google sign-in was cancelled.');
          break;

        case 'auth/popup-blocked':
          setError(
            'Google sign-in popup was blocked. Please allow popups and try again.'
          );
          break;

        case 'auth/unauthorized-domain':
          setError(
            'This website domain is not authorized in Firebase Authentication.'
          );
          break;

        case 'auth/account-exists-with-different-credential':
          setError(
            'An account already exists with a different sign-in method.'
          );
          break;

        case 'auth/network-request-failed':
          setError(
            'Network error. Please check your internet connection and try again.'
          );
          break;

        default:
          setError('Google sign-in failed. Please try again.');
          break;
      }

      return false;
    }
  };

  /*
   * ============================================================
   * SIGN IN AS ADMIN
   * ============================================================
   *
   * IMPORTANT:
   * This function must NEVER create a fake/local user.
   *
   * We keep the function because your existing app interface
   * expects it, but it now simply verifies whether a real
   * Firebase session belongs to the authorized admin.
   */
  const signInAsAdmin = async (
    customEmail: string = ADMIN_EMAIL
  ): Promise<boolean> => {
    setError(null);
    setAuthNotice(null);

    const normalizedEmail = normalizeEmail(customEmail);

    /*
     * Reject every email except the authorized admin email.
     */
    if (normalizedEmail !== ADMIN_EMAIL) {
      setError('This email is not authorized to access the admin panel.');
      return false;
    }

    /*
     * Check current REAL Firebase authentication.
     */
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setError('Please sign in with the administrator account first.');
      return false;
    }

    if (!isAuthorizedAdmin(currentUser)) {
      await signOut(auth);

      setUser(null);
      localStorage.removeItem(ADMIN_STORAGE_KEY);

      setError('This account is not authorized to access the admin panel.');

      return false;
    }

    setUser(currentUser);

    return true;
  };

  /*
   * ============================================================
   * LOGOUT
   * ============================================================
   */
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Firebase sign out error:', err);
    }

    localStorage.removeItem(ADMIN_STORAGE_KEY);

    setUser(null);
    setAuthNotice(null);
    setError(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        loading,
        error,
        authNotice,
        signInWithEmail,
        signInWithGoogle,
        signInAsAdmin,
        logout,
        clearError,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      'useAdminAuth must be used within an AdminAuthProvider'
    );
  }

  return context;
}
