'use client';

import { useState, type FormEvent } from 'react';
import type { ServiceType } from '@/types/common';
import { useQuote } from '@/hooks/useQuote';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface QuoteFormData {
  serviceType: ServiceType | '';
  originCity: string;
  originCountry: string;
  destinationCity: string;
  destinationCountry: string;
  weight: string;
  description: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  specialInstructions: string;
  insurance: boolean;
  pickupDate: string;
}

const initialFormData: QuoteFormData = {
  serviceType: '',
  originCity: '',
  originCountry: '',
  destinationCity: '',
  destinationCountry: '',
  weight: '',
  description: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  specialInstructions: '',
  insurance: false,
  pickupDate: '',
};

const serviceOptions: { label: string; value: ServiceType }[] = [
  { label: 'Air Freight', value: 'air-freight' },
  { label: 'Sea Freight', value: 'sea-freight' },
  { label: 'Land Transport', value: 'land-transport' },
  { label: 'Cargo Services', value: 'cargo' },
];

export function QuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync, isPending, isSuccess, reset } = useQuote();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const w = Number(formData.weight);
    if (isNaN(w) || w <= 0) {
      setError('Fadlan geli miisaan sax ah (kg).');
      return;
    }

    try {
      await mutateAsync({
        serviceType: formData.serviceType as ServiceType,
        origin: {
          street: '',
          city: formData.originCity,
          state: '',
          postalCode: '',
          country: formData.originCountry,
        },
        destination: {
          street: '',
          city: formData.destinationCity,
          state: '',
          postalCode: '',
          country: formData.destinationCountry,
        },
        weight: w,
        description: formData.description,
        contact: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || undefined,
        },
        specialInstructions: formData.specialInstructions || undefined,
        insurance: formData.insurance,
        pickupDate: formData.pickupDate,
      });
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Khalad ayaa dhacay. Fadlan dib u tijaabi.');
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 space-y-5 animate-rise">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-brand-navy">Codsigaga Waa La Helay!</h3>
          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Mahadsanid! Codsigaga qiimo-sheegga ee shixnadda waa la gudbiyey. Kooxdayada logistics-ka ayaa ku baadhi doona oo kula soo xidhiidhi doona dhawaan si ay kuu siiyaan qiimo sax ah oo ku habboon cargo-gaaga.
          </p>
        </div>
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-8 py-3 text-sm font-bold text-brand-navy hover:bg-brand-yellow/90 transition-all hover:scale-102 cursor-pointer shadow-md"
        >
          Codsasho Kale
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Service Type */}
      <div>
        <label htmlFor="quote-service" className="block text-sm font-semibold text-slate-700">
          Service Type
        </label>
        <select
          id="quote-service"
          required
          value={formData.serviceType}
          onChange={(e) =>
            setFormData({
              ...formData,
              serviceType: e.target.value as ServiceType,
            })
          }
          className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        >
          <option value="">Select a service</option>
          {serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Origin */}
      <fieldset>
        <legend className="text-sm font-semibold text-slate-700">Origin (Halka laga qaadayo)</legend>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-origin-city" className="sr-only">City</label>
            <input
              id="quote-origin-city"
              type="text"
              required
              placeholder="City (Magaalada)"
              value={formData.originCity}
              onChange={(e) =>
                setFormData({ ...formData, originCity: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label htmlFor="quote-origin-country" className="sr-only">Country</label>
            <input
              id="quote-origin-country"
              type="text"
              required
              placeholder="Country (Dalka)"
              value={formData.originCountry}
              onChange={(e) =>
                setFormData({ ...formData, originCountry: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>
      </fieldset>

      {/* Destination */}
      <fieldset>
        <legend className="text-sm font-semibold text-slate-700">Destination (Halka la geynayo)</legend>
        <div className="mt-2 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-dest-city" className="sr-only">City</label>
            <input
              id="quote-dest-city"
              type="text"
              required
              placeholder="City (Magaalada)"
              value={formData.destinationCity}
              onChange={(e) =>
                setFormData({ ...formData, destinationCity: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label htmlFor="quote-dest-country" className="sr-only">Country</label>
            <input
              id="quote-dest-country"
              type="text"
              required
              placeholder="Country (Dalka)"
              value={formData.destinationCountry}
              onChange={(e) =>
                setFormData({ ...formData, destinationCountry: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>
      </fieldset>

      {/* Shipment Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-weight" className="block text-sm font-semibold text-slate-700">
            Weight (kg)
          </label>
          <input
            id="quote-weight"
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="e.g. 150"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
            className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <div>
          <label htmlFor="quote-pickup" className="block text-sm font-semibold text-slate-700">
            Pickup Date (Taariikhda)
          </label>
          <input
            id="quote-pickup"
            type="date"
            required
            value={formData.pickupDate}
            onChange={(e) =>
              setFormData({ ...formData, pickupDate: e.target.value })
            }
            className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-description" className="block text-sm font-semibold text-slate-700">
          Cargo Description (Faahfaahinta Alaabta)
        </label>
        <textarea
          id="quote-description"
          required
          rows={3}
          placeholder="Maxay alaabtu ka kooban tahay? (tusaale: dharka, qalabka guriga...)"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      {/* Contact Info */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-slate-700">Contact Information (Faahfaahintaada)</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="quote-name" className="sr-only">Name</label>
            <input
              id="quote-name"
              type="text"
              required
              placeholder="Name (Magacaaga)"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label htmlFor="quote-email" className="sr-only">Email</label>
            <input
              id="quote-email"
              type="email"
              required
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label htmlFor="quote-phone" className="sr-only">Phone</label>
            <input
              id="quote-phone"
              type="tel"
              placeholder="Phone (Taleefanka)"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
          <div>
            <label htmlFor="quote-company" className="sr-only">Company</label>
            <input
              id="quote-company"
              type="text"
              placeholder="Company Name (Ikhtiyaari)"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>
      </fieldset>

      {/* Insurance */}
      <div className="flex items-center gap-2">
        <input
          id="quote-insurance"
          type="checkbox"
          checked={formData.insurance}
          onChange={(e) =>
            setFormData({ ...formData, insurance: e.target.checked })
          }
          className="h-4 w-4 rounded border border-black/10 text-brand-blue outline-none"
        />
        <label htmlFor="quote-insurance" className="text-sm font-semibold text-slate-600 cursor-pointer">
          Include cargo insurance (Caymiska alaabta)
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-brand-yellow py-3.5 text-sm font-black text-brand-navy hover:bg-brand-yellow/90 hover:scale-101 transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Gubineyso...' : 'Codso Qiimo-sheeg'}
      </button>
    </form>
  );
}
