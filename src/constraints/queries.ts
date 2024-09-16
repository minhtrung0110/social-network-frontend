export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = 'createUserAccount',

  // USER KEYS
  UPDATE_USERNAME = 'updateUsername',
  GET_CURRENT_USER = 'getCurrentUser',
  GET_USERS_BY_USERNAME = 'getUsersByUsername',
  GET_USER_BY_ID = 'getUserById',
  GET_USER_PROFILE_BY_ID = 'getUserProfileById',
  GET_INFINITE_USERS = 'getInfiniteUsers',
  GET_INFINITE_FOLLOWERS = 'getInfiniteFollowers',
  GET_INFINITE_FOLLOWINGS = 'getInfiniteFollowings',

  // POST KEYS
  GET_POSTS = 'getPosts',
  GET_INFINITE_POSTS = 'getInfinitePosts',
  GET_INFINITE_COMPACT_POSTS = 'getInfiniteCompactPosts',
  GET_RECENT_POSTS = 'getRecentPosts',
  GET_POST_BY_ID = 'getPostById',
  GET_USER_POSTS = 'getUserPosts',
  GET_FILE_PREVIEW = 'getFilePreview',

  // COMMENT KEYS
  ADD_COMMENT = 'addComment',
  UPDATE_COMMENT = 'updateComment',
  DELETE_COMMENT = 'deleteComment',
  GET_COMMENT = 'getComments',
  GET_INFINITE_COMMENT = 'getInfiniteComments',
  GET_RECENT_COMMENT = 'getRecentComments',
  GET_POST_COMMENT = 'getPostComments',
  GET_POST_COMMENT_CONDITION = 'getPostCommentsWithCondition',

  // LIKE KEYS
  ADD_LIKE = 'addLike',
  DELETE_LIKE = 'deleteLike',
  GET_POST_LIKES = 'getPostLikes',

  // SAVED KEYS
  ADD_SAVED = 'addSaved',
  DELETE_SAVED = 'deleteSaved',
  GET_POST_SAVEDS = 'getPostSaveds',

  //  SEARCH KEYS
  SEARCH_POSTS = 'getSearchPosts',
  SEARCH_USERS = 'getSearchUsers',
}

export const STALE_TIME = 50 * 1000;
export const CACHE_TIME = 100 * 1000;