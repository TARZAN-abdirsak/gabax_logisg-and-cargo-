import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import type { ApiResponse } from '@/types/common';
import type { QuoteItem, QuoteRequest } from '@/types/quote';
import { readCollection, writeCollection } from '@/lib/jsonStore';
import { isAuthenticated } from '@/lib/auth';

const FILE = 'quotes.json';

function byNewest(a: QuoteItem, b: QuoteItem): number {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

/**
 * GET /api/quote
 * List all quote requests. Admin only.
 */
export async function GET(): Promise<NextResponse<ApiResponse<QuoteItem[]>>> {
  if (!(await isAuthenticated())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 },
    );
  }

  const all = await readCollection<QuoteItem>(FILE);
  return NextResponse.json({ success: true, data: [...all].sort(byNewest) });
}

/**
 * POST /api/quote
 * Submit a quote request. Public.
 */
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<QuoteItem>>> {
  let body: QuoteRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  // Basic validation
  if (!body.serviceType || !body.weight || !body.origin?.city || !body.destination?.city || !body.contact?.name || (!body.contact?.phone && !body.contact?.email)) {
    return NextResponse.json(
      { success: false, error: 'Missing required fields' },
      { status: 400 },
    );
  }

  const quote: QuoteItem = {
    id: randomUUID(),
    serviceType: body.serviceType,
    origin: body.origin,
    destination: body.destination,
    weight: Number(body.weight),
    dimensions: body.dimensions,
    description: body.description || '',
    contact: body.contact,
    specialInstructions: body.specialInstructions,
    insurance: Boolean(body.insurance),
    pickupDate: body.pickupDate || new Date().toISOString().split('T')[0],
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  const all = await readCollection<QuoteItem>(FILE);
  all.push(quote);
  await writeCollection(FILE, all);

  return NextResponse.json(
    { success: true, data: quote, message: 'Codsigaga qiimo-sheegga waa la helay. Waan kula soo xiriiri doonaa dhawaan.' },
    { status: 201 },
  );
}
