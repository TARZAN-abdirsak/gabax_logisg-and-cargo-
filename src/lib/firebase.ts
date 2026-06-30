import { initializeApp, getApps, cert, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

/**
 * Firebase Admin SDK — server-side only.
 *
 * Reads credentials from environment variables so nothing secret
 * lives in source code. In production these are set in Vercel's
 * environment-variables dashboard.
 */

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

const hasCredentials = !!(projectId && clientEmail && privateKey);

function getApp() {
  if (!hasCredentials) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('WARNING: Firebase credentials are missing. Deferring initialization.');
    }
    return null;
  }

  if (getApps().length === 0) {
    const serviceAccount: ServiceAccount = {
      projectId,
      clientEmail,
      privateKey: privateKey?.replace(/\\n/g, '\n'),
    };
    return initializeApp({ credential: cert(serviceAccount) });
  }
  return getApps()[0];
}

const app = getApp();
export const db = app ? getFirestore(app) : null as any;
