import z from 'zod';
import { UserCompact } from '@/schema/user.schema';

export const CommentItem = z.object({
  id: z.number(),
  content: z.string(),
  userId: z.number(),
  postId: z.number(),
  replyId: z.number().nullable(),
});
export const CreateCommentSchema = z.object({
  content: z.string(),
  userId: z.number(),
  postId: z.number(),
  replyId: z.number().nullable(),
});

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  userId: z.number(),
  user: UserCompact,
  postId: z.number(),
  replyId: z.number().nullable(),
  updatedAt: z.string().optional(),
});
export type Comment = z.TypeOf<typeof CommentItem>;
export type CreateComment = z.TypeOf<typeof CreateCommentSchema>;
export type UpdateComment = z.TypeOf<typeof CreateCommentSchema>;
export type CommentObj = z.TypeOf<typeof CommentSchema>;