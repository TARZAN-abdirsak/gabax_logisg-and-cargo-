'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Package,
  LogOut,
  ExternalLink,
  Anchor,
} from 'lucide-react';
import { adminLogout } from '@/services/admin';

const NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard, code: '01' },
  { label: 'Bookings', href: '/admin/bookings', icon: Package, code: '02' },
  { label: 'Quotes', href: '/admin/quotes', icon: FileText, code: '03' },
  { label: 'Feedback', href: '/admin/feedback', icon: MessageSquare, code: '04' },
];

function isActive(pathname: string, href: string): boolean {
  return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await adminLogout();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-72 flex-col p-4 md:flex">
        <div className="ad-panel flex flex-1 flex-col p-5">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: 'var(--ad-amber)', color: '#1a1403' }}
            >
              <Anchor className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <div>
              <p
                className="text-lg font-black leading-none tracking-wide"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ad-amber)' }}
              >
                GABAX
              </p>
              <p className="ad-label mt-1">Ops Deck</p>
            </div>
          </Link>

          <div className="mt-6 flex items-center gap-2 rounded-lg px-1 py-2">
            <span className="ad-pulse" />
            <span className="ad-label" style={{ color: 'var(--ad-teal)' }}>
              All systems live
            </span>
          </div>

          <nav className="mt-4 flex flex-col gap-1.5">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ad-nav-link ${active ? 'active' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  <span className="ad-mono ml-auto text-[0.6rem] opacity-40">
                    {item.code}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-1.5 pt-6">
            <Link href="/" className="ad-nav-link">
              <ExternalLink className="h-4 w-4" />
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="ad-nav-link w-full"
              style={{ color: 'var(--ad-danger)' }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile bar */}
        <div className="flex items-center justify-between p-4 md:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: 'var(--ad-amber)', color: '#1a1403' }}
            >
              <Anchor className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <span
              className="text-base font-black tracking-wide"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ad-amber)' }}
            >
              GABAX
            </span>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="ad-btn ad-btn-ghost"
            style={{ color: 'var(--ad-danger)' }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>

        {/* Mobile nav */}
        <nav className="flex gap-1.5 overflow-x-auto px-4 pb-2 md:hidden">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`ad-chip ${active ? 'ad-chip-amber' : ''} whitespace-nowrap px-3 py-1.5`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
