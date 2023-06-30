import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const res = await fetch(
    'https://bq37u9xc0k.execute-api.us-west-2.amazonaws.com/prod/rekognition',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file_name: 'aws-facial-recognition',
        image_base64: body.image_base64,
      }),
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
