'use client';

import { useState } from 'react';
import { Star, Trash2, Inbox } from 'lucide-react';
import {
  useDeleteFeedback,
  useFeedbackList,
  useUpdateFeedbackStatus,
} from '@/hooks/useFeedback';
import { FEEDBACK_STATUSES, type FeedbackStatus } from '@/types/feedback';
import { formatRelativeTime } from '@/utils/format';

const STATUS_CHIP: Record<FeedbackStatus, string> = {
  new: 'ad-chip-blue',
  reviewed: 'ad-chip-teal',
  archived: '',
};

const FILTERS: { value: 'all' | FeedbackStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  ...FEEDBACK_STATUSES.map((s) => ({ value: s.value, label: s.label })),
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="h-4 w-4"
          style={{
            fill: star <= rating ? 'var(--ad-amber)' : 'transparent',
            color: star <= rating ? 'var(--ad-amber)' : 'var(--ad-faint)',
          }}
        />
      ))}
    </div>
  );
}

export function AdminFeedbackManager() {
  const { data, isLoading } = useFeedbackList();
  const updateStatus = useUpdateFeedbackStatus();
  const deleteFeedback = useDeleteFeedback();
  const [filter, setFilter] = useState<'all' | FeedbackStatus>('all');

  const items = data ?? [];
  const visible =
    filter === 'all' ? items : items.filter((f) => f.status === filter);

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

      <p className="ad-label" style={{ letterSpacing: '0.08em' }}>
        Mark a review &ldquo;Featured&rdquo; to show it on the homepage.
      </p>

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
            No feedback in this view.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {visible.map((item, i) => (
          <article
            key={item.id}
            className="ad-card ad-rise p-5"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Stars rating={item.rating} />
                <span className={`ad-chip ${STATUS_CHIP[item.status]}`}>
                  {item.status}
                </span>
              </div>
              <span
                className="ad-mono text-xs"
                style={{ color: 'var(--ad-faint)' }}
              >
                {formatRelativeTime(item.createdAt)}
              </span>
            </div>

            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed">
              {item.message}
            </p>

            <div className="mt-3 text-sm" style={{ color: 'var(--ad-muted)' }}>
              <span className="font-semibold" style={{ color: 'var(--ad-text)' }}>
                {item.name}
              </span>
              {' · '}
              <a
                href={`mailto:${item.email}`}
                className="hover:underline"
                style={{ color: 'var(--ad-teal)' }}
              >
                {item.email}
              </a>
              {item.phone && (
                <>
                  {' · '}
                  <a
                    href={`tel:${item.phone}`}
                    className="hover:underline"
                    style={{ color: 'var(--ad-teal)' }}
                  >
                    {item.phone}
                  </a>
                </>
              )}
            </div>

            <div
              className="mt-4 flex flex-wrap items-center gap-1.5 border-t pt-3"
              style={{ borderColor: 'var(--ad-line)' }}
            >
              {FEEDBACK_STATUSES.filter((s) => s.value !== item.status).map(
                (s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() =>
                      updateStatus.mutate({ id: item.id, status: s.value })
                    }
                    className="ad-btn ad-btn-ghost !px-3 !py-1.5 !text-xs"
                  >
                    Mark {s.label}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this feedback?'))
                    deleteFeedback.mutate(item.id);
                }}
                className="ad-btn ad-btn-danger ml-auto !px-2.5 !py-1.5 !text-xs"
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
