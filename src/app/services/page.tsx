import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Gabax Logistics',
  description: 'Explore our comprehensive logistics services including air freight, sea freight, land transport, and cargo solutions.',
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-wider uppercase">Our Services</h1>
      <p className="mt-4 text-gray-600">Services overview page content coming soon.</p>
    </div>
  );
}
