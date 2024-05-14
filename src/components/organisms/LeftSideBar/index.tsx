'use client';
// Libraries
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import styled from 'styled-components';

// Component
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DropdownAdvance from '@/components/molecules/DropdownAdvance';
import { MenuIcon } from '@/components/atoms/icons/MenuIcon'; // Style
// Types
import { INavLink } from '@/types/snapgram';

// Constraint
import { LEFT_SIDE_BAR_LINK, MORE_SIDEBAR } from '@/constrants/sidebar';
import { ROUTES } from '@/constrants/route';
import Image from 'next/image';
import { useAppContext } from '@/store/app-provider';

interface LeftSideBarProps {
  key?: string;
}

export const MenuItemWrapper = styled.li`
  &:hover {
    .icon {
      transform: scale(1.1);
    }
  }
`;

const LeftSideBar: React.FC<LeftSideBarProps> = props => {
  // const navigate = useNavigate();
  const { key } = props;
  const pathname = usePathname();
  // Global State
  const { user, setUser } = useAppContext();
  //const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  //const { mutate: signOut } = useSignOutAccount();
  const isLoading = false;
  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //signOut();
    // setIsAuthenticated(false);
    // setUser(INITIAL_USER);
    // navigate(ROUTES.LOGIN.path);
  };
  const { theme, setTheme } = useTheme();
  const timezoneOffset = new Date().getTimezoneOffset();
  //console.log(timezoneOffset);
  return (
    <nav className="left-sidebar " key={key}>
      <Link href={ROUTES.SNAP_GRAM.path} className="flex h-[100px] items-center mb-2">
        <Image src="/assets/logo.svg" alt="logo" priority={false} width={210} height={105} />
      </Link>
      <div className="flex flex-col gap-4 overflow-auto max-h-[480px]">
        <ul className="flex flex-col gap-4">
          {LEFT_SIDE_BAR_LINK.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <MenuItemWrapper
                key={link.label}
                className={`left-sidebar-link group ${isActive && 'bg-secondary'}`}
              >
                <Link href={link.route} className="link flex gap-4 items-center p-4">
                  <link.icon className={'icon'} width="22" height="22" />
                  {link.label}
                </Link>
              </MenuItemWrapper>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col mt-5 gap-2 cursor-pointer sticky bottom-0">
        <Link
          href={`/${ROUTES.PROFILE.key}/${user?.id}`}
          className={`left-sidebar-link group flex justify-items-start items-center px-5 ${pathname.startsWith(ROUTES.PROFILE.path) && 'bg-primary-500'}`}
        >
          <Avatar>
            <AvatarImage src={user?.avatar || 'https://github.com/shadcn.png'} alt="@shadcn" />
            <AvatarFallback>{user?.firstName?.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className={'flex gap-4 max-w-[140px] items-center truncate p-4'}>
            {user?.username}
          </div>
        </Link>
        <DropdownAdvance
          menuTrigger={
            <div className={'left-sidebar-link group flex justify-items-start items-center px-5'}>
              <MenuIcon width={25} height={25} />
              <p className={'flex gap-4 items-center p-4'}>More</p>
            </div>
          }
          menus={MORE_SIDEBAR}
          onChangeValue={setTheme}
        />
      </div>
    </nav>
  );
};

export default LeftSideBar;