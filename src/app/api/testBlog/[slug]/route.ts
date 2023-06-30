import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  console.log(params);
  const slug = params.slug;
  return NextResponse.json({ slug });
}
