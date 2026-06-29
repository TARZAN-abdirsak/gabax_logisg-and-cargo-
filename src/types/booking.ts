/**
 * Shipment bookings submitted by users and managed by admins.
 */

export type BookingServiceType = 'container' | 'air';
export type DeliveryMethod = 'office-pickup' | 'door-delivery';
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface Booking {
  id: string;
  serviceType: BookingServiceType;
  /** Pickup location. */
  origin: string;
  /** Delivery location. */
  destination: string;
  weightKg: number;
  description?: string;
  /** Date the user wants the shipment to move (YYYY-MM-DD). */
  preferredDate: string;
  deliveryMethod: DeliveryMethod;
  contactName: string;
  contactPhone?: string;
  contactEmail?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface CreateBookingInput {
  serviceType: BookingServiceType;
  origin: string;
  destination: string;
  weightKg: number;
  description?: string;
  preferredDate: string;
  deliveryMethod: DeliveryMethod;
  contactName: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface UpdateBookingInput {
  status: BookingStatus;
}

export const BOOKING_SERVICES: {
  value: BookingServiceType;
  label: string;
  hint: string;
}[] = [
  { value: 'container', label: 'Container', hint: 'Sea freight' },
  { value: 'air', label: 'Air Freight', hint: 'By plane' },
];

export const DELIVERY_METHODS: {
  value: DeliveryMethod;
  label: string;
  hint: string;
}[] = [
  { value: 'office-pickup', label: 'Office Pickup', hint: 'Collect at our office' },
  { value: 'door-delivery', label: 'Door Delivery', hint: 'Delivered to your door' },
];

export const BOOKING_STATUSES: { value: BookingStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];
