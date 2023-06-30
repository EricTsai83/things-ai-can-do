// In this file, we can define any type of request as follows:
// export async function GET(request: Request) {}
// export async function HEAD(request: Request) {}
// export async function POST(request: Request) {}
// export async function PUT(request: Request) {}
// export async function DELETE(request: Request) {}
// export async function PATCH(request: Request) {}
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) {}

import { NextResponse, NextRequest } from 'next/server';

// export async function GET(request: NextRequest, { params }: any) {
//   const name = request.nextUrl.searchParams.get('name');
//   const age = request.nextUrl.searchParams.get('age');
//   return NextResponse.json({ name, age });
// }
export async function GET(request: NextRequest, { params }: any) {
  const authHeader = request.headers.get('Authorization');
  const cookie = request.cookies.get('foo');
  return NextResponse.json({ authHeader, cookie });
}

export async function POST(request: NextRequest, { params }: any) {
  const body = request.body;
  console.log(body);

  return NextResponse.json(body);
}
