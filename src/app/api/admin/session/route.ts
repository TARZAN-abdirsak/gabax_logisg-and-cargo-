import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import { isAuthenticated } from '@/lib/auth';

/**
 * GET /api/admin/session
 * Report whether the current request has a valid admin session.
 */
export async function GET(): Promise<
  NextResponse<ApiResponse<{ authenticated: boolean }>>
> {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ success: true, data: { authenticated } });
}
