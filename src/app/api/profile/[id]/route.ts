import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request, { params }: { params: { google: string } }) {
  const data = params.google;
  if (!data[0]) {
    return Response.json(
      { message: 'Cannot receive token' },
      {
        status: 400,
      },
    );
  }
  const cookie = cookies();
  cookie.set('sessionToken', data[0]);
  redirect('/');
}
