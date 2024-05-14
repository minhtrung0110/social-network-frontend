import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const LoadingListComments = () => (
  <div className="list-comments-postcard-detail p-6 space-y-4 ">
    <div className="flex items-center space-x-2 ">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
    <div className="flex items-center space-x-2 ">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
    <div className="flex items-center space-x-2 ">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  </div>
);