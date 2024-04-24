import http from '@/_lib/http';
import {
  AuthType,
  LoginBodyType,
  LoginResType,
  SignUpBodyType,
  SignUpRespondType,
  SlideSessionResType,
} from '@/schema/auth.schema';
import { ApiResType } from '@/schema/comon.schema';

const authApiRequest = {
  login: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  register: (body: SignUpBodyType) => http.post<SignUpRespondType>('/auth/register', body),
  verify: (userId: string, token: string) =>
    http.get<AuthType>(`/auth/register/confirm?token=${token}&userId=${userId}`, {
      cache: 'no-store',
    }),
  auth: (body: { sessionToken: string; expiresAt: string }) =>
    http.post('/api/auth', body, {
      baseUrl: '',
    }),
  logoutFromNextServerToServer: (sessionToken: string) =>
    http.post<ApiResType>(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      },
    ),
  logoutFromNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined,
  ) =>
    http.post<ApiResType>(
      '/api/auth/sign-out',
      {
        force,
      },
      {
        baseUrl: '',
        signal,
      },
    ),
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      '/auth/renewal-session',
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      },
    ),
  slideSessionFromNextClientToNextServer: () =>
    http.post<SlideSessionResType>('/api/auth/renew-session', {}, { baseUrl: '' }),
};

export default authApiRequest;