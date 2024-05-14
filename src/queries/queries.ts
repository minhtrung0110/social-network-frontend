import { Updater, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userApiRequest from '@/api/user';
import { CACHE_TIME, QUERY_KEYS, STALE_TIME } from '@/constrants/queries';
import { SearchParams } from '@/types/common';
import commentApiRequest from '@/api/comment';
import { Comment, CreateComment } from '@/schema/comment.schema';
import { UpdatePostQueryType } from '@/schema/post.schema';
import postApiRequest from '@/api/post';
import uploadApiRequest from '@/api/upload';
import likeApiRequest from '@/api/like';
import { CreateLike, Like } from '@/schema/like.schema';
import savedApiRequest from '@/api/saved';
import { Saved } from '@/schema/saved.scheme';

/*------------------USER--------------------------*/
export const getUserProfileById = async (id: number) => {
  const response = await userApiRequest.getInfoUserById(id);
  return response.status === 200 ? response.data : [];
};
export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_PROFILE_BY_ID],
    queryFn: () => getUserProfileById(id),
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
};
export const useGetUserByUsername = (searchParams: SearchParams, session: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS_BY_USERNAME, searchParams, session],
    queryFn: () => userApiRequest.searchUser(searchParams, session),
  });
};
export const useUpdateUsername = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
      sessionToken,
    }: {
      id: string;
      data: { username: string };
      sessionToken: string;
    }) => userApiRequest.updateUserName(Number(id), data, sessionToken),
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POSTS],
      // });
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      // });
    },
  });
};
/*-------------------UPLOAD-----------------------*/
export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => uploadApiRequest.uploadImage(data),
    onSuccess: res => {
      return res.data;
    },
  });
};
/*--------------------POST----------------------*/
export const useGetPost = (searchParams: SearchParams, session: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USERS_BY_USERNAME, searchParams, session],
    queryFn: () => userApiRequest.searchUser(searchParams, session),
  });
};
const handleGetInfinitePosts = async (page: number = 1) => {
  const searchParams = { page, perPage: 2 };
  const result = await postApiRequest.getInfinite(searchParams);
  if (result.status === 200) return result.data;
};
export const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
    queryFn: ({ pageParam }) => handleGetInfinitePosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // console.log('lastPagePost:', lastPage, lastPage.length < 1);
      if (lastPage.length === 2) return Number(lastPageParam) + 1;
      return undefined;
    },
    // getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
    //   firstPage.prevCursor,
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePostQueryType) => {
      const { id, ...value } = data;
      return postApiRequest.update(Number(id), value);
    },
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.id],
      });
    },
  });
};
/*--------------------COMMENT-------------------*/
const handleGetListCommentsByPostId = async (postId: number) => {
  const result = await commentApiRequest.getAllByPostId(postId);
  if (result.status === 200) return result.data;
};
const handleGetInfiniteCommentsByPostId = async (postId: number, page: number = 1) => {
  const searchParams = { page, perPage: '4' };
  const result = await commentApiRequest.getInfiniteByPostId(postId, searchParams);
  if (result.status === 200) return result.data;
};
export const useGetPostComments = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_COMMENT],
    queryFn: () => handleGetListCommentsByPostId(postId),

    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
};
export const useGetInfiniteComments = (postId: number) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_COMMENT],
    queryFn: ({ pageParam }) => handleGetInfiniteCommentsByPostId(postId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      console.log('lastPage:', lastPage, lastPage.length < 4);
      if (lastPage.length === 4) return Number(lastPageParam) + 1;
      return undefined;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam, allPageParams) =>
      firstPage.prevCursor,
  });
};
export const useFilterPostComment = (postId: number, searchParams: SearchParams) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_COMMENT_CONDITION],
    queryFn: () => commentApiRequest.getWithConditionByPostId(postId, searchParams),
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.ADD_COMMENT],
    mutationFn: (data: CreateComment) => commentApiRequest.create(data),
    onMutate: async newComment => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_POST_COMMENT] });
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData([QUERY_KEYS.GET_POST_COMMENT]);
      // Optimistically update to the new value
      const updateComments: Updater<Comment[], any> = (data: Comment[]) => {
        const old = data ?? [];
        return [newComment, ...old];
      };
      queryClient.setQueryData([QUERY_KEYS.GET_POST_COMMENT], c => updateComments(c));

      // Return a context object with the snap shotted value
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.GET_POST_COMMENT], context?.previousTodos);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_COMMENT],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => commentApiRequest.delete(id),
    onMutate: async id => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_POST_COMMENT] });
      const previousComments = queryClient.getQueryData([QUERY_KEYS.GET_POST_COMMENT]);
      const deletedComment: Updater<Comment[], any> = (res: Comment[]) => {
        const old = res ?? [];
        return old.filter((cmt: Comment) => cmt.id !== id);
      };
      queryClient.setQueryData([QUERY_KEYS.GET_POST_COMMENT], c => deletedComment(c));
      return { previousComments };
    },
    onError: (err, newComment, context) => {
      queryClient.setQueryData([QUERY_KEYS.GET_POST_COMMENT], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_COMMENT],
      });
    },
  });
};

/*------------------LIKE--------------------------------*/
const getTotalLikesPost = async (postId: number) => {
  const response = await likeApiRequest.getAllByPostId(postId);
  return response.status === 200 ? response.data : [];
};
export const useGetTotalLikePost = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_LIKES],
    queryFn: () => getTotalLikesPost(postId),
    gcTime: CACHE_TIME,
    staleTime: STALE_TIME,
  });
};
export const useCreateLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.ADD_LIKE],
    mutationFn: (data: CreateLike) => likeApiRequest.create(data),
    onMutate: async newLike => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_POST_LIKES] });
      const previousLikes = queryClient.getQueryData([QUERY_KEYS.GET_POST_LIKES]);
      const updateComments: Updater<Like[], any> = (data: Like[]) => {
        const old = data ?? [];
        return [newLike, ...old];
      };
      queryClient.setQueryData([QUERY_KEYS.GET_POST_LIKES], c => updateComments(c));
      return { previousLikes };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.GET_POST_LIKES], context?.previousLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_LIKES],
      });
    },
  });
};

export const useDeleteLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.DELETE_LIKE],
    mutationFn: (data: CreateLike) => likeApiRequest.delete(data),
    onMutate: async newLike => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.GET_POST_LIKES] });
      const previousLikes = queryClient.getQueryData([QUERY_KEYS.GET_POST_LIKES]);
      const updateComments: Updater<Like[], any> = (data: Like[]) => {
        const old = data ?? [];
        return old.filter(like => like.userId !== newLike.userId && like.postId !== newLike.postId);
      };
      queryClient.setQueryData([QUERY_KEYS.GET_POST_LIKES], c => updateComments(c));
      return { previousLikes };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData([QUERY_KEYS.GET_POST_LIKES], context?.previousLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_LIKES],
      });
    },
  });
};

/*--------------SAVED-----------------*/
export const useCreateSaved = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.ADD_SAVED],
    mutationFn: (data: Saved) => savedApiRequest.create(data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_LIKES],
      });
    },
  });
};

export const useDeleteSaved = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.ADD_SAVED],
    mutationFn: (data: Saved) => savedApiRequest.delete(data),
    onSuccess: () => true,
    onError: () => false,
  });
};



