import type { ApiResponse } from '@/types/common';
import type {
  Booking,
  BookingStatus,
  CreateBookingInput,
} from '@/types/booking';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

async function parse<T>(response: Response): Promise<ApiResponse<T>> {
  const json = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !json.success) {
    throw new Error(json.error || `Request failed (${response.status})`);
  }
  return json;
}

/** List bookings (admin only). */
export async function fetchBookings(): Promise<Booking[]> {
  const response = await fetch(`${API_BASE}/bookings`, { cache: 'no-store' });
  const json = await parse<Booking[]>(response);
  return json.data ?? [];
}

export async function createBooking(
  input: CreateBookingInput,
): Promise<Booking> {
  const response = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = await parse<Booking>(response);
  return json.data!;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<Booking> {
  const response = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const json = await parse<Booking>(response);
  return json.data!;
}

export async function deleteBooking(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/bookings/${id}`, {
    method: 'DELETE',
  });
  await parse<{ id: string }>(response);
}
