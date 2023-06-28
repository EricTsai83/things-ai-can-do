import { NextResponse } from 'next/server';

export async function POST(request: Request) {
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
  // console.log(res);

  const data = await res.json();

  return NextResponse.json(data);

  // const body = await request.json();
  // console.log(body);
  // request.headers.get('Authorization');
}

// export async function POST(request: Request) {
//   const body = await request.json();
//   return new Response('This is a new API route for testing.');
// }
