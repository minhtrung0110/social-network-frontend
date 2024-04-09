'use client';
// Libraries
import React, { useState } from 'react';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import authApiRequest from '@/api/auth';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { handleErrorApi } from '@/_lib/utils';

// Component

// Style

// Types

interface Props {
  // Define your component's props here
}

const formSignInSchema = z.object({
  email: z.string().email({
    message: 'Email is invalid',
  }),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/, {
      message: 'Password is weak',
    })
    .min(6, {
      message: 'Password must be at least 6 characters',
    }),
});
type formSignInSchemaType = z.infer<typeof formSignInSchema>;
const SignInForm: React.FC<Props> = props => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<formSignInSchemaType>({
    resolver: zodResolver(formSignInSchema),
    mode: 'onSubmit',
  });
  const onSignIn = async (data: formSignInSchemaType) => {
    console.log('Sign-in data: ', data);
    // Call API
    if (loading) return;
    setLoading(true);
    try {
      const result = await authApiRequest.login(data);
      console.log('Result login: ', result);
      // call into server side
      await authApiRequest.auth({
        sessionToken: result.data.accessToken,
        expiresAt: result.data.expiresAt,
      });
      toast({
        description: result.message,
      });
      router.push('/');
      router.refresh();
    } catch (error: any) {
      handleErrorApi({
        error,
        setError: form.setError,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSignIn)} className=" space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type={'submit'}
          className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
        >
          Sign in
        </button>
      </form>
    </Form>
  );
};

export default SignInForm;