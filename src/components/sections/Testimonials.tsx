'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, PenLine } from 'lucide-react';
import { useApprovedFeedback } from '@/hooks/useFeedback';
import type { PublicTestimonial } from '@/types/feedback';

const AVATAR_STYLES = [
  'bg-brand-yellow text-brand-navy',
  'bg-brand-blue text-white',
  'bg-brand-navy text-white',
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const value = `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
  return value || 'GX';
}

function TestimonialCard({
  item,
  index,
}: {
  item: PublicTestimonial;
  index: number;
}) {
  return (
    <div className="flex w-[85%] shrink-0 snap-start flex-col space-y-4 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:w-[340px]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase text-brand-navy/40">
          [ Macmiil ]
        </span>
        <div className="flex items-center gap-1 text-xs font-bold text-brand-navy">
          <Star className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
          {item.rating.toFixed(1)}
        </div>
      </div>
      <p className="flex-1 text-sm font-semibold leading-relaxed text-brand-navy">
        &ldquo;{item.message}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-2">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-black ${
            AVATAR_STYLES[index % AVATAR_STYLES.length]
          }`}
        >
          {initials(item.name)}
        </div>
        <div>
          <h4 className="text-xs font-bold text-brand-navy">{item.name}</h4>
          <p className="text-[8px] font-semibold uppercase text-brand-navy/40">
            Macmiil la xaqiijiyay
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { data, isLoading } = useApprovedFeedback();
  const scroller = useRef<HTMLDivElement>(null);
  const items = data ?? [];

  const scrollBy = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-brand-navy">
          Our Client Testimonials
        </h2>

        <div className="flex items-center gap-2">
          <Link
            href="/feedback"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-4 py-2 text-xs font-bold text-brand-navy transition-all hover:bg-brand-yellow/90 hover:scale-[1.02]"
          >
            <PenLine className="h-3.5 w-3.5" />
            Dhiib Feedback
          </Link>
          {items.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Previous"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-brand-navy shadow-sm transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Next"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-brand-navy shadow-sm transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-52 animate-pulse rounded-3xl border border-black/5 bg-black/[0.03]"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!isLoading && items.length === 0 && (
        <div className="rounded-3xl border border-dashed border-black/10 bg-white px-6 py-12 text-center">
          <p className="text-sm font-semibold text-brand-navy">
            Wali ma jiraan testimonials la soo bandhigay.
          </p>
          <p className="mt-1 text-sm text-brand-navy/50">
            Noqo kii ugu horreeyay ee na siiya ra&apos;yigiisa.
          </p>
          <Link
            href="/feedback"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-navy transition-all hover:bg-brand-yellow/90"
          >
            <PenLine className="h-4 w-4" />
            Dhiib Feedback
          </Link>
        </div>
      )}

      {/* Cards — horizontal snap carousel */}
      {!isLoading && items.length > 0 && (
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item, i) => (
            <TestimonialCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
