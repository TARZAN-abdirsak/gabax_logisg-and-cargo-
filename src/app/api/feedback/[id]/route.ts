import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import type { FeedbackItem } from '@/types/feedback';
import { getById, updateDoc, deleteDoc } from '@/lib/firestore';
import { updateFeedbackSchema } from '@/lib/schemas';
import { isAuthenticated } from '@/lib/auth';

const COLLECTION = 'feedback';

type Params = { params: Promise<{ id: string }> };

/**
 * PATCH /api/feedback/:id
 * Update feedback status (new / reviewed / archived). Admin only.
 */
export async function PATCH(
  request: NextRequest,
  { params }: Params,
): Promise<NextResponse<ApiResponse<FeedbackItem>>> {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const parsed = updateFeedbackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 },
    );
  }

  const existing = await getById<FeedbackItem>(COLLECTION, id);
  if (!existing) {
    return NextResponse.json(
      { success: false, error: 'Feedback not found' },
      { status: 404 },
    );
  }

  await updateDoc(COLLECTION, id, { status: parsed.data.status });
  const updated: FeedbackItem = { ...existing, status: parsed.data.status };

  return NextResponse.json({ success: true, data: updated });
}

/**
 * DELETE /api/feedback/:id
 * Permanently remove feedback. Admin only.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: Params,
): Promise<NextResponse<ApiResponse<{ id: string }>>> {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const { id } = await params;
  const deleted = await deleteDoc(COLLECTION, id);
  if (!deleted) {
    return NextResponse.json(
      { success: false, error: 'Feedback not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: { id } });
}
