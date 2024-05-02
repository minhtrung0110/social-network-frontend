import z from 'zod';
import { UserCompact } from '@/schema/user.schema';
import { CommentSchema } from '@/schema/comment.schema';

export const CreateLikeSchema = z.object({
  userId: z.number(),
  postId: z.number(),
});

export const LikeSchema = z.object({
  id: z.number(),
  userId: z.number(),
  user: UserCompact,
  postId: z.number(),
});

export type CreateLike = z.TypeOf<typeof CreateLikeSchema>;
export type UpdateLike = z.TypeOf<typeof CreateLikeSchema>;
export type CommentObj = z.TypeOf<typeof CommentSchema>;