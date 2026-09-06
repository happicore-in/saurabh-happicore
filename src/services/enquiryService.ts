import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from '../lib/firebase';

export interface ProjectEnquiry {
  id: string;
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  budget: string;
  projectDetails: string;
  referenceLink?: string;
  createdAt: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';
}

const STORAGE_KEY = 'saurabh_portfolio_enquiries';

async function withFirestoreTimeout<T>(promise: Promise<T>, ms = 3000): Promise<T> {
  let timer: any;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(`Firestore request timed out after ${ms}ms`));
    }, ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer);
  }
}

export async function submitProjectEnquiry(
  enquiry: Omit<ProjectEnquiry, 'id' | 'createdAt' | 'status'>
): Promise<{ success: boolean; id: string; message: string }> {
  const generatedId = `ENQ_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const nowIso = new Date().toISOString();

  const payload = {
    name: enquiry.name,
    email: enquiry.email,
    projectType: enquiry.projectType,
    timeline: enquiry.timeline,
    budget: enquiry.budget,
    projectDetails: enquiry.projectDetails,
    referenceLink: enquiry.referenceLink || '',
    createdAt: nowIso,
    status: 'NEW' as const,
  };

  let firestoreId = generatedId;

  // Try submitting to Firestore with timeout
  try {
    const docRef = await withFirestoreTimeout(addDoc(collection(db, 'contactEnquiries'), payload), 4000);
    firestoreId = docRef.id;
  } catch (err) {
    console.warn('Firestore write warning (falling back to local cache):', err);
  }

  // Also cache locally for immediate offline/hybrid access
  try {
    const localEnquiry: ProjectEnquiry = {
      ...payload,
      id: firestoreId,
    };
    const existing = localStorage.getItem(STORAGE_KEY);
    const list: ProjectEnquiry[] = existing ? JSON.parse(existing) : [];
    list.unshift(localEnquiry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

    window.dispatchEvent(new CustomEvent('portfolio_enquiry_received', { detail: localEnquiry }));
  } catch (err) {
    console.warn('Local storage write warning:', err);
  }

  return {
    success: true,
    id: firestoreId,
    message: "Thanks! Your enquiry has been received. I'll get back to you soon.",
  };
}

export async function fetchAllEnquiries(): Promise<ProjectEnquiry[]> {
  try {
    const q = query(collection(db, 'contactEnquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await withFirestoreTimeout(getDocs(q), 3000);
    if (!snapshot.empty) {
      const items: ProjectEnquiry[] = [];
      snapshot.forEach((docSnap) => {
        const d = docSnap.data();
        items.push({
          id: docSnap.id,
          name: d.name || '',
          email: d.email || '',
          projectType: d.projectType || '',
          timeline: d.timeline || '',
          budget: d.budget || '',
          projectDetails: d.projectDetails || '',
          referenceLink: d.referenceLink || '',
          createdAt: d.createdAt || new Date().toISOString(),
          status: d.status || 'NEW',
        });
      });
      // Synchronize local cache
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return items;
    }
  } catch (err) {
    console.warn('Could not read from Firestore, reading from local cache:', err);
  }

  // Fallback to local cache
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}

export const getEnquiries = fetchAllEnquiries;

export async function updateEnquiryStatus(
  enquiryId: string,
  newStatus: ProjectEnquiry['status']
): Promise<boolean> {
  try {
    await updateDoc(doc(db, 'contactEnquiries', enquiryId), {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Firestore status update fallback to local:', err);
  }

  // Update local cache
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      const list: ProjectEnquiry[] = JSON.parse(existing);
      const updated = list.map((item) =>
        item.id === enquiryId ? { ...item, status: newStatus } : item
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return true;
  } catch {
    return false;
  }
}

export async function deleteEnquiry(enquiryId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'contactEnquiries', enquiryId));
  } catch (err) {
    console.warn('Firestore delete fallback to local:', err);
  }

  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      const list: ProjectEnquiry[] = JSON.parse(existing);
      const filtered = list.filter((item) => item.id !== enquiryId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    return true;
  } catch {
    return false;
  }
}

export function getStoredEnquiries(): ProjectEnquiry[] {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}
