import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  console.log(params);

  return NextResponse.json(params);
}
