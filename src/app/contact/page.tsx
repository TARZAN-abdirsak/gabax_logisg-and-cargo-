import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us | Gabax Logistics',
  description:
    'Get in touch with Gabax Logistics. Contact our team for shipping help, cargo inquiries, or general support.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-accent">
            <Mail className="h-3.5 w-3.5" />
            Nala Soo Xidhiidh
          </span>
          <h1 className="mt-3 text-4xl font-bold text-brand-navy sm:text-5xl tracking-wider uppercase">
            Contact Us
          </h1>
          <p className="mt-2 text-slate-500">
            Have questions about our cargo services? Fill out the form below and we will get back to you shortly.
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
