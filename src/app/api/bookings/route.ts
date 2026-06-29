import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import type { ApiResponse } from '@/types/common';
import type { Booking } from '@/types/booking';
import { readCollection, writeCollection } from '@/lib/jsonStore';
import { createBookingSchema } from '@/lib/schemas';
import { isAuthenticated } from '@/lib/auth';

const FILE = 'bookings.json';

function byNewest(a: Booking, b: Booking): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

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

  const all = await readCollection<Booking>(FILE);
  return NextResponse.json({ success: true, data: [...all].sort(byNewest) });
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

  const all = await readCollection<Booking>(FILE);
  all.push(booking);
  await writeCollection(FILE, all);

  return NextResponse.json(
    { success: true, data: booking, message: 'Booking received!' },
    { status: 201 },
  );
}
