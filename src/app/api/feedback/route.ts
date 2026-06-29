import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import type { ApiResponse } from '@/types/common';
import type { FeedbackItem, PublicTestimonial } from '@/types/feedback';
import { readCollection, writeCollection } from '@/lib/jsonStore';
import { createFeedbackSchema } from '@/lib/schemas';
import { isAuthenticated } from '@/lib/auth';

const FILE = 'feedback.json';

function byNewest(a: FeedbackItem, b: FeedbackItem): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

/**
 * GET /api/feedback
 * - `?public=true` (no auth): returns admin-featured testimonials only,
 *   with email/phone stripped out.
 * - otherwise: full list, admin only.
 */
export async function GET(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<FeedbackItem[] | PublicTestimonial[]>>> {
  const isPublic = request.nextUrl.searchParams.get('public') === 'true';

  if (isPublic) {
    const all = await readCollection<FeedbackItem>(FILE);
    const testimonials: PublicTestimonial[] = all
      .filter((f) => f.status === 'reviewed')
      .sort(byNewest)
      .map(({ id, name, rating, message, createdAt }) => ({
        id,
        name,
        rating,
        message,
        createdAt,
      }));
    return NextResponse.json({ success: true, data: testimonials });
  }

  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const all = await readCollection<FeedbackItem>(FILE);
  return NextResponse.json({ success: true, data: [...all].sort(byNewest) });
}

/**
 * POST /api/feedback
 * Submit feedback. Public.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<FeedbackItem>>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = createFeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  const item: FeedbackItem = {
    id: randomUUID(),
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    rating: parsed.data.rating,
    message: parsed.data.message,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  const all = await readCollection<FeedbackItem>(FILE);
  all.push(item);
  await writeCollection(FILE, all);

  return NextResponse.json(
    { success: true, data: item, message: 'Thanks for your feedback!' },
    { status: 201 },
  );
}
