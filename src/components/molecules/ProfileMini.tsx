// Libraries
import React from 'react';
import Image from 'next/image';
import { ProfileIcon } from '@/components/atoms/icons';
import { SRUser } from '@/schema/user.schema';
import { StatBlock } from '@/app/(home)/profile/components/organisms/ProfileInfo';
import { Button } from '@/components/ui/button';
import { Crosshair2Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { ROUTES } from '@/constraints/route';
import { useGetUserById } from '@/queries/queries';
import { Skeleton } from '@/components/ui/skeleton';
import Loader from '@/components/atoms/Loader';

// Component

// Style

// Types


interface Props {
  user: Omit<SRUser, 'email'>;
}

const LoadingPost = () =>
  <div className={'flex-between flex-row gap-2'}>
    <Skeleton className='h-16 w-16 rounded-[2px] ' />
    <Skeleton className='h-16 w-16 rounded-[2px] ' />
    <Skeleton className='h-16 w-16 rounded-[2px] ' />
  </div>;

const ProfileMini: React.FC<Props> = (props) => {
  const { user } = props;
  const { data: moreData, status } = useGetUserById(user.id);
  return (

    <div className='flex flex-col shadow-neutral-500 justify-center items-center flex-1 py-3 px-1 gap-2'>

      <div className='flex-row flex-between w-full'>
        <div className={'flex-center w-[35%]'}>
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              alt='profile'
              width='20'
              height='20'
              className='w-16 h-16 rounded-full'
            />
          ) : (
            <ProfileIcon width={15} height={15} />
          )}
        </div>

        <Link href={`${ROUTES.PROFILE.key}/${user.id}`} className='flex-col  flex-center w-[65%]'>
          <p className='body-bold  md:base-bold text-light-3 text-center'>
            @{user.username}
          </p>
          <p className='text-center  small-regular md:h3-semibold w-full'>
            {user.lastName} {user.firstName}
          </p>

        </Link>

      </div>
      {status === 'pending' ? <Loader /> :
        <div className='flex gap-8 mt-2 base-medium items-center justify-center  flex-wrap '>
          <StatBlock value={moreData?._count?.userPosts ?? 0} label='Posts' />
          <StatBlock value={moreData?._count.followedBy ?? 0} label='Followers' />
          <StatBlock value={moreData?._count.following ?? 0} label='Following' />
        </div>}
      {status === 'pending' ? <LoadingPost /> : (
        <div className={'flex-between flex-row gap-2'}>
          {
            moreData?.userPosts.length > 0 && moreData?.userPosts.map((post: {
              id: number,
              imageUrl: string,
              caption: string
            }) => (
              <Image
                key={`migi-${post.id}-tooltip`}
                src={post.imageUrl}
                alt='profile'
                width='20'
                height='20'
                className='w-24 h-24 rounded-[2px]' />
            ))
          }
        </div>)
      }
      <div className={' flex-between w-full mt-2'}>
        <div className={'flex-center w-full'}>
          <Button className={'h-8 w-15 flex-between'}>
            <Crosshair2Icon className={'mr-1'} />
            Follow
          </Button>
        </div>
        <div className={'flex-center w-full'}>
          <Button className={'h-8 w-15 flex-between'}>
            <PaperPlaneIcon className={'mr-1'} />
            Message
          </Button>
        </div>
      </div>

    </div>

  );
};

export default ProfileMini;