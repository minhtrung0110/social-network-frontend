// Libraries
import React from 'react';
import { useGlobalState } from '@/store/zustand';
import { Post } from '@/models/post';
import Link from 'next/link';
import { ROUTES } from '@/constrants/route';
import { multiFormatDateString } from '@/_lib/utils';
import Image from 'next/image';
import { EditIcon, PostPlaceholderIcon, ProfileIcon } from '@/components/atoms/icons';

// Component

// Style

// Types

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = (props) => {
  const { post } = props;
  const user = useGlobalState(state => state.user);

  if (!post.user) return;
  return (
    <div className='post-card'>
      <div className='flex-between'>
        <div className='flex items-center gap-3'>
          <Link href={`/${ROUTES.PROFILE.key}/${post.user.id}`}>
            {
              post.user?.imageUrl ?
                <Image
                  src={post.user?.imageUrl} alt='user' className='w-12 lg:h-12 rounded-full'
                /> : <ProfileIcon width={25} height={25} />
            }
          </Link>

          <div className='flex flex-col'>
            <p className='base-medium lg:body-bold text-light-1'>
              {post.user.lastName} {post.user.firstName}
            </p>
            <div className='flex-center gap-2 text-light-3'>
              <p className='subtle-semibold lg:small-regular '>
                {multiFormatDateString(post.createdAt)}
              </p>
              •
              <p className='subtle-semibold lg:small-regular'>
                {/*{post.location}*/}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={`/update-post/${post.id}`}
          className={`${user?.id !== post.user.id && 'hidden'}`}>
          <EditIcon width={25} height={25} />
        </Link>
      </div>

      <Link href={`/posts/${post.id}`}>
        <div className='small-medium lg:base-medium py-5'>
          <p>{post.caption}</p>
          <ul className='flex gap-1 mt-2'>
            {/*{post.tags.map((tag: string, index: string) => (*/}
            {/*  <li key={`${tag}${index}`} className='text-light-3 small-regular'>*/}
            {/*    #{tag}*/}
            {/*  </li>*/}
            {/*))}*/}
          </ul>
        </div>
        {
          post.imageUrl ?
            <Image
              src={post.imageUrl}
              alt='post image'
              className='post-card_img'
            />
            : <PostPlaceholderIcon width={250} height={250} />
        }

      </Link>

      {/*<PostStats post={post} userId={user.id} />*/}
      {/*<Comments amount={150} />*/}
    </div>
  );
};

export default PostCard;
