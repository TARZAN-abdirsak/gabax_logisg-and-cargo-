/**
 * Common types used across the application.
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  coordinates?: Coordinates;
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
}

export type ServiceType = 'air-freight' | 'sea-freight' | 'land-transport' | 'cargo';

export type ShipmentStatus =
  | 'pending'
  | 'picked-up'
  | 'in-transit'
  | 'customs'
  | 'out-for-delivery'
  | 'delivered'
  | 'exception';
