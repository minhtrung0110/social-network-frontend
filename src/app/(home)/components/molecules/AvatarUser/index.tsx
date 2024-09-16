'use client';
// Libraries
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppContext } from '@/store/app-provider';

// Component

// Style

// Types

interface Props {
  firstName: string;
  avatar: string;
  story: any;
  size?: 'xs' | 's' | 'm' | 'l' | 'x' | 'xl';
  className?: string;
  type?: 'post' | 'story';
  onClick?: any;
}

const AvatarUser: React.FC<Props> = props => {
  const { firstName, avatar, story, className, type = 'post', onClick } = props;
  
  // Hooks
  const { setShowStoryMode } = useAppContext();
  const handleType = type === 'post' ? '42px' : '56px';
  return (
    <div
      className={`${story && 'background-gradient'} cursor-pointer rounded-full ${className}`}
      onClick={() => setShowStoryMode(true)}
    >
      <div className={`  rounded-full ${story && 'border-[3px]'}  border-background `}>
        <Avatar className={`${type === 'story' ? 'w-14 h-14' : 'w-10 h-10'}`}>
          <AvatarImage
            width={handleType}
            height={handleType}
            src={avatar}
            style={{
              objectFit: 'cover',
            }}
            alt={`@${firstName}`}
          />
          <AvatarFallback>{firstName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default AvatarUser;
