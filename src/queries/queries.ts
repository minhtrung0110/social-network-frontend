import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import userApiRequest from '@/api/user';
import { QUERY_KEYS } from '@/constrants/queries';
import { SearchParams } from '@/types/common';
import commentApiRequest from '@/api/comment';
import { CreateComment } from '@/schema/comment.schema';
import { UpdatePostQueryType } from '@/schema/post.schema';
import postApiRequest from '@/api/post';
import uploadApiRequest from '@/api/upload';

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

export const useGetPostComment = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_COMMENT],
    queryFn: () => commentApiRequest.getAllByPostId(postId),
  });
};

export const useCreateComment = (data: CreateComment) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: post => commentApiRequest.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POST_COMMENT],
      });
    },
  });
};