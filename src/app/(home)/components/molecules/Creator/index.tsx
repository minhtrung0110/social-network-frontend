// Libraries
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Component
import { ProfileIcon } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import UserAdvance from '@/components/organisms/UserAdvance.tsx';
import ProfileMini from '@/components/molecules/ProfileMini';

// Constants
import { ROUTES } from '@/constraints/route';

// Types


interface Props {
  user: any;
  onFollow: any;
  followed: boolean;
}

const Creator: React.FC<Props> = (props) => {
  const { user, followed, onFollow } = props;


  // State
  const [isFollowed, setIsFollowed] = useState<boolean>(followed ?? false);

  // Handle
  const handleFollow = async () => {
    const res = await onFollow();
    if (res.status === 200) setIsFollowed(!isFollowed);
  };
  return (
    <div className='flex-between flex-row gap-2 border border-primary rounded-[20px] px-4 py-2'>
      <Link href={`/${ROUTES.PROFILE.key}/${user.id}`}
            className={'flex flex-row w-full'}
      >
        {
          user.avatar ? <Image
            src={user.avatar}
            alt='creator'
            width={100} height={100}
            className='rounded-full w-14 h-14'
          /> : <ProfileIcon width={100} height={100} />
        }
        <UserAdvance profile={<ProfileMini user={user} />}>
          <div className='flex-center flex-col gap-1'>
            <p className='base-medium text-light-1 text-center line-clamp-1'>
              {user.firstName} {user.lastName}
            </p>
            <p className='small-regular text-light-3 text-center line-clamp-1'>
              @{user.username}
            </p>
          </div>
        </UserAdvance>
      </Link>

      {
        isFollowed ? <Button
          type='button'
          size='sm'
          className='z-20 h-8 bg-background hover:bg-secondary-foreground text-primary hover:text-primary-foreground flex gap-2 px-5'>
          Followed
        </Button> : <Button
          type='button'
          size='sm'
          className='z-20 h-8 bg-secondary hover:bg-secondary-foreground text-primary hover:text-primary-foreground flex gap-2 px-5'
          onClick={handleFollow}
        >
          Follow
        </Button>
      }


    </div>
  );
};

export default Creator;


