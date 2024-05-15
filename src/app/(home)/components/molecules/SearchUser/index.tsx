'use client';
// Libraries
import React from 'react';
import Link from 'next/link';

// Component
import UserAdvance from '@/components/organisms/UserAdvance.tsx';
import ProfileMini from '@/components/molecules/ProfileMini';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

// Constrant
import { ROUTES } from '@/constrants/route';

// Types

// Actions

interface SearchUserProps {
  user: any;
}

const SearchUser: React.FC<SearchUserProps> = props => {
  const { user } = props;
  // State

  // Hooks

  // Handle

  return (
    <div className={'w-full flex flex-between'}>
      <Link href={`/${ROUTES.PROFILE.key}/${user.id}`} className={'flex-between'}>
        <UserAdvance profile={<ProfileMini user={user} />}>
          <Avatar>
            <AvatarImage src={user.avatar}></AvatarImage>
            <AvatarFallback>{user.firstName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </UserAdvance>
        <div className="flex flex-col fex-center ml-4">
          <span className="body-bold">{user.username}</span>
          <span className="base-regular italic">
            {user.lastName} {user.firstName}
          </span>
        </div>
      </Link>
      <Button className={'h-8 flex-center base-regular bg-blue-500 hover:bg-blue-600 text-white'}>
        Follow
      </Button>
    </div>
  );
};

export default SearchUser;