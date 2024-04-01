// Libraries
import React from 'react';
import Image from 'next/image';

// Component

// Style

// Types

interface Props {
  // Define your component's props here
}

const Loader: React.FC<Props> = () => {
  return (
    <div className='flex-center w-full'>
      <Image
        src='/assets/logo.png'
        alt='loader'
        width={100}
        height={100}
        className='animate-spin'
      />
    </div>
  );
};

export default Loader;
