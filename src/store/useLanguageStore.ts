import { create } from 'zustand';
import { en } from '@/locales/en';
import { so } from '@/locales/so';

type Language = 'en' | 'so';

interface LanguageStore {
  language: Language;
  t: typeof en;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'so', // Default language is Somali based on user request
  t: so,
  setLanguage: (lang: Language) => set({ language: lang, t: lang === 'en' ? en : so }),
  toggleLanguage: () => set((state) => {
    const newLang = state.language === 'en' ? 'so' : 'en';
    return { language: newLang, t: newLang === 'en' ? en : so };
  }),
}));
