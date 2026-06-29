import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function Hero({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaHref = '/quote',
  secondaryCtaText,
  secondaryCtaHref,
}: HeroProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-gray-600">{subtitle}</p>
        )}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href={ctaHref}
            className="rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            {ctaText}
          </Link>
          {secondaryCtaText && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className="rounded-md border border-gray-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50"
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
