import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminBookingsManager } from '@/components/admin/AdminBookingsManager';

export default async function AdminBookingsPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }
  return (
    <AdminShell>
      <header className="mx-auto mb-7 max-w-4xl">
        <span className="ad-label">Channel 04</span>
        <h1 className="mt-1 text-4xl font-extrabold">Bookings</h1>
      </header>
      <AdminBookingsManager />
    </AdminShell>
  );
}
