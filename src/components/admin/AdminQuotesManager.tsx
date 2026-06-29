'use client';

import { useState } from 'react';
import { Trash2, Inbox, Mail, Phone, Building2, MapPin, Scale } from 'lucide-react';
import {
  useQuotesList,
  useUpdateQuoteStatus,
  useDeleteQuote,
} from '@/hooks/useQuote';
import { QUOTE_STATUSES, type QuoteStatus } from '@/types/quote';
import { formatRelativeTime } from '@/utils/format';

const STATUS_CHIP: Record<QuoteStatus, string> = {
  new: 'ad-chip-blue',
  contacted: 'ad-chip-teal',
  archived: '',
};

const FILTERS: { value: 'all' | QuoteStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  ...QUOTE_STATUSES.map((s) => ({ value: s.value, label: s.label })),
];

export function AdminQuotesManager() {
  const { data, isLoading } = useQuotesList();
  const updateStatus = useUpdateQuoteStatus();
  const deleteQuote = useDeleteQuote();
  const [filter, setFilter] = useState<'all' | QuoteStatus>('all');

  const items = data ?? [];
  const visible =
    filter === 'all' ? items : items.filter((q) => q.status === filter);

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="ad-rise flex flex-wrap items-center gap-2" style={{ animationDelay: '40ms' }}>
        {FILTERS.map((f) => {
          const count =
            f.value === 'all'
              ? items.length
              : items.filter((i) => i.status === f.value).length;
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`ad-btn ${active ? 'ad-btn-primary' : 'ad-btn-ghost'} !py-1.5 !text-xs cursor-pointer`}
            >
              {f.label}
              <span className="ad-mono opacity-70 ml-1">{count}</span>
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="ad-panel h-24 animate-pulse" style={{ opacity: 0.5 }} />
      )}

      {!isLoading && visible.length === 0 && (
        <div
          className="ad-panel px-6 py-12 text-center"
          style={{ borderStyle: 'dashed' }}
        >
          <Inbox
            className="mx-auto h-9 w-9"
            style={{ color: 'var(--ad-faint)' }}
          />
          <p className="mt-3 text-sm" style={{ color: 'var(--ad-faint)' }}>
            No quote requests in this view.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {visible.map((item, i) => (
          <article
            key={item.id}
            className="ad-card ad-rise p-6"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            {/* Header: Service, Date, Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 mb-4" style={{ borderColor: 'var(--ad-line)' }}>
              <div className="flex items-center gap-3">
                <span className="font-extrabold uppercase text-sm tracking-wide text-brand-blue-accent">
                  {item.serviceType.replace('-', ' ')}
                </span>
                <span className={`ad-chip ${STATUS_CHIP[item.status]}`}>
                  {item.status === 'new' ? 'New Request' : item.status}
                </span>
              </div>
              <span
                className="ad-mono text-xs"
                style={{ color: 'var(--ad-faint)' }}
              >
                {formatRelativeTime(item.createdAt)}
              </span>
            </div>

            {/* Content Details */}
            <div className="grid gap-4 md:grid-cols-2 text-sm">
              {/* Route & Cargo */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-brand-blue" />
                  <div>
                    <p className="font-semibold text-slate-700">Route</p>
                    <p className="text-slate-600">
                      From: <span className="font-medium text-brand-navy">{item.origin.city}, {item.origin.country}</span>
                    </p>
                    <p className="text-slate-600">
                      To: <span className="font-medium text-brand-navy">{item.destination.city}, {item.destination.country}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Scale className="h-4 w-4 mt-0.5 text-brand-blue" />
                  <div>
                    <p className="font-semibold text-slate-700">Cargo Details</p>
                    <p className="text-slate-600">Weight: <span className="font-semibold">{item.weight} kg</span></p>
                    <p className="text-slate-600 mt-1 italic">&ldquo;{item.description}&rdquo;</p>
                  </div>
                </div>

                {item.specialInstructions && (
                  <div className="mt-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-black/5">
                    <span className="font-bold text-slate-700 block mb-0.5">Instructions:</span>
                    <span className="text-slate-600">{item.specialInstructions}</span>
                  </div>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-2 border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-4" style={{ borderColor: 'var(--ad-line)' }}>
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 mt-0.5 text-brand-blue" />
                  <div>
                    <p className="font-semibold text-slate-700">Contact Person</p>
                    <p className="font-bold text-brand-navy">{item.contact.name}</p>
                    {item.contact.company && (
                      <p className="text-xs text-slate-500 font-medium">{item.contact.company}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 pt-1.5 pl-6">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <a href={`mailto:${item.contact.email}`} className="text-brand-blue hover:underline text-xs font-medium">
                      {item.contact.email}
                    </a>
                  </div>
                  {item.contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <a href={`tel:${item.contact.phone}`} className="text-brand-blue hover:underline text-xs font-medium">
                        {item.contact.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-400 pt-2 pl-6">
                  Preferred Pickup: <span className="font-medium text-slate-600">{item.pickupDate}</span>
                  {item.insurance && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 border border-emerald-100">
                      Caymis (Insured)
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div
              className="mt-5 flex flex-wrap items-center gap-1.5 border-t pt-4"
              style={{ borderColor: 'var(--ad-line)' }}
            >
              {QUOTE_STATUSES.filter((s) => s.value !== item.status).map(
                (s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() =>
                      updateStatus.mutate({ id: item.id, status: s.value })
                    }
                    className="ad-btn ad-btn-ghost !px-3 !py-1.5 !text-xs cursor-pointer"
                  >
                    Mark {s.label}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this quote request?'))
                    deleteQuote.mutate(item.id);
                }}
                className="ad-btn ad-btn-danger ml-auto !px-2.5 !py-1.5 !text-xs cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
