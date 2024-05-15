import http from '@/utils/http';

import { ApiResType } from '@/schema/comon.schema';
import { Follow } from '@/schema/follow.schema';
import { buildQueryString } from '@/utils/util';
import { SearchParams } from '@/types/common';

const followApiRequest = {
  getFollow: (userId: number, type: string = 'follower', params: SearchParams) => {
    const url = `follow/${type}/${userId}?${buildQueryString(params)}`;
    return http.get(url, {
      cache: 'no-store',
    });
  },

  create: (body: Follow) => http.post<ApiResType>('follow', body),
  delete: (body: Follow) => http.deleteAdvance<ApiResType>(`follow`, body),
};

export default followApiRequest;
