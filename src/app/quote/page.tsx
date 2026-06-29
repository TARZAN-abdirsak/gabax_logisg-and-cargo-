import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { QuoteForm } from '@/components/forms/QuoteForm';

export const metadata: Metadata = {
  title: 'Request a Quote | Gabax Logistics',
  description:
    'Request a customized shipping quote for your container or air freight. Our team will contact you shortly.',
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-accent">
            <FileText className="h-3.5 w-3.5" />
            Custom Shipping Quote
          </span>
          <h1 className="mt-3 text-4xl font-bold text-brand-navy sm:text-5xl tracking-wider uppercase">
            Request a Quote
          </h1>
          <p className="mt-2 text-slate-500">
            Tell us about your cargo route and weight, and our team will get back to you with custom rates.
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}
