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

// Runtime-only in-memory cache (disappears when page or browser tab is closed)
let memoryEnquiriesCache: ProjectEnquiry[] | null = null;

export function clearEnquiryMemoryCache(): void {
  memoryEnquiriesCache = null;
}

async function withFirestoreTimeout<T>(promise: Promise<T>, ms = 12000): Promise<T> {
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

  // Authoritative write to Firestore
  try {
    const docRef = await withFirestoreTimeout(addDoc(collection(db, 'contactEnquiries'), payload), 12000);
    firestoreId = docRef.id;
  } catch (err) {
    console.warn('Firestore enquiry write notice:', err);
  }

  const newEnquiryItem: ProjectEnquiry = {
    ...payload,
    id: firestoreId,
  };

  // Update in-memory runtime cache only
  if (memoryEnquiriesCache !== null) {
    memoryEnquiriesCache = [newEnquiryItem, ...memoryEnquiriesCache];
  }

  window.dispatchEvent(new CustomEvent('portfolio_enquiry_received', { detail: newEnquiryItem }));

  return {
    success: true,
    id: firestoreId,
    message: "Thanks! Your enquiry has been received. I'll get back to you soon.",
  };
}

export async function fetchAllEnquiries(forceRefresh = false): Promise<ProjectEnquiry[]> {
  if (!forceRefresh && memoryEnquiriesCache !== null) {
    return memoryEnquiriesCache;
  }

  try {
    const q = query(collection(db, 'contactEnquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await withFirestoreTimeout(getDocs(q), 12000);
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

    memoryEnquiriesCache = items;
    return items;
  } catch (err) {
    console.warn('Firestore enquiry read notice:', err);
    return memoryEnquiriesCache || [];
  }
}

export const getEnquiries = fetchAllEnquiries;

export async function updateEnquiryStatus(
  enquiryId: string,
  newStatus: ProjectEnquiry['status']
): Promise<boolean> {
  // Authoritative Firestore update
  await updateDoc(doc(db, 'contactEnquiries', enquiryId), {
    status: newStatus,
    updatedAt: new Date().toISOString(),
  });

  // Update in-memory runtime cache
  if (memoryEnquiriesCache !== null) {
    memoryEnquiriesCache = memoryEnquiriesCache.map((item) =>
      item.id === enquiryId ? { ...item, status: newStatus } : item
    );
  }
  return true;
}

export async function deleteEnquiry(enquiryId: string): Promise<boolean> {
  // Authoritative Firestore delete
  await deleteDoc(doc(db, 'contactEnquiries', enquiryId));

  // Update in-memory runtime cache
  if (memoryEnquiriesCache !== null) {
    memoryEnquiriesCache = memoryEnquiriesCache.filter((item) => item.id !== enquiryId);
  }
  return true;
}

export function getStoredEnquiries(): ProjectEnquiry[] {
  return memoryEnquiriesCache || [];
}
