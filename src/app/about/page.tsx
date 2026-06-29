import type { Metadata } from 'next';
import { Shield, Globe, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Gabax Logistics',
  description:
    'Learn about Gabax Logistics, our mission, values, and global freight forwarder operations across air and sea lanes.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8 animate-rise">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-accent">
            Sino Qoray (Our Story)
          </span>
          <h1 className="text-4xl font-extrabold text-brand-navy sm:text-5xl tracking-wider uppercase">
            About Gabax Logistics
          </h1>
          <p className="mx-auto max-w-2xl text-slate-500 text-lg leading-relaxed">
            Your premier partner for international cargo, freight forwarding, and domestic shipping across East Africa and the globe.
          </p>
        </div>

        {/* Story Section */}
        <section className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-10 space-y-6">
          <h2 className="text-2xl font-bold text-brand-navy">Ku Saabsan Gabax</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Gabax Logistics waxaa loo aasaasay si ay u daboosho baahiyaha sii kordhaya ee ganacsiyada iyo shakhsiyaadka doonaya inay alaabo ka soo ridaan ama u soo diraan daafaha caalamka. Waxaan ku takhasusnay fududeynta rarista container-ada (Sea Freight) iyo xamuulka cirka (Air Freight) anagoo bixina adeegyo la isku halayn karo.
          </p>
          <p className="text-slate-600 leading-relaxed text-sm">
            Waxa aan mar kasta ku dadaalnaa in macaamiisheena ay helaan adeeg hufan oo la hubo oo laga ilaaliyo dib-u-dhacyada ama khaladaadka garoomada iyo dekedaha. Laga soo bilaabo goobta alaabta laga qaadayo ilaa meesha la dhigayo, waxaan hubinaa in cargo-gaagu uu nabad qabo.
          </p>
        </section>

        {/* Values Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy">Amniga Alaabta (Secure Shipping)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Waxaan u daryeelnaa cargo-gaaga si gaar ah. Iyadoo la adeegsanayo caymis dhab ah iyo xirmooyin xooggan si loo hubiyo inaysan waxyeello gaarin.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-brand-yellow-accent">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy">Isku Xidhka Caalamiga (Global Network)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Shabakadayada isku xidha Shiinaha, Dubai, Turkiga, Yurub, iyo Afrikada Bari waxay kuu sahlaysaa inaad alaab kasta meel kasta ka keento.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy">Koox Karti Leh (Professional Team)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hawl-wadeenadayada ayaa diyaar u ah inay kaa caawiyaan kastamka (customs clearance) iyo waraaqaha rasmiga ah ee shixnadda.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-brand-navy">Macaamiisha Koowaad (Customer Focus)</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kulamada iyo wadahadalka shaqsi ahaaneed waxaan ku hubinaa inaan buuxino dhammaan baahiyahaaga gaarka ah ee logistics-ka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
