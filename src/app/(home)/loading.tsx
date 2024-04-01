import React from 'react';
import Image from 'next/image';

function Loading() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Image src={'/assets/logo.svg'} className='animate-spin h-12 w-12' alt={'logo'} />
    </div>
  );
}

export default Loading;
