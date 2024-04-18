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
  },
  EXPLORE: {
    key: 'explore',
    name: 'Explore',
    path: '/explore',
    exact: false,
  },
  SAVED: {
    key: 'saved',
    name: 'Saved',
    path: '/saved',
    exact: false,
  },
  ALL_USERS: {
    key: 'all-users',
    name: 'All Users',
    path: '/all-users',
    exact: false,
  },
  CREATE_POST: {
    key: 'create-post',
    name: 'Create Post',
    path: '/create-post',
    exact: false,
  },
  UPDATE_POST: {
    key: 'update-post',
    name: 'Update Post',
    path: '/update-post/:id',
    exact: false,
  },
  PROFILE: {
    key: 'profile',
    name: 'Profile',
    path: '/profile/:id/',
    exact: false,
  },

  UPDATE_PROFILE: {
    key: 'update-profile',
    name: 'Update Profile',
    path: '/update-profile/:id',
    exact: false,
  },
  POST_DETAIL: {
    key: 'post-detail',
    name: 'Post Detail',
    path: '/posts/:id',
    exact: false,
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