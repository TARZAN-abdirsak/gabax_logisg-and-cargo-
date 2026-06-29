import { cookies } from 'next/headers';

/**
 * Minimal cookie-based admin authentication.
 *
 * The admin password comes from the `ADMIN_PASSWORD` environment variable
 * (falling back to a dev default). On a successful login an http-only session
 * cookie is set; mutating API routes verify it before allowing writes.
 */

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gabax-admin';
const SESSION_COOKIE = 'gabax_admin_session';

/** Opaque token stored in the cookie — never the raw password. */
const SESSION_TOKEN = `v1.${Buffer.from(ADMIN_PASSWORD).toString('base64url')}`;

const EIGHT_HOURS = 60 * 60 * 8;

export function verifyPassword(password: unknown): boolean {
  return typeof password === 'string' && password === ADMIN_PASSWORD;
}

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, SESSION_TOKEN, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: EIGHT_HOURS,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === SESSION_TOKEN;
}
