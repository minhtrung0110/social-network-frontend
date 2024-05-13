'use client';
// Libraries
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppContext } from '@/store/app-provider';

// Component

// Style

// Types

interface Props {
  // Define your component's props here
}

const ProfileInstant: React.FC<Props> = props => {
  const { user } = useAppContext();

  return user ? (
    <div className="profile flex flex-row justify-between items-center">
      <div className={'flex flex-row items-center cursor-pointer '}>
        <Avatar>
          <AvatarImage src={user.avatar} alt="@shadcn" />
          <AvatarFallback>{user?.firstName} </AvatarFallback>
        </Avatar>

        <div className="flex flex-col px-3.5">
          <div className={'flex font-bold'}>@{user?.username}</div>
          <div className={'flex text-sm text-foreground'}>
            {user?.firstName} {user?.lastName}
          </div>
        </div>
      </div>
      <Button className="bg-foreground hover:bg-background hover:text-foreground h-8">
        Switch
      </Button>
    </div>
  ) : (
    <SkeletonProfile />
  );
};

export default ProfileInstant;

export function SkeletonProfile() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
