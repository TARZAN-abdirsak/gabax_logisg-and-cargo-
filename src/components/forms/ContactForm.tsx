'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      if (!response.ok || !res.success) {
        throw new Error(res.error || 'Khalad ayaa dhacay marka la dirayay farriinta.');
      }

      setIsSuccess(true);
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Khalad ayaa dhacay. Fadlan dib u tijaabi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 space-y-5 animate-rise">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-brand-navy">Farriintaada Waa La Diray!</h3>
          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Mahadsanid! Farriintaada si guul leh ayaa loo diray. Kooxdayada ayaa dib u eegi doona oo kula soo xidhiidhi doona dhawaan.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsSuccess(false)}
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-8 py-3 text-sm font-bold text-brand-navy hover:bg-brand-yellow/90 transition-all hover:scale-102 cursor-pointer shadow-md"
        >
          Farriin Kale Dir
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700">
            Name (Magacaaga)
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-phone" className="block text-sm font-semibold text-slate-700">
          Phone (Taleefanka - Ikhtiyaari)
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>
      <div>
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700">
          Subject (Mawduuca)
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700">
          Message (Farriintaada)
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="mt-1 block w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-brand-yellow py-3.5 text-sm font-black text-brand-navy hover:bg-brand-yellow/90 hover:scale-101 transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Farriinta la dirayo...' : 'Dir Farriinta'}
      </button>
    </form>
  );
}
