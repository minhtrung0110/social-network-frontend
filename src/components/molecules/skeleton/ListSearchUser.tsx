// Libraries
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Component

// Constrant

// Types


interface Props {
  // Define your component's props here
}

const ListSearchUserSkeleton: React.FC<Props> = (props) => {
  return (
    <div className=''>
      <div className='flex-between py-2'>
        <div className='flex flex-row space-x-2'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-4 w-[110px]' />
            <Skeleton className='h-4 w-[160px]' />
          </div>
        </div>
        <Skeleton className='h-7 w-[80px]' />
      </div>
      <div className='flex-between py-2'>
        <div className='flex flex-row space-x-2'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-4 w-[110px]' />
            <Skeleton className='h-4 w-[160px]' />
          </div>
        </div>
        <Skeleton className='h-7 w-[80px]' />
      </div>
      <div className='flex-between py-2'>
        <div className='flex flex-row space-x-2'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-4 w-[110px]' />
            <Skeleton className='h-4 w-[160px]' />
          </div>
        </div>
        <Skeleton className='h-7 w-[80px]' />
      </div>
      <div className='flex-between py-2'>
        <div className='flex flex-row space-x-2'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-4 w-[110px]' />
            <Skeleton className='h-4 w-[160px]' />
          </div>
        </div>
        <Skeleton className='h-7 w-[80px]' />
      </div>
      <div className='flex-between py-2'>
        <div className='flex flex-row space-x-2'>
          <Skeleton className='h-10 w-10 rounded-full' />
          <div className='space-y-1'>
            <Skeleton className='h-4 w-[110px]' />
            <Skeleton className='h-4 w-[160px]' />
          </div>
        </div>
        <Skeleton className='h-7 w-[80px]' />
      </div>

    </div>
  );
};

export default ListSearchUserSkeleton;