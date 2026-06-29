'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Truck, User, Package } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguageStore();

  const isHome = pathname === '/';

  const navLinks = [
    { label: t.nav.home, href: '/', icon: Home },
    { label: t.nav.services, href: '/#services-offerings', icon: Truck },
    { label: t.nav.book, href: '/booking', icon: Package },
    { label: t.nav.about, href: '/about', icon: User },
  ];

  return (
    <header className="absolute top-10 left-0 right-0 z-[9999] px-[2.5%] pointer-events-none">
      <div className="mx-auto max-w-7xl">
        <div className={`pointer-events-auto flex h-16 items-center justify-between rounded-full px-6 shadow-sm backdrop-blur-md border transition-all duration-300 ${
          isHome
            ? 'bg-white/10 border-white/20 text-white'
            : 'bg-white/80 border-black/5 text-brand-navy'
        }`}>
          {/* Logo */}
          <Link href="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-brand-yellow via-amber-400 to-orange-500 bg-clip-text text-transparent">
            GABAX
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isHome
                      ? isActive ? 'text-brand-blue' : 'text-white/80 hover:text-white'
                      : isActive ? 'text-brand-blue' : 'text-brand-navy/80 hover:text-brand-blue'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Yellow CTA Button & Language Switcher */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/quote"
              className="inline-flex items-center gap-1 rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-navy transition-all hover:bg-brand-yellow/90 hover:scale-[1.02]"
            >
              See Details
              <span className="text-xs">➔</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-3 rounded-lg relative z-[99999] cursor-pointer pointer-events-auto touch-manipulation select-none transition-all active:scale-95 ${
              isHome ? 'text-white hover:bg-white/10' : 'text-brand-navy hover:bg-black/5'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsMobileMenuOpen((prev) => !prev);
            }}
            aria-label="Toggle Navigation"
          >
            <svg
              className="h-8 w-8 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div className={`pointer-events-auto mt-2 rounded-2xl p-4 shadow-lg border md:hidden transition-all duration-300 ${
            isHome
              ? 'bg-brand-navy/95 border-white/10 text-white'
              : 'bg-white/95 border-black/5 text-brand-navy'
          }`}>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 text-base font-semibold rounded-lg transition-colors ${
                      isHome
                        ? 'text-white hover:bg-white/10'
                        : 'text-brand-navy hover:bg-black/5'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-2 flex justify-center">
                <LanguageSwitcher />
              </div>
              <Link
                href="/quote"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-1 rounded-xl bg-brand-yellow py-3 text-center text-sm font-bold text-brand-navy"
              >
                See Details
                <span>➔</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
