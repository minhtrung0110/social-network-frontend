'use client';
// Libraries
import React from 'react';
import Link from 'next/link';

// Component
import UserAdvance from '@/components/organisms/UserAdvance.tsx';
import ProfileMini from '@/components/molecules/ProfileMini';
import { Button } from '@/components/ui/button';

// Constrant
import { ROUTES } from '@/constraints/route';
import { DotFilledIcon } from '@radix-ui/react-icons';
import AvatarUser from '@/app/(home)/components/molecules/AvatarUser';

// Types

// Actions

interface SearchUserProps {
  user: any;
  type?: 'follow' | 'user';
  className?: string;
}

const SearchUser: React.FC<SearchUserProps> = props => {
  const { user, type = 'follow', className = '' } = props;
  // State

  // Hooks

  // Handle

  return (
    <div className={`w-full flex flex-between ${className}`}>
      <Link href={`/${ROUTES.PROFILE.key}/${user.id}`} className={'flex-between'}>
        {type === 'follow' ? (
          <UserAdvance profile={<ProfileMini user={user} />}>
            <AvatarUser firstName={user.firstName} avatar={user.avatar} story={true} />
          </UserAdvance>
        ) : (
          <AvatarUser firstName={user.firstName} avatar={user.avatar} story={true} />
        )}
        <div className={`flex flex-col fex-center ml-4`}>
          <span className="body-bold">{user.username}</span>
          <div className={`flex base-regular italic ${type === 'user' ? 'flex-row' : ''}`}>
            <span>
              {user.lastName} {user.firstName}
            </span>
            {type === 'user' && (
              <div className="flex flex-row items-center">
                <DotFilledIcon />
                <span className="base-regular italic">
                  {user.followedBy.length} follower{user.followedBy.length > 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
      {type === 'follow' && (
        <Button className={'h-8 flex-center base-regular bg-blue-500 hover:bg-blue-600 text-white'}>
          Follow
        </Button>
      )}
    </div>
  );
};

export default SearchUser;