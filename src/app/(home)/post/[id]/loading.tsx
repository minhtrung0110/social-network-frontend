// Libraries
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingListComments } from '@/components/molecules/skeleton/ListComments';


// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const DetailPostLoading: React.FC<Props> = (props) => {
  return (
    <div className={'post_details-container'}>
      <div className='hidden md:flex max-w-5xl w-full'>
        <Skeleton className='h-4 w-[250px]' />
      </div>
      <div className='post_details-card'>
        <div className='w-[60%] flex-center'>
          <Skeleton className='h-[620px] w-[650px]' />
        </div>
        <div className='w-[40%] px-5'>
          <div className='flex flex-row justify-start space-x-4 py-4'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <Skeleton className='h-8 w-[150px]' />
          </div>
          <div className='flex-center border-t border-gray-700 py-4 '>
            <Skeleton className='h-[80px] w-[280px]' />
          </div>
          <LoadingListComments />
          <div className='flex-center flex-col border-t border-gray-700 py-2'>
            <div className='flex flex-row space-x-8'>
              <Skeleton className='h-6 w-6' />
              <Skeleton className='h-6 w-6' />
              <Skeleton className='h-6 w-6' />
              <Skeleton className='h-6 w-6' />
            </div>
            <div className='flex py-3'>
              <Skeleton className='h-9 w-[350px]' />
            </div>

          </div>

        </div>
      </div>
      <div className={''}>

      </div>

    </div>
  );
};

export default DetailPostLoading;

