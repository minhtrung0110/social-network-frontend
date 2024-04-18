// Libraries
import React from 'react';
import Image from 'next/image';
import { GoogleIcon } from '@/components/atoms/icons';
import Link from 'next/link';
import { ROUTES } from '@/constrants/route';
import SignInForm from '@/app/(auth)/components/organisms/SigninForm';

// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const SignInPage: React.FC<Props> = (props) => {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-white '>
      <div className='max-w-sm w-full text-gray-600 space-y-5'>
        <div className='text-center pb-8'>
          <Image src='/assets/logosnapgram.jpg' width={250} height={150} className='mx-auto'
                 alt={'login-logo'} />
          <div className='mt-5'>
            <h3 className='text-gray-800 text-2xl font-bold sm:text-3xl'>Log in to your account</h3>
          </div>
        </div>
        <SignInForm />
        <button
          className='w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100'>
          <GoogleIcon />
          Continue with Google
        </button>
        <p className='text-center'>Do not have an account?
          <Link href={ROUTES.register.path}
                className='font-medium text-indigo-600 hover:text-indigo-500'>Sign
            up</Link></p>
      </div>
    </div>

  );
};

export default SignInPage;