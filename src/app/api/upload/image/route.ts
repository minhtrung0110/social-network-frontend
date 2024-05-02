import { cookies } from 'next/headers';
import { HttpError } from '@/utils/http';
import uploadApiRequest from '@/api/upload';

export async function POST(request: Request) {
  const body = await request.formData();
  const formData = new FormData();
  formData.append('file', body.get('file') as Blob);
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
    const res = await uploadApiRequest.uploadImageAuth(formData, sessionToken.value ?? '');
    if (res.status === 200) {
      return Response.json(
        { status: 200, data: res.data, message: 'Upload successfully' },
        {
          status: 200,
        },
      );
    }
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