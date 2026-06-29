import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cargo Services | Gabax Logistics',
  description: 'Professional cargo handling and shipping services tailored to your business needs.',
};

export default function CargoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-wider uppercase">Cargo Services</h1>
      <p className="mt-4 text-gray-600">Cargo services page content coming soon.</p>
    </div>
  );
}
