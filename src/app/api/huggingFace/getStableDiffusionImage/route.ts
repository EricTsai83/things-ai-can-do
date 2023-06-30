import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { HOSTNAME, HEADER } from '../apiConfig';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${HOSTNAME}/runwayml/stable-diffusion-v1-5`, {
    method: 'POST',
    headers: HEADER,
    body: JSON.stringify(body),
  });

  const result = await response.blob();
  return new NextResponse(result);
}
