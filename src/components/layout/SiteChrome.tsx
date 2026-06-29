'use client';

import { usePathname } from 'next/navigation';

/**
 * Renders the public site chrome (navbar + footer) around page content,
 * but hides it on admin routes which have their own dashboard layout.
 */
export function SiteChrome({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {navbar}
      <main className="flex-1">{children}</main>
      {footer}
    </>
  );
}
