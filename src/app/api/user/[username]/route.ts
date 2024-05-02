import { cookies } from 'next/headers';
import { HttpError } from '@/utils/http';
import userApiRequest from '@/api/user';

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const cookie = cookies();
  const sessionToken = cookie.get('sessionToken');
  if (!sessionToken) {
    return Response.json(
      { message: 'Can not get session token' },
      {
        status: 401,
      },
    );
  }
  try {
    const res = await userApiRequest.searchUser({ ...params }, sessionToken.value);
    return Response.json(res, {
      status: 200,
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