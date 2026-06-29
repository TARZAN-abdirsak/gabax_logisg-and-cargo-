'use client';

import { useState, type FormEvent } from 'react';
import {
  Ship,
  Plane,
  Building2,
  Home,
  CheckCircle2,
  Package,
} from 'lucide-react';
import { useCreateBooking } from '@/hooks/useBookings';
import {
  BOOKING_SERVICES,
  DELIVERY_METHODS,
  type BookingServiceType,
  type DeliveryMethod,
} from '@/types/booking';

const SERVICE_ICON: Record<BookingServiceType, typeof Ship> = {
  container: Ship,
  air: Plane,
};

const DELIVERY_ICON: Record<DeliveryMethod, typeof Building2> = {
  'office-pickup': Building2,
  'door-delivery': Home,
};

interface BookingFormData {
  serviceType: BookingServiceType;
  origin: string;
  destination: string;
  weightKg: string;
  preferredDate: string;
  deliveryMethod: DeliveryMethod;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  description: string;
}

const initialData: BookingFormData = {
  serviceType: 'container',
  origin: '',
  destination: '',
  weightKg: '',
  preferredDate: '',
  deliveryMethod: 'office-pickup',
  contactName: '',
  contactPhone: '',
  contactEmail: '',
  description: '',
};

const inputClass =
  'mt-1 block w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20';

export function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(initialData);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync, isPending, isSuccess, reset } = useCreateBooking();

  const set = <K extends keyof BookingFormData>(
    key: K,
    value: BookingFormData[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const weight = Number(form.weightKg);
    if (!Number.isFinite(weight) || weight <= 0) {
      setError('Please enter a valid weight in kg.');
      return;
    }
    if (!form.contactPhone.trim() && !form.contactEmail.trim()) {
      setError('Please provide a phone number or email.');
      return;
    }

    try {
      await mutateAsync({
        serviceType: form.serviceType,
        origin: form.origin,
        destination: form.destination,
        weightKg: weight,
        preferredDate: form.preferredDate,
        deliveryMethod: form.deliveryMethod,
        contactName: form.contactName,
        contactPhone: form.contactPhone.trim() || undefined,
        contactEmail: form.contactEmail.trim() || undefined,
        description: form.description.trim() || undefined,
      });
      setForm(initialData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold text-emerald-800">
          Booking received!
        </h3>
        <p className="mt-1 text-sm text-emerald-700">
          Our team will contact you shortly to confirm the details.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Service type */}
      <div>
        <span className="block text-sm font-medium text-brand-navy">
          Service type
        </span>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {BOOKING_SERVICES.map((s) => {
            const Icon = SERVICE_ICON[s.value];
            const active = form.serviceType === s.value;
            return (
              <button
                type="button"
                key={s.value}
                onClick={() => set('serviceType', s.value)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  active
                    ? 'border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20'
                    : 'border-black/10 hover:border-brand-blue/40'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    active ? 'bg-brand-blue text-white' : 'bg-black/5 text-brand-navy'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-brand-navy">
                    {s.label}
                  </span>
                  <span className="block text-xs text-brand-navy/50">
                    {s.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Route */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-origin" className="block text-sm font-medium text-brand-navy">
            Pickup location
          </label>
          <input
            id="bk-origin"
            type="text"
            required
            value={form.origin}
            onChange={(e) => set('origin', e.target.value)}
            placeholder="e.g. Shanghai, CN"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="bk-dest" className="block text-sm font-medium text-brand-navy">
            Delivery location
          </label>
          <input
            id="bk-dest"
            type="text"
            required
            value={form.destination}
            onChange={(e) => set('destination', e.target.value)}
            placeholder="e.g. Mogadishu, SO"
            className={inputClass}
          />
        </div>
      </div>

      {/* Weight + date */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-weight" className="block text-sm font-medium text-brand-navy">
            Weight (kg)
          </label>
          <input
            id="bk-weight"
            type="number"
            required
            min={1}
            step="any"
            value={form.weightKg}
            onChange={(e) => set('weightKg', e.target.value)}
            placeholder="e.g. 250"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="bk-date" className="block text-sm font-medium text-brand-navy">
            Preferred date
          </label>
          <input
            id="bk-date"
            type="date"
            required
            value={form.preferredDate}
            onChange={(e) => set('preferredDate', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Delivery method */}
      <div>
        <span className="block text-sm font-medium text-brand-navy">
          Delivery method
        </span>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {DELIVERY_METHODS.map((m) => {
            const Icon = DELIVERY_ICON[m.value];
            const active = form.deliveryMethod === m.value;
            return (
              <button
                type="button"
                key={m.value}
                onClick={() => set('deliveryMethod', m.value)}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  active
                    ? 'border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue/20'
                    : 'border-black/10 hover:border-brand-blue/40'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    active ? 'bg-brand-blue text-white' : 'bg-black/5 text-brand-navy'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-brand-navy">
                    {m.label}
                  </span>
                  <span className="block text-xs text-brand-navy/50">
                    {m.hint}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contact */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="bk-name" className="block text-sm font-medium text-brand-navy">
            Your name
          </label>
          <input
            id="bk-name"
            type="text"
            required
            value={form.contactName}
            onChange={(e) => set('contactName', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="bk-phone" className="block text-sm font-medium text-brand-navy">
            Phone
          </label>
          <input
            id="bk-phone"
            type="tel"
            inputMode="tel"
            value={form.contactPhone}
            onChange={(e) => set('contactPhone', e.target.value)}
            placeholder="+252 ..."
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="bk-email" className="block text-sm font-medium text-brand-navy">
            Email
          </label>
          <input
            id="bk-email"
            type="email"
            value={form.contactEmail}
            onChange={(e) => set('contactEmail', e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>
      <p className="-mt-3 text-xs text-brand-navy/50">
        Provide at least a phone number or an email so we can reach you.
      </p>

      {/* Description */}
      <div>
        <label htmlFor="bk-desc" className="block text-sm font-medium text-brand-navy">
          Description <span className="text-brand-navy/40">(optional)</span>
        </label>
        <textarea
          id="bk-desc"
          rows={4}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Describe the goods, special handling, etc."
          className={inputClass}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-navy transition-all hover:bg-brand-yellow/90 hover:scale-[1.01] disabled:opacity-50"
      >
        <Package className="h-4 w-4" />
        {isPending ? 'Submitting...' : 'Submit Booking'}
      </button>
    </form>
  );
}
