import Link from 'next/link';
import type { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
}

export function ServiceCard({ title, description, href, icon }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border p-6 transition-shadow hover:shadow-md"
    >
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-lg font-semibold group-hover:text-gray-600">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </Link>
  );
}
