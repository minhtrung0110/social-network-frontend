import z from 'zod';

export const CreateLikeSchema = z.object({
  userId: z.number(),
  postId: z.number(),
});

export const LikeSchema = z.object({
  userId: z.number(),
  //user: UserCompact,
  postId: z.number(),
});

export type CreateLike = z.TypeOf<typeof CreateLikeSchema>;
export type UpdateLike = z.TypeOf<typeof CreateLikeSchema>;
export type Like = z.TypeOf<typeof LikeSchema>;