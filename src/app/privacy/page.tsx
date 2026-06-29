import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gabax Logistics',
  description: 'Privacy Policy for Gabax Logistics. Learn how we handle your personal data and shipping documents.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8 animate-rise">
      <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy tracking-wider uppercase">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: June 28, 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">1. Xogta aan ururino (Information We Collect)</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Waxaan ururinaa macluumaadka aad na siiso markaad codsanayso qiimo-sheeg (quote), boos qabsasho shixnad (booking), ama markaad nagula soo xiriireyso mareegtayada. Waxa ku jira magacaaga, taleefankaaga, iimaylkaaga, magaca shirkaddaada, iyo faahfaahinta alaabta aad rabto inaad rarto.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">2. Sida aan u isticmaalno xogtaada (How We Use Your Information)</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Waxaan u isticmaalnaa xogtaada si aan u daboolo codsiyadaada, u qorsheyno rarista cargo-gaaga, kaala soo xiriirno qiimaha iyo halka ay wax u marayaan, iyo inaan u dhisno adeeg macaamiil oo ka wanaagsan kii hore.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">3. Ilaalinta Xogta (Data Security)</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Marnaba xogtaada lama wadaagno dhinac saddexaad (third party) ujeeddooyin ganacsi ama xayeysiis ah. Waxaan isticmaalnaa habab farsamo oo casri ah si aan u hubino in dukumiintiyadaada iyo macluumaadkaaga gaarka ah ay badbaado yihiin.
          </p>
        </section>
      </div>
    </div>
  );
}
