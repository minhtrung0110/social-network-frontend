import z from 'zod';

export const FollowSchema = z.object({
  userId: z.number(),
  followId: z.number(),
});

export type Follow = z.TypeOf<typeof FollowSchema>;