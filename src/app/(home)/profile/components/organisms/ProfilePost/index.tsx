'use client';
// Libraries
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { AvatarIcon, Component2Icon, VideoIcon } from '@radix-ui/react-icons';
import { TEMP_LIST_POST } from '@/constraints/common';
import CardImage from '@/app/(home)/components/molecules/CardImage';
import { useGetInfiniteCompactPosts } from '@/queries/queries'; // Component
import { useInView } from 'react-intersection-observer';
import Loader from '@/components/atoms/Loader';
// Component

// Constrant

// Types

// Actions

interface ProfilePostProps {
  userId: number;
}

const ProfilePost: React.FC<ProfilePostProps> = props => {
  const { userId } = props;
  // State

  const listPosts = TEMP_LIST_POST;
  const { ref, inView } = useInView();
  // Query
  const { data: listPostImages, fetchNextPage, hasNextPage } = useGetInfiniteCompactPosts(userId);
  // Hooks

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  // Handle
  console.log('Checkscoll:', hasNextPage, listPostImages);
  return (
    <div className={'flex-center w-full max-w-[64rem]'}>
      <Tabs defaultValue="posts" className=" w-full">
        <TabsList className="grid w-full bg-transparent grid-cols-3">
          <TabsTrigger value="posts">
            <div className={'flex fex-center flex-row text-foreground '}>
              <Component2Icon width={20} height={20} />
              <span className="base-bold ml-2">POST</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="reels">
            <div className={'flex fex-center flex-row text-foreground '}>
              <VideoIcon width={20} height={20} />
              <span className="base-bold ml-2">TAGGED</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="tagged">
            <div className={'flex fex-center flex-row text-foreground '}>
              <AvatarIcon width={20} height={20} />
              <span className="base-bold ml-2">TAGGED</span>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className={`w-full grid grid-cols-3   `}>
            {listPostImages?.pages?.map(page =>
              page?.map(post => (
                <CardImage post={post} key={`post-related-${post.id}`} className={'mb-1'} />
              )),
            )}
          </div>
          {hasNextPage && (
            <div className={'flex-center w-full h-32'} ref={ref}>
              <div className={'flex-center'}>
                <Loader size={'l'} />
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="reels">
          <Card></Card>
        </TabsContent>
        <TabsContent value="tagged">
          <Card></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePost;