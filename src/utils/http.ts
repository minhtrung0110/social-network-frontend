import envConfig from '@/config/envConfig';
import { normalizePath } from '@/utils/util';
import { LoginResType } from '@/schema/auth.schema';
import { redirect } from 'next/navigation';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };

  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;

  constructor({ status, payload }: { status: 422; payload: EntityErrorPayload }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = '';
  private _expiresAt = new Date().toISOString();

  get expiresAt() {
    return this._expiresAt;
  }

  set expiresAt(expiresAt: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
    }
    this._expiresAt = expiresAt;
  }

  get value() {
    return this.token;
  }

  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
    }
    this.token = token;
  }
}

export const clientSessionToken = new SessionToken();
let clientLogoutRequest: null | Promise<any> = null;

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options?: CustomOptions | undefined,
) => {
  const body = options?.body
    ? options.body instanceof FormData
      ? options.body
      : JSON.stringify(options.body)
    : undefined;

  const baseHeaders = !(body instanceof FormData) && { 'Content-Type': 'application/json' };
  // ? {
  //     Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
  //   }
  // : {
  //     'Content-Type': 'application/json',
  //     Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : '',
  //   };
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  console.log('baseUrl: ' + fullUrl);

  const res = await fetch(fullUrl, {
    ...options,
    credentials: 'include', // allow to attach cookie when send request to Server
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,

    body,
    method,
  });
  const payload = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        },
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (typeof window !== 'undefined') {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: {
              ...baseHeaders,
            } as any,
          });

          await clientLogoutRequest;
          clientSessionToken.value = '';
          clientSessionToken.expiresAt = new Date().toISOString();
          clientLogoutRequest = null;
          location.href = '/sign-in';
        }
      } else {
        // auto logout when token is expired
        // const sessionToken = (options?.headers as any)?.Authorization.split('Bearer ')[1];
        // console.log('Session token was redirected to ' + sessionToken);
        redirect(`/sign-out`);
      }
    } else {
      throw new HttpError(data);
    }
  }
  // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
  if (typeof window !== 'undefined') {
    //console.log('Chay logic setToken', url, clientSessionToken);
    if (['auth/login', 'auth/register'].some(item => item === normalizePath(url))) {
      console.log('set Token =value');
      clientSessionToken.value = (payload as LoginResType).data.accessToken;
      clientSessionToken.expiresAt = (payload as LoginResType).data.expiresAt;
    } else if ('auth/sign-out' === normalizePath(url)) {
      // console.log('Xoa Token rong');
      clientSessionToken.value = '';
      clientSessionToken.expiresAt = new Date().toISOString();
    }
  }
  return { status: data.payload.status, data: data.payload.data, message: data.payload.message };
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('GET', url, { ...options });
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PUT', url, { ...options, body });
  },
  patch<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('PATCH', url, { ...options, body });
  },
  delete<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>('DELETE', url, { ...options });
  },
  deleteAdvance<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, 'body'> | undefined,
  ) {
    return request<Response>('DELETE', url, { ...options, body });
  },
};

export default http;