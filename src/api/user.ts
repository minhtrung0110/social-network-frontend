import http from '@/_lib/http';
import { AccountResType, UpdateUserBodyType } from '@/schema/user.schema';
import { ApiResType } from '@/schema/comon.schema';

const userApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResType>('user/me', {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getUserById: (id: string, sessionToken: string) =>
    http.get<AccountResType>(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    }),

  // meClient: () => http.get<AccountResType>('account/me'),
  updateUserClientToNextServer: (id: number, body: UpdateUserBodyType) =>
    http.patch<ApiResType>(`/api/profile/${id}/update`, body, {
      baseUrl: '',
    }),
  updateUser: (id: number, body: UpdateUserBodyType, sessionToken: string) =>
    http.patch<AccountResType>(`/user/${id}`, body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default userApiRequest;
