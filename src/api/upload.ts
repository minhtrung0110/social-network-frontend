import http from '@/_lib/http';
import { FileResType } from '@/schema/upload.schema';

const uploadApiRequest = {
  sendFileToNextServer: (body: FormData) =>
    http.post<FileResType>('/api/upload/image', body, {
      baseUrl: '',
    }),
  // uploadImage: (body: FormData, sessionToken: string) =>
  //   http.post<FileResType>('/upload/firebase', body, {
  //     headers: {
  //       Authorization: `Bearer ${sessionToken}`,
  //     },
  //   }),
  uploadImage: (body: FormData, sessionToken: string) =>
    http.post<FileResType>('/upload/firebase', body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
};

export default uploadApiRequest;
