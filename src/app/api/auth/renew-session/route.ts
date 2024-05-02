import { cookies } from 'next/headers';
import authApiRequest from '@/api/auth';
import { HttpError } from '@/utils/http';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  if (!sessionToken) {
    return Response.json(
      { message: 'Can not get session token' },
      {
        status: 401,
      },
    );
  }
  try {
    const res = await authApiRequest.slideSessionFromNextServerToServer(sessionToken.value);
    const newExpiresDate = new Date(res.data.expiresAt.slice(0, -1));
    return Response.json(res, {
      status: 200,
      headers: {
        'Set-Cookie': `sessionToken=${sessionToken.value}; Path=/; HttpOnly; Expires=${newExpiresDate}; SameSite=Lax; Secure`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: 'Error not defined',
        },
        {
          status: 500,
        },
      );
    }
  }
}
