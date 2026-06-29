import type { Metadata } from 'next';
import { MessageSquareHeart } from 'lucide-react';
import { FeedbackForm } from '@/components/forms/FeedbackForm';

export const metadata: Metadata = {
  title: 'Share Your Feedback',
  description:
    'Tell Gabax Logistics about your experience. Your feedback helps us improve.',
};

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-accent">
            <MessageSquareHeart className="h-3.5 w-3.5" />
            We&apos;re listening
          </span>
          <h1 className="mt-3 text-4xl font-bold text-brand-navy tracking-wider uppercase">
            Share Your Feedback
          </h1>
          <p className="mt-2 text-slate-500">
            How was your experience with Gabax Logistics? Let us know.
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-8">
          <FeedbackForm />
        </div>
      </div>
    </div>
  );
}
