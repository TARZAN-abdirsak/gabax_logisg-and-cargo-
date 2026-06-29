import type { ApiResponse } from '@/types/common';
import type {
  CreateFeedbackInput,
  FeedbackItem,
  FeedbackStatus,
  PublicTestimonial,
} from '@/types/feedback';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

async function parse<T>(response: Response): Promise<ApiResponse<T>> {
  const json = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !json.success) {
    throw new Error(json.error || `Request failed (${response.status})`);
  }
  return json;
}

/** List feedback (admin only). */
export async function fetchFeedback(): Promise<FeedbackItem[]> {
  const response = await fetch(`${API_BASE}/feedback`, { cache: 'no-store' });
  const json = await parse<FeedbackItem[]>(response);
  return json.data ?? [];
}

/** Public, admin-featured testimonials (no email/phone). */
export async function fetchApprovedFeedback(): Promise<PublicTestimonial[]> {
  const response = await fetch(`${API_BASE}/feedback?public=true`, {
    cache: 'no-store',
  });
  const json = await parse<PublicTestimonial[]>(response);
  return json.data ?? [];
}

export async function submitFeedback(
  input: CreateFeedbackInput,
): Promise<FeedbackItem> {
  const response = await fetch(`${API_BASE}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const json = await parse<FeedbackItem>(response);
  return json.data!;
}

export async function updateFeedbackStatus(
  id: string,
  status: FeedbackStatus,
): Promise<FeedbackItem> {
  const response = await fetch(`${API_BASE}/feedback/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  const json = await parse<FeedbackItem>(response);
  return json.data!;
}

export async function deleteFeedback(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/feedback/${id}`, {
    method: 'DELETE',
  });
  await parse<{ id: string }>(response);
}
