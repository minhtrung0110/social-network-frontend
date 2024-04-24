export type Post = {
  id: number;
  caption: string;
  tags: string;
  imageUrl: string;
  scope: string;
  userId: number;
  status: number;
  [key: string]: any;
};
