import { NextRequest, NextResponse } from 'next/server';
import { HOSTNAME, HEADER } from '../apiConfig';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${HOSTNAME}/ckiplab/bert-base-chinese-ner`, {
    method: 'POST',
    headers: HEADER,
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return NextResponse.json(result);
}
