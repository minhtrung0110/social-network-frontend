'use server';

import { cookies } from 'next/headers';

export async function createFollow(userId: number, followedId: number) {
  const cookie = cookies();
  const accessToken = cookie.get('sessionToken');
  const data = { userId, followId: followedId };
  const response = await fetch(`http://localhost:8888/api/v1/follow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken?.value}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
  // const res = await followApiRequest.create(data);
  // if (res.status === 200) return res.data.id;
  // else return null;
}