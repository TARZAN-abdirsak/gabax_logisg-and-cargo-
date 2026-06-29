'use client';

import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';
import { useLanguageStore } from '@/store/useLanguageStore';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguageStore();

  return (
    <footer className="bg-[#f5f5f5] text-slate-900 border-t border-black/5 pt-10 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6 items-start">
          
          {/* Left Column: Logo, Brand details, contact info & socials */}
          <div className="md:col-span-6 space-y-6">
            {/* Logo + Brand Name */}
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Gabax Logistics Logo"
                className="h-12 w-auto object-contain brightness-110"
              />
              <div>
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-brand-yellow via-amber-400 to-orange-500 bg-clip-text text-transparent block leading-tight">
                  GABAX
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 block">
                  {t.footer.logisticsCargo}
                </span>
              </div>
            </div>
            
            <p className="text-slate-600 text-base leading-relaxed max-w-md">
              {t.footer.description}
            </p>

            <div className="space-y-2 text-base text-slate-700">
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500" />
                <a href="tel:+252615542562" className="hover:text-brand-yellow transition-colors font-semibold">
                  +252 61 554 2562
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500" />
                <a href="tel:+252615792777" className="hover:text-brand-yellow transition-colors font-semibold">
                  +252 61 579 2777
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500" />
                <a href="mailto:gabaxlogisticscargo@gmail.com" className="hover:text-brand-yellow transition-colors font-semibold">
                  gabaxlogisticscargo@gmail.com
                </a>
              </p>
            </div>

            {/* Social Media circles */}
            <div className="pt-2">
              <span className="text-sm font-bold uppercase tracking-wider text-slate-500 block mb-3">
                {t.footer.socialMedia}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-brand-yellow hover:text-black hover:scale-105 transition-all"
                  aria-label="Facebook"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-brand-yellow hover:text-black hover:scale-105 transition-all"
                  aria-label="Twitter"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-brand-yellow hover:text-black hover:scale-105 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a
                  href="https://www.tiktok.com/@gabaxlogisticscar?_r=1&_t=ZS-974jd50w4NZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white hover:bg-brand-yellow hover:text-black hover:scale-105 transition-all"
                  aria-label="TikTok"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column: About */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xl font-bold text-black tracking-wide">{t.footer.aboutTitle}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.aboutUs}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.careers}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.contactUs}
                </Link>
              </li>
              <li>
                <Link href="/#services-offerings" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.ourServices}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Legal */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xl font-bold text-black tracking-wide">{t.footer.legalTitle}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.quote}
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-slate-600 hover:text-black transition-colors text-base font-medium">
                  {t.footer.bookShipment}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom copyright bar */}
        <div className="mt-10 border-t border-black/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 relative z-20">
          <p>&copy; {currentYear} GABAX. {t.footer.allRightsReserved}</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-black transition-colors">{t.footer.termsService}</Link>
            <Link href="/privacy" className="hover:text-black transition-colors">{t.footer.privacySettings}</Link>
          </div>
        </div>
      </div>

      {/* Logo watermark / stamp behind the content */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden opacity-[0.35]">
        <img
          src="/logo.png"
          alt=""
          className="w-[300px] md:w-[450px] h-auto object-contain"
        />
      </div>
    </footer>
  );
}
