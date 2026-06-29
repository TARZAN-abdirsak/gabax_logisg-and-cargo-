import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import type { Booking } from '@/types/booking';
import { readCollection, writeCollection } from '@/lib/jsonStore';
import { updateBookingSchema } from '@/lib/schemas';
import { isAuthenticated } from '@/lib/auth';

const FILE = 'bookings.json';

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

  const all = await readCollection<Booking>(FILE);
  const index = all.findIndex((b) => b.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Booking not found' },
      { status: 404 },
    );
  }

  const updated: Booking = { ...all[index], status: parsed.data.status };
  all[index] = updated;
  await writeCollection(FILE, all);

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
  const all = await readCollection<Booking>(FILE);
  const next = all.filter((b) => b.id !== id);
  if (next.length === all.length) {
    return NextResponse.json(
      { success: false, error: 'Booking not found' },
      { status: 404 },
    );
  }

  await writeCollection(FILE, next);
  return NextResponse.json({ success: true, data: { id } });
}
