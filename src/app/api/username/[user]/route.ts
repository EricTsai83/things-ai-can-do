// Building nested and dynamic routes
export async function GET(
  request: Request,
  { params }: { params: { user: string } },
): Promise<Response> {
  const user = params.user;
  return new Response(`Welcome to my Next application, user: ${user}`);
}
