import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Air Freight | Gabax Logistics',
  description: 'Fast and reliable air freight services for time-sensitive cargo shipments worldwide.',
};

export default function AirFreightPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-wider uppercase">Air Freight</h1>
      <p className="mt-4 text-gray-600">Air freight services page content coming soon.</p>
    </div>
  );
}
