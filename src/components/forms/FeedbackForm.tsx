'use client';

import { useState, type FormEvent } from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useSubmitFeedback } from '@/hooks/useFeedback';

interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  rating: number;
  message: string;
}

const initialFormData: FeedbackFormData = {
  name: '',
  email: '',
  phone: '',
  rating: 0,
  message: '',
};

export function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormData>(initialFormData);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync, isPending, isSuccess, reset } = useSubmitFeedback();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.rating < 1) {
      setError('Please pick a star rating.');
      return;
    }

    try {
      await mutateAsync(formData);
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold text-emerald-800">
          Thank you!
        </h3>
        <p className="mt-1 text-sm text-emerald-700">
          Your feedback has been received. We appreciate you taking the time.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-5 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fb-name" className="block text-sm font-medium text-brand-navy">
            Name
          </label>
          <input
            id="fb-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
        <div>
          <label htmlFor="fb-email" className="block text-sm font-medium text-brand-navy">
            Email
          </label>
          <input
            id="fb-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="fb-phone" className="block text-sm font-medium text-brand-navy">
          Phone number
        </label>
        <input
          id="fb-phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+252 ..."
          className="mt-1 block w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
        />
      </div>

      <div>
        <span className="block text-sm font-medium text-brand-navy">Rating</span>
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= (hoverRating || formData.rating);
            return (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                className="p-0.5 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-7 w-7 ${active ? 'fill-brand-yellow text-brand-yellow' : 'text-slate-300'}`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="fb-message" className="block text-sm font-medium text-brand-navy">
          Your feedback
        </label>
        <textarea
          id="fb-message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          placeholder="Tell us about your experience..."
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
        className="w-full rounded-full bg-brand-yellow px-4 py-3 text-sm font-bold text-brand-navy transition-all hover:bg-brand-yellow/90 hover:scale-[1.01] disabled:opacity-50"
      >
        {isPending ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}
