'use client';

import { useState } from 'react';
import {
  Ship,
  Plane,
  Building2,
  Home,
  Trash2,
  Inbox,
  ArrowRight,
  Weight,
  CalendarClock,
} from 'lucide-react';
import {
  useBookings,
  useDeleteBooking,
  useUpdateBookingStatus,
} from '@/hooks/useBookings';
import {
  BOOKING_STATUSES,
  type BookingServiceType,
  type BookingStatus,
  type DeliveryMethod,
} from '@/types/booking';
import { formatRelativeTime } from '@/utils/format';

const SERVICE_ICON: Record<BookingServiceType, typeof Ship> = {
  container: Ship,
  air: Plane,
};
const SERVICE_LABEL: Record<BookingServiceType, string> = {
  container: 'Container',
  air: 'Air Freight',
};
const DELIVERY_ICON: Record<DeliveryMethod, typeof Building2> = {
  'office-pickup': Building2,
  'door-delivery': Home,
};
const DELIVERY_LABEL: Record<DeliveryMethod, string> = {
  'office-pickup': 'Office Pickup',
  'door-delivery': 'Door Delivery',
};
const STATUS_CHIP: Record<BookingStatus, string> = {
  pending: 'ad-chip-amber',
  confirmed: 'ad-chip-blue',
  'in-progress': 'ad-chip-blue',
  completed: 'ad-chip-teal',
  cancelled: '',
};

const FILTERS: { value: 'all' | BookingStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  ...BOOKING_STATUSES.map((s) => ({ value: s.value, label: s.label })),
];

function formatDate(value: string): string {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function AdminBookingsManager() {
  const { data, isLoading } = useBookings();
  const updateStatus = useUpdateBookingStatus();
  const deleteBooking = useDeleteBooking();
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');

  const items = data ?? [];
  const visible =
    filter === 'all' ? items : items.filter((b) => b.status === filter);

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
              className={`ad-btn ${active ? 'ad-btn-primary' : 'ad-btn-ghost'} !py-1.5 !text-xs`}
            >
              {f.label}
              <span className="ad-mono opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="ad-panel h-24 animate-pulse" style={{ opacity: 0.5 }} />
      )}

      {!isLoading && visible.length === 0 && (
        <div className="ad-panel px-6 py-12 text-center" style={{ borderStyle: 'dashed' }}>
          <Inbox className="mx-auto h-9 w-9" style={{ color: 'var(--ad-faint)' }} />
          <p className="mt-3 text-sm" style={{ color: 'var(--ad-faint)' }}>
            No bookings in this view.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {visible.map((b, i) => {
          const Service = SERVICE_ICON[b.serviceType];
          const Delivery = DELIVERY_ICON[b.deliveryMethod];
          return (
            <article
              key={b.id}
              className="ad-card ad-rise p-5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="ad-chip ad-chip-blue">
                  <Service className="h-3 w-3" />
                  {SERVICE_LABEL[b.serviceType]}
                </span>
                <span className="ad-chip">
                  <Delivery className="h-3 w-3" />
                  {DELIVERY_LABEL[b.deliveryMethod]}
                </span>
                <span className={`ad-chip ${STATUS_CHIP[b.status]}`}>
                  {b.status}
                </span>
                <span
                  className="ad-mono ml-auto text-xs"
                  style={{ color: 'var(--ad-faint)' }}
                >
                  {formatRelativeTime(b.createdAt)}
                </span>
              </div>

              {/* Route */}
              <div className="mt-3 flex items-center gap-2 text-lg font-bold">
                <span>{b.origin}</span>
                <ArrowRight className="h-4 w-4" style={{ color: 'var(--ad-amber)' }} />
                <span>{b.destination}</span>
              </div>

              {/* Meta */}
              <div
                className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm"
                style={{ color: 'var(--ad-muted)' }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Weight className="h-3.5 w-3.5" />
                  <span className="ad-mono">{b.weightKg.toLocaleString()} kg</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {formatDate(b.preferredDate)}
                </span>
              </div>

              {b.description && (
                <p className="mt-2 whitespace-pre-line text-sm" style={{ color: 'var(--ad-muted)' }}>
                  {b.description}
                </p>
              )}

              {/* Contact */}
              <div className="mt-3 text-sm" style={{ color: 'var(--ad-muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--ad-text)' }}>
                  {b.contactName}
                </span>
                {b.contactPhone && (
                  <>
                    {' · '}
                    <a
                      href={`tel:${b.contactPhone}`}
                      className="hover:underline"
                      style={{ color: 'var(--ad-teal)' }}
                    >
                      {b.contactPhone}
                    </a>
                  </>
                )}
                {b.contactEmail && (
                  <>
                    {' · '}
                    <a
                      href={`mailto:${b.contactEmail}`}
                      className="hover:underline"
                      style={{ color: 'var(--ad-teal)' }}
                    >
                      {b.contactEmail}
                    </a>
                  </>
                )}
              </div>

              {/* Actions */}
              <div
                className="mt-4 flex flex-wrap items-center gap-1.5 border-t pt-3"
                style={{ borderColor: 'var(--ad-line)' }}
              >
                {BOOKING_STATUSES.filter((s) => s.value !== b.status).map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() =>
                      updateStatus.mutate({ id: b.id, status: s.value })
                    }
                    className="ad-btn ad-btn-ghost !px-3 !py-1.5 !text-xs"
                  >
                    {s.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Delete this booking?')) deleteBooking.mutate(b.id);
                  }}
                  className="ad-btn ad-btn-danger ml-auto !px-2.5 !py-1.5 !text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
