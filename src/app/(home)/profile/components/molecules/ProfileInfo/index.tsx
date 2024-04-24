'use client';
// Libraries
import React from 'react';
import Image from 'next/image';
import { EditIcon, ProfileIcon } from '@/components/atoms/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useGlobalState } from '@/store/zustand';
import { UserAuth } from '@/types/user';
import { ROUTES } from '@/constrants/route';

// Component

// Style

// Types

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

interface Props {
  user: any;
}

const ProfileInfo: React.FC<Props> = props => {
  const { user } = props;
  const currentUser: UserAuth | undefined = useGlobalState(state => state.user);
  return (
    <div className="profile-inner_container">
      <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="profile"
            width="100"
            height="100"
            className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
          />
        ) : (
          <ProfileIcon width={25} height={25} />
        )}
        <div className="flex flex-col flex-1 justify-between md:mt-2">
          <div className="flex flex-col w-full">
            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
              {user.lastName} {user.firstName}
            </h1>
            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
              @{user.username}
            </p>
          </div>

          <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
            <StatBlock value={15} label="Posts" />
            <StatBlock value={20} label="Followers" />
            <StatBlock value={20} label="Following" />
          </div>

          <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
            The pretty girlfriend
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <div className={`${user.id !== currentUser?.id && 'hidden'}`}>
            <Link
              href={`/${ROUTES.PROFILE.key}/${user.id}/update`}
              className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                user.id !== currentUser?.id && 'hidden'
              }`}
            >
              <EditIcon width="25" height="25" />
              <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
            </Link>
            {/*</div>*/}
            <div className={`${user.id === currentUser?.id && 'hidden'}`}>
              <Button type="button" className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;