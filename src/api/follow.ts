import http from '@/utils/http';

import { ApiResType } from '@/schema/comon.schema';
import { Follow } from '@/schema/follow.schema';

const followApiRequest = {
  create: (body: Follow) => http.post<ApiResType>('follow', body),
  delete: (body: Follow) => http.deleteAdvance<ApiResType>(`follow`, body),
};

export default followApiRequest;
