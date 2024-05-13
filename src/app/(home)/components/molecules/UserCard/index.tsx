// Libraries
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constrants/route';
import { ProfileIcon } from '@/components/atoms/icons';

// Component

// Style

// Types


interface Props {
  user: any;
}

const UserCard: React.FC<Props> = (props) => {
  const { user } = props;
  return (
    <Link href={`/${ROUTES.PROFILE.key}/${user.id}`} className='user-card'>
      {
        user.avatar ? <Image
          src={user.avatar}
          alt='creator'
          width={100} height={100}
          className='rounded-full w-14 h-14'
        /> : <ProfileIcon width={100} height={100} />
      }

      <div className='flex-center flex-col gap-1'>
        <p className='base-medium text-light-1 text-center line-clamp-1'>
          {user.firstName} {user.lastName}
        </p>
        <p className='small-regular text-light-3 text-center line-clamp-1'>
          @{user.username}
        </p>
      </div>

      <Button type='button' size='sm' className='shad-button_primary px-5'>
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;