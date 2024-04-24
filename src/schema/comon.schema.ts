import z from 'zod';

export const MessageRes = z
  .object({
    status: z.number(),
    message: z.string(),
    data: z.string().nullable(),
  })
  .strict();

export type ApiResType = z.TypeOf<typeof MessageRes>;