import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FAQ | Gabax Logistics',
  description: 'Frequently asked questions about Gabax Logistics. Learn about container cargo shipping times, pricing, and services.',
};

export default function FAQPage() {
  const faqs = [
    {
      q: 'Sidee ku heli karaa qiimo-sheeg (Quote)?',
      a: 'Waxaad ku heli kartaa adigoo booqda boggayaga "Request a Quote", halkaas oo aad ku buuxinayso faahfaahinta alaabta, halka ay ka bilaabmayso, iyo halka ay u socoto. Kooxdayada ayaa kula soo xidhiidhi doona qiimo habboon.'
    },
    {
      q: 'Intee in le\'eg ayay ku qaadataa rarku?',
      a: 'Air Freight (Xamuulka Cirka) wuxuu inta badan qaataa 3 ilaa 7 maalmood oo shaqo. Halka Sea Freight (Container-ada) ay qaadan karto 20 ilaa 45 maalmood, taas oo ku xidhan dekedda ay ka soo bilaabmayso iyo halka ay u socoto.'
    },
    {
      q: 'Ma bixisaan adeegga Kastam-baarista (Customs Clearance)?',
      a: 'Haa, kooxdayada khubarada ah ayaa maamusha dhammaan dukumiintiyada kastamka iyo waraaqaha kootada si alaabtaada looga saaro dekedaha ama garoomada si degdeg ah.'
    },
    {
      q: 'Waa kuwee wadamada aad alaabta ka soo qaaddaan?',
      a: 'Waxaan inta badan ka soo qaadnaa wadamada Shiinaha, Turkiga, Imaaraadka Carabta (Dubai), Hindiya, Yurub, iyo Ameerika, anagoo keenna magaalooyinka waaweyn ee Afrikada Bari.'
    },
    {
      q: 'Miyaad caymisaan alaabta (Cargo Insurance)?',
      a: 'Haa, macaamiisheena waxaan u bixinaa caymis ikhtiyaari ah si loo daboolo wixii waxyeello ama lumitaan ah oo ku dhaca alaabta inta ay waddada ku jirto.'
    }
  ];

  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8 animate-rise">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-accent">
            Su&apos;aalaha Inta Badan Nala Weydiiyo
          </span>
          <h1 className="text-4xl font-extrabold text-brand-navy sm:text-5xl tracking-wider uppercase">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto max-w-xl text-slate-500 text-sm leading-relaxed">
            Find answers to common questions about cargo types, customs clearance, and global shipping times.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-2">
              <h3 className="text-lg font-bold text-brand-navy flex items-start gap-2.5">
                <HelpCircle className="h-5 w-5 mt-0.5 text-brand-yellow-accent shrink-0" />
                {faq.q}
              </h3>
              <p className="pl-7 text-slate-600 text-xs leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
