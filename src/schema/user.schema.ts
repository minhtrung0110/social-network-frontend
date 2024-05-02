import z from 'zod';

export const UserObj = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  avatar: z.string().nullable(),
  birthday: z.date(),
  address: z.string().optional(),
  gender: z.string().optional(),
});
export const UserCompact = z.object({
  id: z.number(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  avatar: z.string().nullable(),
});
export const AccountRes = z
  .object({
    status: z.number(),
    data: UserObj,
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

export const UpdateUserName = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(18, { message: 'Name must be at maximum 18 characters.' }),
});

export type UpdateUserNameBodyType = z.TypeOf<typeof UpdateUserName>;
export type UpdateUserBodyType = z.TypeOf<typeof UpdateUser>;
export type FullUser = z.TypeOf<typeof UserObj>;
export type SRUser = z.TypeOf<typeof UserCompact>;