import http from '@/utils/http';
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
  uploadImageAuth: (body: FormData, sessionToken: string) =>
    http.post<FileResType>('/upload/firebase', body, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  uploadImage: (body: FormData) => http.post<FileResType>('/upload/firebase', body),
};

export default uploadApiRequest;
