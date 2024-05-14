import React from 'react';
import { SpinnerIcon } from '@/components/atoms/icons';

function Loading() {
  return (
    <div className="flex-center w-full h-[700px]">
      <div className={'flex-center'}>
        <SpinnerIcon width={40} height={40} className="animate-spin h-14 w-14" />
      </div>
    </div>
  );
}

export default Loading;
