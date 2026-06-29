import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/types/common';
import type { QuoteItem, QuoteStatus } from '@/types/quote';
import { readCollection, writeCollection } from '@/lib/jsonStore';
import { isAuthenticated } from '@/lib/auth';

const FILE = 'quotes.json';

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

  const all = await readCollection<QuoteItem>(FILE);
  const index = all.findIndex((q) => q.id === id);
  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Quote request not found' },
      { status: 404 },
    );
  }

  const updated: QuoteItem = { ...all[index], status: body.status as QuoteStatus };
  all[index] = updated;
  await writeCollection(FILE, all);

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
  const all = await readCollection<QuoteItem>(FILE);
  const next = all.filter((q) => q.id !== id);
  if (next.length === all.length) {
    return NextResponse.json(
      { success: false, error: 'Quote request not found' },
      { status: 404 },
    );
  }

  await writeCollection(FILE, next);
  return NextResponse.json({ success: true, data: { id } });
}
