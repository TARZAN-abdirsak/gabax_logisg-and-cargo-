import type { QuoteRequest, QuoteItem, QuoteStatus } from '@/types/quote';
import type { ApiResponse } from '@/types/common';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

async function parse<T>(response: Response): Promise<ApiResponse<T>> {
  const json = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !json.success) {
    throw new Error(json.error || `Request failed (${response.status})`);
  }
  return json;
}

/** Submit a quote request. Public. */
export async function submitQuoteRequest(
  request: QuoteRequest,
): Promise<QuoteItem> {
  const response = await fetch(`${API_BASE}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  const json = await parse<QuoteItem>(response);
  return json.data!;
}

/** Fetch all quote requests (admin only). */
export async function fetchQuotes(): Promise<QuoteItem[]> {
  const response = await fetch(`${API_BASE}/quote`, { cache: 'no-store' });
  const json = await parse<QuoteItem[]>(response);
  return json.data ?? [];
}

/** Update status of a quote request (admin only). */
export async function updateQuoteStatus(
  id: string,
  status: QuoteStatus,
): Promise<QuoteItem> {
  const response = await fetch(`${API_BASE}/quote/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const json = await parse<QuoteItem>(response);
  return json.data!;
}

/** Delete a quote request (admin only). */
export async function deleteQuote(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/quote/${id}`, {
    method: 'DELETE',
  });
  await parse<{ id: string }>(response);
}
