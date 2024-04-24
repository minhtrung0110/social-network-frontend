import http from '@/_lib/http';
import { ListPostResType } from '@/schema/post.schema';

const postApiRequest = {
  getList: (sessionToken: string) =>
    http.get<ListPostResType>('post', {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'force-cache',
    }),

  // updateMe: (body: UpdateMeBodyType) => http.put<AccountResType>('account/me', body),
};

export default postApiRequest;
