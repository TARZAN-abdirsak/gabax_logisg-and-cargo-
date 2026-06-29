import type { ApiResponse } from '@/types/common';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function adminLogin(password: string): Promise<void> {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const json = (await response.json()) as ApiResponse<unknown>;
  if (!response.ok || !json.success) {
    throw new Error(json.error || 'Login failed');
  }
}

export async function adminLogout(): Promise<void> {
  await fetch(`${API_BASE}/admin/logout`, { method: 'POST' });
}
