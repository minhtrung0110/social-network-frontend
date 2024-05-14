import { INavLink } from '@/types/snapgram';
import { GearIcon } from '@/components/atoms/icons/GearIcon';
import { MoonIcon } from '@/components/atoms/icons/MoonIcon';
import {
  BookmarkIcon,
  CaretLeftIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PaperPlaneIcon,
  PlusCircledIcon,
  RocketIcon,
} from '@radix-ui/react-icons';

export const LEFT_SIDE_BAR_LINK: INavLink[] = [
  {
    icon: HomeIcon,
    route: '/',
    label: 'Home',
  },

  {
    icon: MagnifyingGlassIcon,
    route: 'search',
    label: 'Search',
  },
  {
    icon: RocketIcon,
    route: 'explore',
    label: 'Explore',
  },
  {
    icon: PaperPlaneIcon,
    route: 'message',
    label: 'Message',
  },
  {
    icon: BookmarkIcon,
    route: 'saved',
    label: 'Saved',
  },
  {
    icon: HeartIcon,
    route: 'notifications',
    label: 'Notifications',
  },
  {
    icon: PlusCircledIcon,
    route: '/post/create',
    label: 'Create',
  },
];
export const BOTTOM_SIDE_BAR_LINK: INavLink[] = [
  {
    icon: HomeIcon,
    route: '/',
    label: 'Home',
  },

  {
    icon: MagnifyingGlassIcon,
    route: 'search',
    label: 'Search',
  },
  {
    icon: RocketIcon,
    route: 'explore',
    label: 'Explore',
  },
  {
    icon: PaperPlaneIcon,
    route: 'message',
    label: 'Message',
  },
  {
    icon: HeartIcon,
    route: 'notifications',
    label: 'Notifications',
  },
];

export const MORE_SIDEBAR = [
  {
    icon: GearIcon,
    label: 'Settings',
    key: 'settings',
    children: null,
  },
  {
    icon: MoonIcon,
    label: 'Switch Appearance',
    key: 'dark-mode',
    children: [
      {
        icon: CaretLeftIcon,
        label: 'Switch Appearance',
        parent: 'sidebar-menu-main',
      },
      {
        icon: null,
        label: 'Dark Mode',
        key: 'dark',
        children: null,
      },
      {
        icon: null,
        label: 'Light Mode',
        key: 'light',
        children: null,
      },
    ],
  },
  // {
  //   icon: PinLeft,
  //   label: 'Logout',
  //   key: 'sign-out',
  //   children: null,
  // },
];
// If item is header, it would not have a children property. And field Label is not empty