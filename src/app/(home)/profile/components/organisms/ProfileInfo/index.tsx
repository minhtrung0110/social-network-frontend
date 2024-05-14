'use client';
// Libraries
import React from 'react';
import Image from 'next/image';
import { MoreIcon, ProfileIcon } from '@/components/atoms/icons';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constrants/route';
import UpdateUserNameForm from '@/app/(home)/profile/components/organisms/UpdateUserNameForm';
import { useAppContext } from '@/store/app-provider';
import { ChatBubbleIcon, Crosshair2Icon, Pencil2Icon } from '@radix-ui/react-icons';

// Component

// Style

// Types

interface StabBlockProps {
  value: string | number;
  label: string;
  size?: 'big' | 'small';
}

export const StatBlock = ({ value, label, size = 'big' }: StabBlockProps) => (
  <div className="flex-center gap-2">
    <p className={`base-bold lg:body-bold text-primary-500`}>{value}</p>
    <p className={`small-medium lg:base-medium text-light-2`}>{label}</p>
  </div>
);

interface Props {
  user: any;
}

const ProfileInfo: React.FC<Props> = props => {
  const { user } = props;
  const { user: currentUser } = useAppContext();
  console.log(user.id === currentUser?.id);
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
            ˛̼ 𝕭𝖔𝖔𝖐🍬𝕷♡𝖑𝖑𝖎𝖕♡𝖕 ˛̼ Personal blog */\___/\ ꒰ ˶• ༝ - ˶꒱ ./づᡕᠵ᠊ᡃ່࡚ࠢ࠘ ⸝່ࠡࠣ᠊߯᠆ࠣ࠘ᡁࠣ࠘᠊᠊ࠢ࠘𐡏
            =͟͟͞♡
          </p>
        </div>

        <div className="flex  gap-4 py-4">
          <div className={`flex flex-row gap-4 `}>
            {user.id !== currentUser?.id ? (
              <>
                <Button type="button" className="!h-10 !w-40  shad-button_primary px-8">
                  <ChatBubbleIcon width={20} height={20} />
                  <span>Message</span>
                </Button>
                <Button type="button" className="!h-10 !w-40 shad-button_primary px-8">
                  <Crosshair2Icon width={20} height={20} />
                  Follow
                </Button>
              </>
            ) : (
              <>
                <Link
                  href={`/${ROUTES.PROFILE.key}/${user.id}/update`}
                  className={`!h-10 !w-44 shad-button_primary flex-center px-8 rounded-md`}
                >
                  <Pencil2Icon width={20} height={20} />
                  <p className="flex whitespace-nowrap base-medium">Edit Profile</p>
                </Link>

                <UpdateUserNameForm username={user.username} id={user.id} />
              </>
            )}

            <MoreIcon
              width={40}
              height={40}
              className="cursor-pointer p-2 rounded-sm hover:bg-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;