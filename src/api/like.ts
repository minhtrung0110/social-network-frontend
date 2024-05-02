import http from '@/utils/http';
import { CreateLike, UpdateLike } from '@/schema/like.schema';
import { ApiResType } from '@/schema/comon.schema';

const likeApiRequest = {
  getAllByPostId: (postId: number) =>
    http.get(`like?postId=${postId}`, {
      cache: 'no-store',
    }),
  create: (body: CreateLike) => http.post<ApiResType>('like', body),
  update: (id: string, body: UpdateLike, session: string) =>
    http.patch(`like/${id}`, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }),
  delete: (body: CreateLike) => http.deleteAdvance<ApiResType>(`like`, body),

  sendCreateToNextServer: (body: CreateLike) =>
    http.post('/api/like', body, {
      baseUrl: '',
    }),
};

export default likeApiRequest;
