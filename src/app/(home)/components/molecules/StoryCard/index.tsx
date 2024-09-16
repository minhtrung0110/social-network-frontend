'use client';
// Libraries
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { HeartFilledIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { HeartIcon, MoreIcon } from '@/components/atoms/icons';
import { multiFormatDateString } from '@/utils/date';
import StoryCardItem from '@/app/(home)/components/molecules/StoryCardItem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProgressBar from '@/components/atoms/ProgressBar';

// Component

// Constraint

// Types

// Actions

interface StoryCardProps {
  data: any;
}

const StoryCard: React.FC<StoryCardProps> = props => {
  const { data } = props;
  console.log(data);
  const listItem = data.stories;
  // State
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [active, setActive] = useState<number>(1);

  // Handle
  useEffect(() => {
    if (active < listItem.length - 1) {
      const interval = setInterval(() => {
        setActive(prev => prev + 1);
      }, 2000); // Progress every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [active, listItem.length]);
  console.log('Check Active', active);
  const onLike = () => {};
  const onUnLike = () => {};

  return (
    <div
      className={
        'relative w-[400px] h-[700px] backdrop-blur-md flex-center flex-col bg-background px-2 pt-4 gap-2  border shadow-amber-50 border-gray-500 rounded-lg'
      }
    >
      <div className={'w-full mt-0 flex flex-row gap-1'}>
        {listItem.map(item => (
          <ProgressBar
            key={item.id}
            timer={5000}
            className={`${item.id === active ? 'bg-gray-600' : ''} transition-all duration-300 group h-1 w-auto`}
          />
        ))}
      </div>
      <div className={'fixed top-6 left-0 flex-between w-full px-3 my-1 z-50 '}>
        <div className={'flex-center flex-row space-x-2 '}>
          <Avatar className={'w-8 h-8'}>
            <AvatarImage src={data.avatar} alt={`@${data.firstName}`} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span className={'small-bold text-foreground'}>{data.username}</span>
          <span className={'small-regular'}> {multiFormatDateString(data?.createdAt)}</span>
        </div>

        <div className={'flex-center hover:bg-secondary p-1 rounded cursor-pointer'}>
          <MoreIcon width={18} height={18} />
        </div>
      </div>
      {listItem.map(item => (
        <StoryCardItem
          key={item.id}
          data={listItem[0]}
          className={`${active === item.id ? 'flex' : 'hidden'}`}
        />
      ))}

      <div className={'flex-between flex-row px-2 w-full h-[90px]'}>
        <Input placeholder={'Message'} className={'rounded-[20px] w-[78%] border-gray-500'} />
        <div className={'flex flex-row items-center ml-2 w-[19%] '}>
          {isLiked ? (
            <HeartFilledIcon
              width={25}
              height={25}
              color={'#FF0066'}
              className={'action-icon'}
              onClick={onUnLike}
            />
          ) : (
            <HeartIcon width={25} height={25} className={'action-icon'} onClick={onLike} />
          )}

          <PaperPlaneIcon width={25} height={25} className={'action-icon'} />
        </div>
      </div>
    </div>
  );
};

export default StoryCard;