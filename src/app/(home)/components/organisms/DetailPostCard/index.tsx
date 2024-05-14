'use client';
// Libraries
import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constrants/route';
import AvatarUser from '@/app/(home)/components/molecules/AvatarUser';
import { EditIcon, MoreIcon, ProfileIcon } from '@/components/atoms/icons';
import UserAdvance from '@/components/organisms/UserAdvance.tsx';
import ProfileMini from '@/components/molecules/ProfileMini';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getDateTimePost, multiFormatDateString } from '@/utils/date';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/store/app-provider';
import Image from 'next/image';
import { buildCommentTree, getRandomInt } from '@/utils/util';
import { Post } from '@/schema/post.schema';
import {
  useCreateComment,
  useCreateLike,
  useCreateSaved,
  useDeleteLike,
  useDeleteSaved,
  useGetPostComments,
  useGetTotalLikePost,
} from '@/queries/queries';
import CommentGroup from '@/app/(home)/components/organisms/Comments';
import Actions from '@/app/(home)/components/organisms/DetailPostCard/components/molecules/Actions';
import { LoadingListComments } from '@/components/molecules/skeleton/ListComments';

// Component

// Style

// Types

interface Props {
  post: Post;
}

const postItem = {
  id: 2,
  caption:
    "The SF90 Stradale delivers therari's history, making it comparable only to that of the LaFerrari supercar.",
  tags: 'hy',
  imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1714677661085_wp4570855.jpg?alt=media',
  scope: 'public',
  user: {
    id: 1,
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    username: 'dh.baotrung',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
  Like: [
    {
      userId: 1,
    },
  ],
  comments: [
    {
      id: 2,
    },
  ],
  createdAt: '2024-04-20T08:36:56.104Z',
  updatedAt: '2024-05-02T19:21:02.317Z',
  status: 1,
};

export const DetailPostCard: React.FC<Props> = props => {
  const { post } = props;

  //State
  const listTags = post.tags.includes(',') ? post.tags.split(',') : [post.tags];
  const { user } = useAppContext();

  // Query
  const { data: listComment, status: statusComments } = useGetPostComments(post?.id);
  const { data: totalLikes } = useGetTotalLikePost(post?.id);
  const { mutate: createComment } = useCreateComment();
  const { mutate: createLike } = useCreateLike();
  const { mutate: unLike } = useDeleteLike();
  const { mutate: savePost } = useCreateSaved();
  const { mutate: unSavePost } = useDeleteSaved();
  const commentsTree = buildCommentTree(listComment ?? []);

  // //Hooks
  // const { ref, inView } = useInView();
  // const { data: posts, fetchNextPage, hasNextPage } = useGetInfiniteComments(post.id);
  //
  // // Hooks
  //
  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [inView]);
  //Handle
  const handleCreateComment = (comment: string, replyId: number | null) => {
    const newComment = {
      id: getRandomInt(1000),
      user,
      userId: user?.id,
      postId: post.id,
      content: comment,
      replyId,
    };
    console.log('New Comment: ', newComment);
    //createComment(newComment);
    //setReplyCommentPost(null);
  };
  const handleCreateLike = () => {
    createLike({ userId: user?.id ?? 1, postId: post.id });
  };
  const handleUnLike = () => {
    unLike({ userId: user?.id ?? 1, postId: post.id });
  };
  const handleSavePost = () => {
    savePost({ userId: user?.id ?? 1, postId: post.id });
  };
  const handleUnSavePost = () => {
    unSavePost({ userId: user?.id ?? 1, postId: post.id });
  };
  // Definte: H-650px
  return (
    <div className={`post_details-card h-[650px]`}>
      <div className={`w-[${post.imageUrl ? 58 : 0}%] `}>
        <div className={' relative w-[600px] h-[650px] overflow-hidden '}>
          <Image
            fill
            src={post?.imageUrl}
            alt={'post-img'}
            style={{
              objectFit: 'cover',
            }}
            className={'rounded-l-sm'}
          />
        </div>
      </div>
      <div className={`w-[${post?.imageUrl ? 42 : 100}%] h-full relative `}>
        <div className="flex-between w-full px-5 h-[60px]  ">
          <Link href={`/${ROUTES.PROFILE.key}/${post.user.id}`}>
            <div className={'flex-center'}>
              {post.user?.avatar ? (
                <AvatarUser
                  story={null}
                  firstName={post?.user.firstName}
                  avatar={post?.user.avatar}
                  type={'post'}
                />
              ) : (
                <ProfileIcon width={25} height={25} />
              )}
              <div className="flex flex-row cursor-pointer items-center ml-2">
                <UserAdvance profile={<ProfileMini user={post.user} />}>
                  <p className="base-medium lg:body-bold text-light-1 mr-1 ">
                    {post.user.username}
                  </p>
                </UserAdvance>
                •
                <div className="flex-center gap-2 text-light-3 ml-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="base-regular lg:small-regular ">
                          {multiFormatDateString(post?.createdAt)}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getDateTimePost(post?.createdAt, post.updatedAt)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
          </Link>

          {post.user.id === user?.id ? (
            <Link href={`/post/update/${post.id}`}>
              <EditIcon width={20} height={20} />
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className={'flex-center hover:bg-secondary p-1 rounded'}>
                  <MoreIcon width={25} height={25} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Save</DropdownMenuItem>
                <DropdownMenuItem>Copy link</DropdownMenuItem>
                <DropdownMenuItem>Share to</DropdownMenuItem>
                <DropdownMenuItem>Go to post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className=" border-t shadow-b border-dark-4/80 flex-center flex-col px-5 flex-1 w-full small-medium lg:base-regular p-2 min-h-[105px] max-h-[115px] overflow-y-auto">
          <p className={'h-full'}>{post?.caption}</p>
          <ul className="flex gap-1 mt-2">
            {listTags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <div className={'list-comments-postcard-detail '}>
          {statusComments === 'pending' ? (
            <LoadingListComments />
          ) : (
            <CommentGroup tree={commentsTree} />
          )}
          {/*{hasNextPage && (*/}
          {/*  <div ref={ref} className="mt-10">*/}
          {/*    <Loader />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
        <Actions
          totalLikes={totalLikes}
          saved={post.postSaved}
          currentUser={user}
          onLike={handleCreateLike}
          onUnLike={handleUnLike}
          onCreateComment={handleCreateComment}
          onSavedPost={handleSavePost}
          onUnsavedPost={handleUnSavePost}
        />
      </div>
    </div>
  );
};

