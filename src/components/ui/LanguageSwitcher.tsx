'use client';

import { useLanguageStore } from '@/store/useLanguageStore';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{language === 'en' ? 'EN' : 'SO'}</span>
    </button>
  );
}
