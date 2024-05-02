import http from '@/utils/http';
import { CreateComment, UpdateComment } from '@/schema/comment.schema';

const commentApiRequest = {
  getAllByPostId: (postId: number) =>
    http.get(`comment?postId=${postId}`, {
      cache: 'no-store',
    }),
  create: (body: CreateComment) => http.post('comment', body),
  update: (id: string, body: UpdateComment, session: string) =>
    http.patch(`comment/${id}`, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }),
  delete: (id: string, session: string) =>
    http.delete(`comment/${id}`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }),
};

export default commentApiRequest;
