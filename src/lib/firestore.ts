import { db } from './firebase';

/**
 * Thin Firestore helpers that mirror the old jsonStore API surface.
 *
 * Every function takes a collection name and works with plain objects
 * so the existing API routes need minimal changes.
 */

/** Get all documents from a collection, sorted by createdAt descending. */
export async function getAll<T>(collection: string): Promise<T[]> {
  const snapshot = await db
    .collection(collection)
    .orderBy('createdAt', 'desc')
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as T);
}

/** Get a single document by ID. Returns null if not found. */
export async function getById<T>(
  collection: string,
  id: string,
): Promise<T | null> {
  const doc = await db.collection(collection).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as T;
}

/** Add a new document with a specific ID. */
export async function addDoc(
  collection: string,
  id: string,
  data: Record<string, unknown>,
): Promise<void> {
  await db.collection(collection).doc(id).set(data);
}

/** Update fields on an existing document. */
export async function updateDoc(
  collection: string,
  id: string,
  data: Record<string, unknown>,
): Promise<boolean> {
  const ref = db.collection(collection).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.update(data);
  return true;
}

/** Delete a document. Returns false if it didn't exist. */
export async function deleteDoc(
  collection: string,
  id: string,
): Promise<boolean> {
  const ref = db.collection(collection).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return false;
  await ref.delete();
  return true;
}
