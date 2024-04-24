import z from 'zod';

export const FileRes = z
  .object({
    status: z.number(),
    data: z.string(),
    message: z.string(),
  })
  .strict();

export type FileResType = z.TypeOf<typeof FileRes>;


