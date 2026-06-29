import type { Address, ContactInfo, ServiceType } from './common';

export type QuoteStatus = 'new' | 'contacted' | 'archived';

export interface QuoteRequest {
  serviceType: ServiceType;
  origin: Address;
  destination: Address;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  description: string;
  contact: ContactInfo;
  specialInstructions?: string;
  insurance: boolean;
  pickupDate: string;
}

export interface QuoteItem extends QuoteRequest {
  id: string;
  status: QuoteStatus;
  createdAt: string;
}

export const QUOTE_STATUSES: { value: QuoteStatus; label: string }[] = [
  { value: 'new', label: 'New Request' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'archived', label: 'Archived' },
];
