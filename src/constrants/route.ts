export type SNRoute = {
  key: string;
  name: string;
  path: string;
  exact: boolean;
  isPrivate: boolean;
};
export const ROUTES = {
  login: {
    key: 'sign-in',
    name: 'sign-in',
    path: '/sign-in',
    exact: true,
    isPrivate: false,
  },
  register: {
    key: 'sign-up',
    name: 'sign-up',
    path: '/sign-up',
    exact: true,
    isPrivate: false,
  },

  SNAP_GRAM: {
    key: 'snap-gram',
    name: 'Snap Gram',
    path: '/',
    exact: false,
    isPrivate: true,
  },
  /*-----SNAP GRAM-------*/
  HOME: {
    key: 'home-snap-gram',
    name: 'Home',
    path: '/',
    exact: false,
    isPrivate: true,
  },
  EXPLORE: {
    key: 'explore',
    name: 'Explore',
    path: '/explore',
    exact: false,
    isPrivate: true,
  },
  SAVED: {
    key: 'saved',
    name: 'Saved',
    path: '/saved',
    exact: false,
    isPrivate: true,
  },
  ALL_USERS: {
    key: 'all-users',
    name: 'All Users',
    path: '/all-users',
    exact: false,
    isPrivate: true,
  },
  CREATE_POST: {
    key: 'create-post',
    name: 'Create Post',
    path: '/create-post',
    exact: false,
    isPrivate: true,
  },
  UPDATE_POST: {
    key: 'update-post',
    name: 'Update Post',
    path: '/post/update/:id',
    exact: false,
    isPrivate: true,
  },
  PROFILE: {
    key: 'profile',
    name: 'Profile',
    path: '/profile/:id',
    exact: false,
  },

  UPDATE_PROFILE: {
    key: 'update-profile',
    name: 'Update Profile',
    path: '/update-profile/:id',
    exact: false,
    isPrivate: true,
  },
  POST_DETAIL: {
    key: 'post-detail',
    name: 'Post Detail',
    path: '/posts/:id',
    exact: false,
    isPrivate: true,
  },
  /*-----------MORE-------------------*/
  NOT_FOUND: {
    key: 'notFound',
    name: 'Not Found',
    path: '*',
    exact: false,
    isPrivate: false,
  },
};