export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.sessionToken as string;
  const expiresAt = body.expiresAt;
  if (!sessionToken) {
    return Response.json(
      { message: 'Cannot receive token' },
      {
        status: 400,
      },
    );
  }
  const today = new Date();
  const expiresDate = new Date(Date.now() - 7 * 3600000 + Number(expiresAt) * 1000);
  // Múi giờ -420 lệch 7h nên phải trừ ra 7h
  console.log('Exp', today.getTime(), Number(expiresAt) * 1000, expiresDate);
  
  return Response.json(body, {
    status: 200,
    headers: {
      'Set-Cookie': `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    },
  });
}
