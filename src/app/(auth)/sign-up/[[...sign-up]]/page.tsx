// Libraries
// @ts-ignore
import React from 'react';
import Image from 'next/image';
import { ROUTES } from '@/constraints/route';
import Link from 'next/link';
import SignupForm from '@/app/(auth)/components/organisms/SignupForm';
import { GoogleIcon } from '@/components/atoms/icons';
import envConfig from '@/config/envConfig';

// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const SignUpPage: React.FC<Props> = (props) => {
  const handleSubmit = () => {

  };
  return (
    <div className={'w-full flex'}>
      <div className='relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex'>
        <div className='relative z-10 w-full max-w-md'>
          <Image src='/assets/logo.svg' alt='logo' width={380} height={255} />
          <div className=' mt-16 space-y-3'>
            <h3 className='text-white text-3xl font-bold'>Join now !</h3>
            <p className='text-gray-300'>
              SnapGram is a social media platform inspired by Instagram, allowing users to share moments and connect
              with friends in real-time.
            </p>
            <div className='flex items-center -space-x-2 overflow-hidden'>
              <Image src='/assets/signup01.jpg' alt={'i1'}
                     width={20} height={20}
                     className='w-10 h-10 rounded-full border-2 border-white' />
              <Image src='/assets/signup04.jpg' alt={'i1'}
                     width={20} height={20}
                     className='w-10 h-10 rounded-full border-2 border-white' />
              <Image src='/assets/signup02.jpg' alt={'i1'}
                     width={20} height={20}
                     className='w-10 h-10 rounded-full border-2 border-white' />
              <Image src='/assets/signup03.jpg' alt={'i1'}
                     width={20} height={20}
                     className='w-10 h-10 rounded-full border-2 border-white' />

              <p className='text-sm text-gray-400 font-medium translate-x-5'>
                Join 5.000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className='absolute inset-0 my-auto h-[500px]'
          style={{
            background: 'linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)',
            filter: 'blur(118px)',
          }}
        >

        </div>
      </div>
      <div className='flex-1 flex items-center justify-center h-screen'>
        <div className='w-full max-w-md space-y-6 px-4 bg-white text-gray-600 sm:px-0'>
          <div className=''>
            <div className='mt-0'>
              <h3 className='text-gray-800 text-xl font-bold sm:text-3xl'>Sign up</h3>
              <p className=''>Already have an account? <Link href={ROUTES.login.path}
                                                             className='font-medium text-indigo-600 hover:text-indigo-500'>Log
                in</Link></p>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-x-1'>
            <Link
              href={envConfig.NEXT_PUBLIC_OAUTH_URL}
              className='flex items-center justify-center py-2 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100'>
              <GoogleIcon />
            </Link>
          </div>
          <div className='relative'>
            <span className='block w-full h-px bg-gray-300'></span>
            <p className='inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto'>Or continue
              with</p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;