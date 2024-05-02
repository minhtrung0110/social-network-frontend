import { HttpError } from '@/utils/http';
import userApiRequest from '@/api/user';
import { cookies } from 'next/headers';

export async function PATCH(request: Request, { params }: { params: { id: number } }) {
  const id = params.id;
  const body = await request.json();
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  try {
    const res = await userApiRequest.updateUserName(id, body, sessionToken?.value ?? '');
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