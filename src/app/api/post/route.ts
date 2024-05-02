import { cookies } from 'next/headers';
import { HttpError } from '@/utils/http';
import postApiRequest from '@/api/post';

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  if (!sessionToken) {
    return Response.json(
      { status: 400, message: 'Cannot receive token' },
      {
        status: 400,
      },
    );
  }
  try {
    const res = await postApiRequest.createPost(body, sessionToken?.value ?? '');

    if (res.status === 200)
      return Response.json(
        {
          status: res.status,
          data: res.data,
          message: 'Create post successfully',
        },
        { status: 200 },
      );
    else return Response.json({ data: res.data }, { status: 300 });
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
