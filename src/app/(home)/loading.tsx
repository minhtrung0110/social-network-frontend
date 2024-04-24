import React from 'react';
import { SpinnerIcon } from '@/components/atoms/icons';

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SpinnerIcon width={35} height={35} className="animate-spin h-12 w-12" />
    </div>
  );
}

export default Loading;
