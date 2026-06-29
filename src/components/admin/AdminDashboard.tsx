'use client';

import Link from 'next/link';
import {
  MessageSquare,
  Inbox,
  FileText,
  Star,
  Package,
  ArrowUpRight,
} from 'lucide-react';
import { useFeedbackList } from '@/hooks/useFeedback';
import { useBookings } from '@/hooks/useBookings';
import { useQuotesList } from '@/hooks/useQuote';

function StatTile({
  icon: Icon,
  label,
  value,
  unit,
  accent,
  href,
  delay,
}: {
  icon: typeof FileText;
  label: string;
  value: number | string;
  unit?: string;
  accent: string;
  href: string;
  delay: number;
}) {
  return (
    <Link
      href={href}
      className="ad-card ad-rise group block p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="ad-label">{label}</span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: `${accent}22`, color: accent }}
        >
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span
          className="ad-mono text-4xl font-bold leading-none"
          style={{ color: 'var(--ad-text)' }}
        >
          {value}
        </span>
        {unit && (
          <span className="ad-label" style={{ letterSpacing: '0.1em' }}>
            {unit}
          </span>
        )}
      </div>
      <span
        className="ad-label mt-4 inline-flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: accent }}
      >
        Open <ArrowUpRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

export function AdminDashboard() {
  const { data: feedback = [] } = useFeedbackList();
  const { data: bookings = [] } = useBookings();
  const { data: quotes = [] } = useQuotesList();

  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const newQuotes = quotes.filter((q) => q.status === 'new').length;
  const newFeedback = feedback.filter((f) => f.status === 'new').length;
  const avgRating =
    feedback.length > 0
      ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1)
      : '—';

  return (
    <div className="mx-auto max-w-6xl space-y-9">
      <header className="ad-rise" style={{ animationDelay: '20ms' }}>
        <span className="ad-chip ad-chip-teal">
          <span className="ad-pulse" />
          Live
        </span>
        <h1 className="mt-3 text-4xl font-extrabold">Control Deck</h1>
        <p className="mt-1.5 text-sm" style={{ color: 'var(--ad-muted)' }}>
          Monitor and steer your bookings, quote requests, and customer feedback.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          icon={Package}
          label="New Bookings"
          value={pendingBookings}
          unit="pending"
          accent="var(--ad-amber)"
          href="/admin/bookings"
          delay={60}
        />
        <StatTile
          icon={FileText}
          label="New Quotes"
          value={newQuotes}
          unit="new"
          accent="var(--ad-teal)"
          href="/admin/quotes"
          delay={80}
        />
        <StatTile
          icon={Inbox}
          label="New Feedback"
          value={newFeedback}
          unit="unread"
          accent="var(--ad-blue)"
          href="/admin/feedback"
          delay={140}
        />
        <StatTile
          icon={Star}
          label="Avg Rating"
          value={avgRating}
          unit="/ 5"
          accent="var(--ad-amber)"
          href="/admin/feedback"
          delay={200}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/bookings"
          className="ad-card ad-rise flex items-center gap-4 p-6"
          style={{ animationDelay: '300ms' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'var(--ad-amber-soft)', color: 'var(--ad-amber)' }}
          >
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold">Manage Bookings</h3>
            <p className="mt-0.5 text-sm" style={{ color: 'var(--ad-muted)' }}>
              Review and confirm shipments.
            </p>
          </div>
          <ArrowUpRight
            className="ml-auto h-5 w-5"
            style={{ color: 'var(--ad-faint)' }}
          />
        </Link>
        <Link
          href="/admin/quotes"
          className="ad-card ad-rise flex items-center gap-4 p-6"
          style={{ animationDelay: '320ms' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'var(--ad-teal-soft)', color: 'var(--ad-teal)' }}
          >
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold">Quote Requests</h3>
            <p className="mt-0.5 text-sm" style={{ color: 'var(--ad-muted)' }}>
              View customer details to follow up.
            </p>
          </div>
          <ArrowUpRight
            className="ml-auto h-5 w-5"
            style={{ color: 'var(--ad-faint)' }}
          />
        </Link>
        <Link
          href="/admin/feedback"
          className="ad-card ad-rise flex items-center gap-4 p-6"
          style={{ animationDelay: '380ms' }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'var(--ad-amber-soft)', color: 'var(--ad-amber)' }}
          >
            <MessageSquare className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold">Review Feedback</h3>
            <p className="mt-0.5 text-sm" style={{ color: 'var(--ad-muted)' }}>
              Triage what users are saying.
            </p>
          </div>
          <ArrowUpRight
            className="ml-auto h-5 w-5"
            style={{ color: 'var(--ad-faint)' }}
          />
        </Link>
      </div>
    </div>
  );
}
