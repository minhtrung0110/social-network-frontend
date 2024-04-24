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

export const PostRes = z
  .object({
    status: z.number(),
    data: PostItem,
    message: z.string(),
  })
  .strict();

export type ListPostResType = z.TypeOf<typeof PostsRes>;
export type PostResType = z.TypeOf<typeof PostRes>;
export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;
