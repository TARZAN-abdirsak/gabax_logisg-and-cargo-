import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminQuotesManager } from '@/components/admin/AdminQuotesManager';

export default async function AdminQuotesPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }
  return (
    <AdminShell>
      <header className="mx-auto mb-7 max-w-4xl">
        <span className="ad-label">Channel 03</span>
        <h1 className="mt-1 text-4xl font-extrabold">Quote Requests</h1>
      </header>
      <AdminQuotesManager />
    </AdminShell>
  );
}
