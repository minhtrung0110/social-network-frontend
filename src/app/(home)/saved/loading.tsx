import React from 'react';
import { SpinnerIcon } from '@/components/atoms/icons';

function Loading() {
  return (
    <div className="flex h-[700px] items-center justify-center w-full ">
      <SpinnerIcon width={35} height={35} className="animate-spin h-12 w-12" />
    </div>
  );
}

export default Loading;
