import z from 'zod';

export const SavedItem = z.object({
  userId: z.number(),
  postId: z.number(),
});

export type Saved = z.TypeOf<typeof SavedItem>;
export type SavedCompact = Omit<z.TypeOf<typeof SavedItem>, 'postId'>;