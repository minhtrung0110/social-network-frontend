// Libraries
import React from 'react';
import VerifyForm from '@/app/(auth)/components/organisms/VerifyForm';

// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const Page: React.FC<Props> = (props) => {
  return (
    <div
      className='w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-200 to-pink-300"  '>
      <div className={' max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow'}>
        <header className='mb-8'>
          <h1 className='text-blue-800 text-2xl font-bold mb-1'>Email Verification</h1>
          <p className='text-[15px] text-slate-500'>Enter the 4-digit verification code that was sent to your email.</p>
        </header>
        <VerifyForm />
        <div className='text-sm text-slate-500 mt-4'>Did not receive code? <a
          className='font-medium text-indigo-500 hover:text-indigo-600'>Resend</a></div>
      </div>
    </div>
  );
};

export default Page;