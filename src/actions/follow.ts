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
}

export async function deleteFollow(userId: number, followedId: number) {
  const cookie = cookies();
  const accessToken = cookie.get('sessionToken');
  const data = { userId, followId: followedId };
  const response = await fetch(`http://localhost:8888/api/v1/follow`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken?.value}`,
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}