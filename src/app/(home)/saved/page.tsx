'use client';
// Libraries
import React from 'react';
import { Button } from '@/components/ui/button';
import { useGetInfiniteComments } from '@/queries/queries';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { EmotionIcon } from '@/components/atoms/icons';

// Component

// Style

// Types

interface Props {
  // Define your component's props here
}

const Page: React.FC<Props> = props => {
  const callAPI = async () => {
    const res = await fetch(`http://localhost:8888/api/v1/post`, {
      cache: 'no-store',
      credentials: 'include',
    });
  };
  const { data: posts, fetchNextPage, hasNextPage } = useGetInfiniteComments(4);

  console.log('Cheking infinity:', posts);

  return (
    <div className={'flex item-center w-full '}>
      Saved
      <Button onClick={() => fetchNextPage()}>Call APi</Button>
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button>
            <EmotionIcon
              width={20}
              height={20}
              className={'cursor-pointer fill-pink-500'}
              //onClick={handleEmotionIconClick}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <Picker
            data={data}
            //onSelect={handleEmojiPickup}
            // onClick={f}
            //onEmojiSelect={handleEmojiPickup}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Page;