// Libraries
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AvatarUser from '@/app/(home)/components/molecules/AvatarUser';

// Component
import { EditIcon, MoreIcon, ProfileIcon } from '@/components/atoms/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import UserAdvance from '@/components/organisms/UserAdvance.tsx';
import ProfileMini from '@/components/molecules/ProfileMini';
import { useAppContext } from '@/store/app-provider';
import PostAction from './components/molecules/PostAction';
import MoreActionPost from '@/app/(home)/components/molecules/MoreActionPost';

// Api
import likeApiRequest from '@/api/like';
import commentApiRequest from '@/api/comment';
import savedApiRequest from '@/api/saved';

// Utils
import { getDateTimePost, multiFormatDateString } from '@/utils/date';

// Constrants
import { ROUTES } from '@/constrants/route';

// Types
import { Post } from '@/models/post';
import { ACTIONS_POST_CARD } from '@/constrants/common';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = (props) => {
  // State
  const { post } = props;
  const listTags = post.tags.includes(',') ? post.tags.split(',') : [post.tags];
  const { user } = useAppContext();
  const listMoreActions = ACTIONS_POST_CARD;
  // const { data: profile, status } = useGetUserById(post.id);
  // Handle
  // API
  const handleLikePost = async () => {
    return await likeApiRequest.create({ userId: user?.id ?? 1, postId: post.id });
  };
  const handleDisLikePost = async () => {
    return await likeApiRequest.delete({ userId: user?.id ?? 1, postId: post.id });
  };

  const handleCreateComment = async (data: any) => {
    return await commentApiRequest.create({ ...data, userId: user?.id, postId: post.id });
  };
  const handleSavedPost = async () => {
    return await savedApiRequest.create({ userId: user?.id ?? 1, postId: post.id });
  };
  const handleUnSavedPost = async () => {
    return await savedApiRequest.delete({ userId: user?.id ?? 1, postId: post.id });
  };

  return (
    <div className='post-card '>

      <div className='header-post-card flex-between '>
        <div className='flex items-center gap-3 ml-1'>
          <Link href={`/${ROUTES.PROFILE.key}/${post.user.id}`}>
            {
              post.user?.avatar ?
                <AvatarUser story={null} firstName={post?.user.firstName} avatar={post.user.avatar} type={'post'} />
                : <ProfileIcon width={25} height={25} />
            }
          </Link>

          <div className='flex flex-row cursor-pointer items-center'>
            <UserAdvance profile={<ProfileMini user={post.user} />}>
              <p className='base-medium lg:body-bold text-light-1 mr-1 '>
                {post.user.username}
              </p>
            </UserAdvance>


            •
            <div className='flex-center gap-2 text-light-3 ml-1'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className='base-regular lg:small-regular '>
                      {multiFormatDateString(post.createdAt)}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getDateTimePost(post.createdAt, post.updatedAt)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>
          </div>
        </div>
        {
          post.user.id === user?.id ? <Link href={`/post/update/${post.id}`}>
              <EditIcon width={25} height={25} />
            </Link> :
            <MoreActionPost
              listActions={listMoreActions}
            >
              <div className={'flex-center hover:bg-secondary p-1 rounded'}>
                <MoreIcon width={25} height={25} />
              </div>
            </MoreActionPost>
        }
      </div>

      <Link href={`/post/${post.id}`} className={'content-post-card '}>
        <div className='base-regular lg:base-medium  px-2 py-4'>
          <p>{post.caption}</p>
          <ul className='flex gap-1 mt-2'>
            {listTags.map((tag: string, index: number) => (
              <li key={`${tag}${index}`} className='text-light-3 small-regular'>
                #{tag}
              </li>
            ))}
          </ul>
        </div>
        <div className='relative w-[585px] h-[520px] mt-1 mb-3 '>
          {
            post.imageUrl &&
            <Image
              src={post.imageUrl}
              alt='post image'
              // width={200} height={100}
              fill
              quality={100}
              className='post-card_img max-w-[100%] h-auto'
              style={{
                objectFit: 'cover',
              }}
            />
          }
        </div>

      </Link>

      <PostAction
        user={user}
        postId={post.id}
        amountComment={post.comments.length ?? 0}
        Like={post.Like}
        onLike={handleLikePost}
        onDisLike={handleDisLikePost}
        onUnSaved={handleUnSavedPost}
        onSaved={handleSavedPost}
        onCreateComment={handleCreateComment}
        saved={post.postSaved} />
    </div>
  );
};


