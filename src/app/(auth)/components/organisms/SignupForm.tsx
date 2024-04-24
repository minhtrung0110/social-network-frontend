'use client';
// Libraries
import React, { useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { formSignupSchema } from '@/schema/auth.schema';
import { toast } from '@/components/ui/use-toast';
import authApiRequest from '@/api/auth';
import { usePathname, useRouter } from 'next/navigation';
import { SpinnerIcon } from '@/components/atoms/icons';

// Component

// Style

// Types

interface Props {
  // Define your component's props here
}

type formSignUpSchemaType = z.infer<typeof formSignupSchema>;
const SignupForm: React.FC<Props> = props => {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, startTransition] = useTransition();

  const form = useForm<formSignUpSchemaType>({
    resolver: zodResolver(formSignupSchema),
    mode: 'onSubmit',
  });
  const onSignUp = async (data: formSignUpSchemaType) => {
    // Call API
    try {
      const result = await authApiRequest.register(data);
      console.log('Signup data: ', result);
      if (result) {
        const user = {
          id: result.data.id,
        };
        console.log('Save User: ', user);
        //localStorage.removeItem('snap_gram_user');
        localStorage.setItem('snap_gram_user', JSON.stringify(user));
        router.push(`${pathname}/verify`);
      } else
        toast({
          title: 'Error',
          description: 'Cannot register form',
          variant: 'destructive',
        });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Cannot register form',
        variant: 'destructive',
      });
    }
  };
  const submitForm = (data: formSignUpSchemaType) => {
    startTransition(() => onSignUp(data));
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitForm)} className="!mt-1.5 space-y-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your first name"
                  className="w-full mt-2 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your last name"
                  className="w-full mt-2 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="w-full mt-2 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
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
                  className="w-full mt-2 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your confirm password"
                  type="password"
                  className="w-full mt-2 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  className="w-full mt-2 px-3 py-1.5 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <div className="w-full flex justify-center !mt-6 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Create account
            <SpinnerIcon width={24} height={24} className="ml-5 animate-spin" />
          </div>
        ) : (
          <button
            type={'submit'}
            className="w-full flex justify-center !mt-6 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Create account
          </button>
        )}
      </form>
    </Form>
  );
};

export default SignupForm;