import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  return NextResponse.json({ name: 'Eric' });
}

export async function POST(request: NextRequest, { params }: any) {
  const body = await request.json();
  console.log(body);
  return NextResponse.json(body);
}
