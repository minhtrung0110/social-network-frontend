export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.sessionToken as string;
  const expiresAt = body.expiresAt as string;
  if (!sessionToken) {
    return Response.json(
      { message: 'Cannot receive token' },
      {
        status: 400,
      },
    );
  }
  const today = new Date();
  const expiresDate = new Date(today.getTime() + Number(expiresAt) * 1000);
  return Response.json(body, {
    status: 200,
    headers: {
      'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    },
  });
}
