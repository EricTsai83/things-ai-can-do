import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: any) {
  const response = await fetch(
    'https://api.github.com/search/users?q=trulymittal&per_page=1',
    {
      next: {
        revalidate: 10,
      },
    },
  );
  const user = await response.json();
  return NextResponse.json(user);
}
