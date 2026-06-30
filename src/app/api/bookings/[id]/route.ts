import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import type { Booking } from '@/types/booking';
import { getById, updateDoc, deleteDoc } from '@/lib/firestore';
import { updateBookingSchema } from '@/lib/schemas';
import { isAuthenticated } from '@/lib/auth';

const COLLECTION = 'bookings';

type Params = { params: Promise<{ id: string }> };

/**
 * PATCH /api/bookings/:id
 * Update booking status. Admin only.
 */
export async function PATCH(
  request: NextRequest,
  { params }: Params,
): Promise<NextResponse<ApiResponse<Booking>>> {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = updateBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  const existing = await getById<Booking>(COLLECTION, id);
  if (!existing) {
    return NextResponse.json(
      { success: false, error: 'Booking not found' },
      { status: 404 },
    );
  }

  await updateDoc(COLLECTION, id, { status: parsed.data.status });
  const updated: Booking = { ...existing, status: parsed.data.status };

  return NextResponse.json({ success: true, data: updated });
}

/**
 * DELETE /api/bookings/:id
 * Remove a booking. Admin only.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: Params,
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const { id } = await params;
  const deleted = await deleteDoc(COLLECTION, id);
  if (!deleted) {
    return NextResponse.json(
      { success: false, error: 'Booking not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: { id } });
}
