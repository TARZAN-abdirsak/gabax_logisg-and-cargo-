import type { Metadata } from 'next';
import { Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers | Gabax Logistics',
  description: 'Join the Gabax Logistics team. Explore career opportunities in logistics, dispatch, and global cargo operations.',
};

export default function CareersPage() {
  const jobs = [
    {
      title: 'Logistics Operations Coordinator',
      location: 'Mogadishu Office (Full-time)',
      description: 'Coordinate cargo bookings, handle port liaison, track air and sea shipments, and communicate with global partners.'
    },
    {
      title: 'Warehouse Supervisor & Dispatch',
      location: 'Hargeisa Hub (Full-time)',
      description: 'Manage warehouse inventory, verify cargo weights, arrange local door-to-door deliveries, and supervise loading.'
    },
    {
      title: 'Customs Clearance Specialist',
      location: 'Port Office / Airport (Full-time)',
      description: 'Prepare customs manifests, process tax declarations, and coordinate clearance with government agencies.'
    }
  ];

  return (
    <div className="min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6 lg:px-8 animate-rise">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-yellow-accent">
            Ku Soo Biir Kooxdayada
          </span>
          <h1 className="text-4xl font-extrabold text-brand-navy sm:text-5xl tracking-wider uppercase">
            Careers at Gabax
          </h1>
          <p className="mx-auto max-w-xl text-slate-500 text-sm leading-relaxed">
            Build your career in the fast-growing logistics industry. We are looking for talented, dedicated professionals to join our operations.
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <div key={idx} className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm hover:border-brand-blue/30 transition-all">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy">{job.title}</h3>
                  <span className="inline-block mt-1 text-xs font-semibold text-brand-blue bg-blue-50 px-2 py-0.5 rounded-full">
                    {job.location}
                  </span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-blue/80"
                >
                  Apply Now <Briefcase className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
              <p className="mt-3 text-slate-600 text-xs leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-[#031f42] text-white p-8 text-center space-y-4">
          <h2 className="text-xl font-bold">Ma U baahan Tahay Fursad Kale?</h2>
          <p className="text-white/70 text-xs max-w-md mx-auto leading-relaxed">
            Haddii aad tahay wadista gaadiidka, khabiir xagga kootada ah, ama aad rabto inaad nala shaqayso, fadlan farriin iyo CV-gaaga noogu soo dir xiriirka hoose.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow px-6 py-3 text-xs font-bold text-brand-navy hover:bg-brand-yellow/90 transition-all hover:scale-102"
            >
              Contact HR <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
