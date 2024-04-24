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
      avatar: z.string().nullable(),
      birthday: z.date(),
      address: z.string(),
      gender: z.string(),
    }),
    message: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const UpdateUser = z.object({
  avatar: z.custom<File[]>().nullable(),
  firstName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  birthday: z.date(),
  address: z.string(),
  gender: z.string(),
  //bio: z.string(),
});

export type UpdateUserBodyType = z.TypeOf<typeof UpdateUser>;
