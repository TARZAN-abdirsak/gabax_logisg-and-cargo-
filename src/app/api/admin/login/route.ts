import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import { verifyPassword, createSession } from '@/lib/auth';

/**
 * POST /api/admin/login
 * Validate the admin password and start a session.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<{ authenticated: true }>>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const password = (body as { password?: unknown })?.password;
  if (!verifyPassword(password)) {
    return NextResponse.json(
      { success: false, error: 'Incorrect password' },
      { status: 401 },
    );
  }

  await createSession();
  return NextResponse.json({ success: true, data: { authenticated: true } });
}
