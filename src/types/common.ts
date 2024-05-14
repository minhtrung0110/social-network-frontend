export class ApiResponse<T> {
  status: number;
  message: string;
  data: T;

  constructor(statusCode: number, message: string, data: T) {
    this.status = statusCode;
    this.message = message;
    this.data = data;
  }
}

export type SN_Response = {
  status: number;
  data: any;
  message: string;
};
export type SearchParams = {
  [key: string]: string | number;
};

export interface MoreActionType {
  key: number;
  action: string;
  label: string;
  onAction: any;
}

export type SRType = 'new-feed' | 'post-detail';