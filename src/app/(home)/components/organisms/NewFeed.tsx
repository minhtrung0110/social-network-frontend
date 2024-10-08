'use client';
// Libraries
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TargetIcon } from '@radix-ui/react-icons';

// Component
import { PostCard } from '@/app/(home)/components/organisms/PostCard';

// Query
import { useGetInfinitePosts } from '@/queries/queries';
import { LoadingListPostCard } from '@/components/molecules/skeleton/ListPostCard';

// Types

interface Props {
  // data: any;
}

// eslint-disable-next-line @next/next/no-async-client-component
const NewFeed: React.FC<Props> = props => {
  // State
  // Hooks
  const { ref, inView } = useInView();
  const { data: listPosts, hasNextPage, fetchNextPage, status } = useGetInfinitePosts();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="home-posts">
      <ul className="flex flex-col flex-1  items-center gap-9 w-full ">
        {status === 'pending' ? (
          <LoadingListPostCard amount={2} />
        ) : (
          listPosts?.pages?.map(page =>
            page?.map((post: any) => {
              return (
                <li key={post?.id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              );
            }),
          )
        )}
      </ul>
      {!hasNextPage && (
        <div className={'flex-center flex-row w-full h-full mt-10'}>
          <TargetIcon width={40} height={40} color={'#4caf86'} />
          <p className="text-foreground font-bold text-[22px] text-center ml-4">End of Posts</p>
        </div>
      )}
      {hasNextPage && (
        <div className="flex-center" ref={ref}>
          Loading.....
        </div>
      )}
    </div>
  );
};

export default NewFeed;