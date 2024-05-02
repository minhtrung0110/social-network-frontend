import http from '@/utils/http';
import { CreatePostType, ListPostResType, PostResType, UpdatePostType } from '@/schema/post.schema';
import { ApiResType } from '@/schema/comon.schema';

const postApiRequest = {
  getListDemo: () =>
    http.get<ListPostResType>('/post', {
      next: { revalidate: 60000 },
      cache: 'no-store',
    }),
  getById: (id: string, sessionToken: string) =>
    http.get<PostResType>(`/post/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  getList: (sessionToken: string) =>
    http.get<ListPostResType>('/post', {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      next: { revalidate: 60000 },
      cache: 'no-cache',
    }),
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
