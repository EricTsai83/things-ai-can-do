import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { HOSTNAME, HEADER } from '../apiConfig';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file');
  const response = await fetch(`${HOSTNAME}/akahana/vit-base-cats-vs-dogs`, {
    headers: HEADER,
    method: 'POST',
    body: file,
  });

  const result = await response.json();
  return NextResponse.json(result);
}
