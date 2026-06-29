import type { Metadata } from 'next';
import { Package } from 'lucide-react';
import { BookingForm } from '@/components/forms/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Shipment',
  description:
    'Book a container or air freight shipment with Gabax Logistics. Tell us your route, weight, and timing.',
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-accent">
            <Package className="h-3.5 w-3.5" />
            Book a Shipment
          </span>
          <h1 className="mt-3 text-4xl font-bold text-brand-navy sm:text-5xl tracking-wider uppercase">
            Book Your Cargo
          </h1>
          <p className="mt-2 text-slate-500">
            Container or air freight — tell us the details and our team will
            confirm.
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
