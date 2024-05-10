import z from 'zod';

export const PostItem = z.object({
  id: z.number(),
  caption: z.string(),
  tags: z.string(),
  imageUrl: z.string(),
  scope: z.string(),
  user: z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    avatar: z.string(),
  }),
  Like: z.array(
    z.object({
      userId: z.number(),
    }),
  ),
  postSaved: z.array(z.object({ userId: z.number() })),
  status: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export const PostsRes = z.array(
  z.object({
    status: z.number(),
    data: z.array(PostItem),
    message: z.string(),
  }),
);

export const CreatePost = z.object({
  caption: z
    .string()
    .min(5, { message: 'Minimum 5 characters.' })
    .max(2200, { message: 'Maximum 2,200 caracters' }),
  imageUrl: z.custom<File[]>().nullable(),
  tags: z.string(),
  scope: z.string(),
  userId: z.number().optional(),
});

export const PostRes = z
  .object({
    status: z.number(),
    data: PostItem,
    message: z.string(),
  })
  .strict();
export type Post = z.TypeOf<typeof PostItem>;
export type ListPostResType = z.TypeOf<typeof PostsRes>;
export type PostResType = z.TypeOf<typeof PostRes>;
export type CreatePostType = z.TypeOf<typeof CreatePost>;
export type UpdatePostType = z.TypeOf<typeof CreatePost>;
export type UpdatePostQueryType = z.TypeOf<typeof CreatePost> & { id: number };

