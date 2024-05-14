import http from '@/utils/http';
import { CreateComment, UpdateComment } from '@/schema/comment.schema';
import { SearchParams } from '@/types/common';
import { buildQueryString } from '@/utils/util';

const commentApiRequest = {
  getAllByPostId: (postId: number) =>
    http.get(`comment?postId=${postId}`, {
      cache: 'no-cache',
    }),
  getInfiniteByPostId: (postId: number, params: SearchParams) => {
    const url = `comment/paginate?postId=${postId}&${buildQueryString(params)}`;
    return http.get(url, {
      cache: 'no-cache',
    });
  },
  getWithConditionByPostId: (postId: number, params: SearchParams) => {
    const url = `comment?postId=${postId}&${buildQueryString(params)}`;
    return http.get(url, {
      cache: 'no-cache',
    });
  },

  create: (body: CreateComment) => http.post('comment', body),
  update: (id: string, body: UpdateComment, session: string) =>
    http.patch(`comment/${id}`, body, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    }),
  delete: (id: number) => http.delete(`comment/${id}`),
};

export default commentApiRequest;
