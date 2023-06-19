// In this file, we can define any type of request as follows:
// export async function GET(request: Request) {}
// export async function HEAD(request: Request) {}
// export async function POST(request: Request) {}
// export async function PUT(request: Request) {}
// export async function DELETE(request: Request) {}
// export async function PATCH(request: Request) {}
// // If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
// export async function OPTIONS(request: Request) {}

export async function GET(request: Request) {
  return new Response('This is a new API route for testing.');
}
