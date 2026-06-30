import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import type { QuoteItem, QuoteStatus } from '@/types/quote';
import { getById, updateDoc, deleteDoc } from '@/lib/firestore';
import { isAuthenticated } from '@/lib/auth';

const COLLECTION = 'quotes';

type Params = { params: Promise<{ id: string }> };

/**
 * PATCH /api/quote/:id
 * Update quote status. Admin only.
 */
export async function PATCH(
  request: NextRequest,
  { params }: Params,
): Promise<NextResponse<ApiResponse<QuoteItem>>> {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  if (!body.status) {
    return NextResponse.json(
      { success: false, error: 'Status is required' },
      { status: 400 },
    );
  }

  const existing = await getById<QuoteItem>(COLLECTION, id);
  if (!existing) {
    return NextResponse.json(
      { success: false, error: 'Quote request not found' },
      { status: 404 },
    );
  }

  await updateDoc(COLLECTION, id, { status: body.status as QuoteStatus });
  const updated: QuoteItem = { ...existing, status: body.status as QuoteStatus };

  return NextResponse.json({ success: true, data: updated });
}

/**
 * DELETE /api/quote/:id
 * Remove a quote request. Admin only.
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
      { success: false, error: 'Quote request not found' },
      { status: 404 },
    );
  }

  return NextResponse.json({ success: true, data: { id } });
}
