import http from '@/utils/http';
import { ApiResType } from '@/schema/comon.schema';
import { Saved } from '@/schema/saved.scheme';

const savedApiRequest = {
  create: (body: Saved) => http.post<ApiResType>('saved', body),
  delete: (body: Saved) => http.deleteAdvance<ApiResType>(`saved`, body),

  sendCreateToNextServer: (body: Saved) =>
    http.post('/api/saved', body, {
      baseUrl: '',
    }),
};

export default savedApiRequest;
