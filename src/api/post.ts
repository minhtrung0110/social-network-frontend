import http from '@/utils/http';
import { CreatePostType, ListPostResType, PostResType, UpdatePostType } from '@/schema/post.schema';
import { ApiResType } from '@/schema/comon.schema';
import { SearchParams } from '@/types/common';
import { buildQueryString } from '@/utils/util';

const postApiRequest = {
  getListDemo: () =>
    http.get<ListPostResType>('/post', {
      next: { revalidate: 60000 },
      cache: 'no-store',
    }),
  getInfinite: (params: SearchParams) => {
    const url = `post?${buildQueryString(params)}`;
    return http.get(url, {
      cache: 'no-cache',
    });
  },
  getById: (id: string, sessionToken: string) =>
    http.get<PostResType>(`/post/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-cache',
    }),
  getByCondition: (userId: number, sessionToken: string) => {
    const url = `/post/related/${userId}`;
    return http.get<ListPostResType>(url, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-cache',
    });
  },
  sendCreatePostToNextServer: (body: CreatePostType) =>
    http.post<ApiResType>('/api/post', body, {
      baseUrl: '',
    }),
  createPost: (body: CreatePostType, sessionToken: string) =>
    http.post<ApiResType>('post', body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-cache',
    }),
  update: (id: number, body: UpdatePostType) => http.patch<ApiResType>(`/post/${id}`, body),

  // updateMe: (body: UpdateMeBodyType) => http.put<AccountResType>('account/me', body),
};

export default postApiRequest;
