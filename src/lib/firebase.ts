import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Firebase Admin SDK — server-side only.
 *
 * Reads credentials from environment variables so nothing secret
 * lives in source code. In production these are set in Vercel's
 * environment-variables dashboard.
 */

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

function getApp() {
  if (getApps().length === 0) {
    return initializeApp({ credential: cert(serviceAccount) });
  }
  return getApps()[0];
}

export const db = getFirestore(getApp());
