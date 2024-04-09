import http from '@/_lib/http';
import {
  AuthType,
  LoginBodyType,
  LoginResType,
  SignUpBodyType,
  SignUpRespondType,
} from '@/app/(auth)/schema/auth.schema';

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
  // logoutFromNextServerToServer: (sessionToken: string) =>
  //   http.post<MessageResType>(
  //     '/auth/logout',
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionToken}`,
  //       },
  //     },
  //   ),
  // logoutFromNextClientToNextServer: (
  //   force?: boolean | undefined,
  //   signal?: AbortSignal | undefined,
  // ) =>
  //   http.post<MessageResType>(
  //     '/api/auth/logout',
  //     {
  //       force,
  //     },
  //     {
  //       baseUrl: '',
  //       signal,
  //     },
  //   ),
  // slideSessionFromNextServerToServer: (sessionToken: string) =>
  //   http.post<SlideSessionResType>(
  //     '/auth/slide-session',
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${sessionToken}`,
  //       },
  //     },
  //   ),
  // slideSessionFromNextClientToNextServer: () =>
  //   http.post<SlideSessionResType>('/api/auth/slide-session', {}, { baseUrl: '' }),
};

export default authApiRequest;