import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { AdminShell } from '@/components/admin/AdminShell';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default async function AdminHomePage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }
  return (
    <AdminShell>
      <AdminDashboard />
    </AdminShell>
  );
}
