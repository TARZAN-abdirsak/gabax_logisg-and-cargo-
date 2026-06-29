import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Gabax Logistics',
  description: 'Terms and Conditions for cargo forwarding and shipping services by Gabax Logistics.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8 animate-rise">
      <div className="mx-auto max-w-3xl rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10 space-y-6">
        <h1 className="text-3xl font-extrabold text-brand-navy tracking-wider uppercase">Terms & Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: June 28, 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">1. Aqbalida Shuruucda (Acceptance of Terms)</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Markaad adeegsanayso Gabax Logistics si aad u rarto alaabtaada, waxaad ogolaatay inaad u hoggaansanto dhammaan shuruucdan iyo xeerarka ku xusan halkan. Shuruudahan waxay quseeyaan dhammaan shixnadaha cirka iyo baddaba.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">2. Mas&apos;uuliyadda Alaabta (Shipper Liability)</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Macaamiilku wuxuu mas&apos;uul ka yahay saxnaanta macluumaadka alaabta, miisaankeeda, iyo baakadeynta habboon. Gabax mas&apos;uul kama aha alaabooyinka jaba ee aan loo baakadeyn si waafaqsan tilmaamaha badbaadada shixnadaha.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">3. Alaabooyinka Mamnuuca Ah (Prohibited Items)</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Waa mamnuuc in shixnadaha lagu soo dhex daro alaabooyinka sharciga dalka iyo kan caalamiga ahba mamnuucayo sida walxaha qarxa, hubka, kiimikooyinka khatarta ah, ama mukhadaraadka. Macmiilkii ku xadgudba qodobkan wuxuu qaadayaa mas&apos;uuliyadda sharciga oo dhan.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">4. Bixinta Lacagaha (Payment Terms)</h2>
          <p className="text-slate-600 text-xs leading-relaxed">
            Dhammaan lacagaha qiimo-sheegga iyo khidmadaha kastamka waa in la bixiyo ka hor inta aan shixnadda laga fasaxin garoonka ama dekedda la geynayo, haddii aan heshiis kale oo qoran la wada gelin.
          </p>
        </section>
      </div>
    </div>
  );
}
