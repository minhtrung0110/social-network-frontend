import z from 'zod';

export const formSignupSchema = z
  .object({
    firstName: z.string().max(256).min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    lastName: z.string().max(256).min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    email: z.string().email({
      message: 'Email is invalid',
    }),
    password: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/, {
        message: 'Password is weak',
      })
      .max(100)
      .min(6, {
        message: 'Password must be at least 6 characters',
      }),
    phoneNumber: z.string().length(10, {
      message: 'Phone number is invalid',
    }),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password is not correct',
        path: ['confirmPassword'],
      });
    }
  });
export const formOTPSchema = z.object({
  otp: z.string().length(4, {
    message: 'OTP is invalid',
  }),
});
// const RegisterBody = z
//   .object({
//     name: z.string().trim().min(2).max(256),
//     email: z.string().email(),
//     password: z.string().min(6).max(100),
//     confirmPassword: z.string().min(6).max(100),
//   })
//   .strict()
//   .superRefine(({ confirmPassword, password }, ctx) => {
//     if (confirmPassword !== password) {
//       ctx.addIssue({
//         code: 'custom',
//         message: 'Mật khẩu không khớp',
//         path: ['confirmPassword'],
//       });
//     }
//   });
export type AuthType = {
  status: number;
  message: string;
};
export type SignUpBodyType = z.TypeOf<typeof formSignupSchema>;
export type OTPBodyType = z.TypeOf<typeof formOTPSchema>;
export const SignUpRespond = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      username: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type SignUpRespondType = z.TypeOf<typeof SignUpRespond>;

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = SignUpRespond;

export type LoginResType = z.TypeOf<typeof LoginRes>;
export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;
export const SlideSessionRes = SignUpRespond;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;