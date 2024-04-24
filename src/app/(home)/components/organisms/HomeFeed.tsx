'use client';
// Libraries
import React, { useState } from 'react';
import Loader from '@/components/atoms/Loader';
import PostCard from '@/app/(home)/components/molecules/PostCard';
import { Post } from '@/models/post';

// Component

// Style

// Types

interface Props {
  data: any;
}

// eslint-disable-next-line @next/next/no-async-client-component
const HomeFeed: React.FC<Props> = async props => {
  const isPostLoading = false;
  const { data } = props;
  const [posts, setPosts] = useState<Post[]>(data);
  return (
    <div className="home-posts">
      <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
      {isPostLoading && !posts ? (
        <Loader />
      ) : (
        <ul className="flex flex-col flex-1 gap-9 w-full ">
          {posts?.map(post => (
            <li key={post?.id} className="flex justify-center w-full">
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeFeed;