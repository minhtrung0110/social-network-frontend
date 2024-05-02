export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = 'createUserAccount',

  // USER KEYS
  UPDATE_USERNAME = 'updateUsername',
  GET_CURRENT_USER = 'getCurrentUser',
  GET_USERS_BY_USERNAME = 'getUsersByUsername',
  GET_USER_BY_ID = 'getUserById',

  // POST KEYS
  GET_POSTS = 'getPosts',
  GET_INFINITE_POSTS = 'getInfinitePosts',
  GET_RECENT_POSTS = 'getRecentPosts',
  GET_POST_BY_ID = 'getPostById',
  GET_USER_POSTS = 'getUserPosts',
  GET_FILE_PREVIEW = 'getFilePreview',

  // COMMENT KEYS
  GET_COMMENT = 'getComments',
  GET_INFINITE_COMMENT = 'getInfiniteComments',
  GET_RECENT_COMMENT = 'getRecentComments',
  GET_POST_COMMENT = 'getPostComments',

  //  SEARCH KEYS
  SEARCH_POSTS = 'getSearchPosts',
}
