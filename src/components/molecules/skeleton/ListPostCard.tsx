import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { generateArray } from '@/utils/util';

interface LoadingListPostCardProps {
  amount?: number;
}

export const LoadingListPostCard = (props: LoadingListPostCardProps) => {
  const { amount = 1 } = props;
  const array = generateArray(amount);
  return array.map((post: any) => <LoadingPostCard key={`key-${post}`} />);
};
export const LoadingPostCard = () => (
  <div className="postcard-skeleton p-2 space-y-4 ">
    <div className="flex-start space-x-2 px-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
    <div className="flex-center flex-col space-y-2 ">
      <div className="space-y-2 mb-2">
        <Skeleton className="h-2 w-[450px]" />
        <Skeleton className="h-2 w-[450px]" />
      </div>
      <Skeleton className="h-[350px] w-[450px]" />
    </div>
    <div className=" flex-center space-y-2">
      <Skeleton className="h-10 w-[450px]" />
    </div>
  </div>
);