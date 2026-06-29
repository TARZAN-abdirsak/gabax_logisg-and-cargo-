import { NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import { destroySession } from '@/lib/auth';

/**
 * POST /api/admin/logout
 * End the current admin session.
 */
export async function POST(): Promise<
  NextResponse<ApiResponse<{ authenticated: false }>>
> {
  await destroySession();
  return NextResponse.json({ success: true, data: { authenticated: false } });
}
