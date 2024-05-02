import { HttpError } from '@/utils/http';
import likeApiRequest from '@/api/like';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  try {
    const res = await likeApiRequest.create(body, sessionToken?.value ?? '');

    return Response.json(res);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(
        {
          message: error.message,
          payload: error.payload,
        },
        {
          status: 400,
        },
      );
    } else {
      return Response.json(
        {
          message: 'Error not defined',
          error: error,
        },
        {
          status: 400,
        },
      );
    }
  }
}