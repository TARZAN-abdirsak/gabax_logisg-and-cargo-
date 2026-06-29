import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Land Transport | Gabax Logistics',
  description: 'Reliable land transport and trucking services for domestic and cross-border cargo delivery.',
};

export default function LandTransportPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-wider uppercase">Land Transport</h1>
      <p className="mt-4 text-gray-600">Land transport services page content coming soon.</p>
    </div>
  );
}
