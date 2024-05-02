import http from '@/utils/http';
import { AccountResType, UpdateUserBodyType, UpdateUserNameBodyType } from '@/schema/user.schema';
import { ApiResType } from '@/schema/comon.schema';
import { buildQueryString } from '@/utils/util';
import { SearchParams } from '@/types/common';

const userApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResType>('user/me', {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getAllUsers: (sessionToken: string) =>
    http.get<AccountResType>(`user`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    }),

  getUserById: (id: string, sessionToken: string) =>
    http.get<AccountResType>(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    }),
  searchUser: (params: SearchParams, sessionToken: string) => {
    const url = `user?${buildQueryString(params)}`;
    return http.get<AccountResType>(url, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
    });
  },
  getUsersFormClientToServer: (username: string) =>
    http.get<AccountResType>(`api/user/${username}`, {
      baseUrl: '',
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
  updateUserNameToNextServer: (id: number, body: UpdateUserNameBodyType) =>
    http.patch<AccountResType>(`api/user/username/${id}`, body, {
      baseUrl: '',
    }),

  // updateUserName: (id: number, body: UpdateUserNameBodyType) =>
  //   http.patch<AccountResType>(`/user/username/${id}`, body),
  updateUserName: (id: number, body: UpdateUserNameBodyType, sessionToken: string) =>
    http.patch<AccountResType>(`/user/username/${id}`, body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default userApiRequest;
