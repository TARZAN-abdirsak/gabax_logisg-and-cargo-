import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CTASection({
  title,
  description,
  ctaText = 'Contact Us',
  ctaHref = '/contact',
}: CTASectionProps) {
  return (
    <section className="bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-gray-300">{description}</p>
        )}
        <div className="mt-8">
          <Link
            href={ctaHref}
            className="rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
