import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import type { ApiResponse } from '@/types/common';
import { addDoc } from '@/lib/firestore';

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactMessage extends ContactBody {
  id: string;
  createdAt: string;
}

const COLLECTION = 'contacts';

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ApiResponse<ContactMessage>>> {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  if (!body.name || !body.email || !body.subject || !body.message) {
    return NextResponse.json(
      { success: false, error: 'Name, email, subject, and message are required' },
      { status: 400 },
    );
  }

  const contactMessage: ContactMessage = {
    id: randomUUID(),
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    subject: body.subject,
    message: body.message,
    createdAt: new Date().toISOString(),
  };

  await addDoc(COLLECTION, contactMessage.id, { ...contactMessage });

  return NextResponse.json(
    { success: true, message: 'Message sent successfully!' },
    { status: 201 },
  );
}
