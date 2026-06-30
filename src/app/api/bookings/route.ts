import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import type { ApiResponse } from '@/types/common';
import type { Booking } from '@/types/booking';
import { getAll, addDoc } from '@/lib/firestore';
import { createBookingSchema } from '@/lib/schemas';
import { isAuthenticated } from '@/lib/auth';

const COLLECTION = 'bookings';

/**
 * GET /api/bookings
 * List all bookings. Admin only.
 */
export async function GET(): Promise<NextResponse<ApiResponse<Booking[]>>> {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const all = await getAll<Booking>(COLLECTION);
  return NextResponse.json({ success: true, data: all });
}

/**
 * POST /api/bookings
 * Create a shipment booking. Public.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<Booking>>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = createBookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  const booking: Booking = {
    id: randomUUID(),
    serviceType: parsed.data.serviceType,
    origin: parsed.data.origin,
    destination: parsed.data.destination,
    weightKg: parsed.data.weightKg,
    description: parsed.data.description,
    preferredDate: parsed.data.preferredDate,
    deliveryMethod: parsed.data.deliveryMethod,
    contactName: parsed.data.contactName,
    contactPhone: parsed.data.contactPhone,
    contactEmail: parsed.data.contactEmail,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  await addDoc(COLLECTION, booking.id, { ...booking });

  return NextResponse.json(
    { success: true, data: booking, message: 'Booking received!' },
    { status: 201 },
  );
}
