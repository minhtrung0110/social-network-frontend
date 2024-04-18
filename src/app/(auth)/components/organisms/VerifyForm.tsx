'use client';
// Libraries
import React from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formOTPSchema } from '@/app/(auth)/schema/auth.schema';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { z } from 'zod';
import authApiRequest from '@/api/auth';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constrants/route';

// Component

// Style

// Types

interface Props {
  // Define your component's props here
}

type formOTPSchemaType = z.infer<typeof formOTPSchema>;
const VerifyForm: React.FC<Props> = props => {
  const router = useRouter();
  const form = useForm<formOTPSchemaType>({
    resolver: zodResolver(formOTPSchema),
    mode: 'onSubmit',
  });

  const onVerify = async (data: formOTPSchemaType) => {
    console.log(data);
    const userId = JSON.parse(localStorage.getItem('snap_gram_user') || '');
    try {
      if (userId) {
        const res = await authApiRequest.verify(userId.id, data.otp);
        console.log('Res Verify:', res.payload.status);
        if (res.payload.status === 200) {
          toast({
            title: 'Success',
            description: 'Verified email successful',
          });
          router.push(ROUTES.login.path);
        } else
          toast({
            title: 'Error',
            description: 'OTP is invalid',
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onVerify)} className={'flex flex-col justify-center'}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className={'flex flex-col items-center justify-center'}>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot
                      index={0}
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                    <InputOTPSlot
                      index={1}
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot
                      index={2}
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                    <InputOTPSlot
                      index={3}
                      className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-[250px] max-w-[280px] mx-auto mt-4">
          <button
            type="submit"
            className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
          >
            Verify Account
          </button>
        </div>
      </form>
    </Form>
  );
};

export default VerifyForm;