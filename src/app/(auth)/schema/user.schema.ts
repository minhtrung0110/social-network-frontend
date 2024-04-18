import z from 'zod';

export const AccountRes = z
  .object({
    status: z.number(),
    data: z.object({
      id: z.number(),
      username: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      avatar: z.string(),
    }),
    message: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;
