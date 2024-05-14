'use client';
// Libraries
import React from 'react';
import AvatarUser from '@/app/(home)/components/molecules/AvatarUser';

// Component

// Constrant

// Types

// Actions

interface ProfileStoryProps {
  data: any;
}

const ProfileStory: React.FC<ProfileStoryProps> = props => {
  const { data } = props;
  // State

  // Hooks

  // Handle

  return (
    <div className={'flex w-full flex-center'}>
      {data?.map((story: any) => (
        <div className={'flex flex-col justify-center items-center'} key={`story-${story.id} `}>
          <AvatarUser
            className={'mr-3'}
            firstName={story.firstName}
            avatar={story.avatar}
            story={story.story}
            type={'story'}
          />
          <div className={'small-regular'}>{story.username}</div>
        </div>
      ))}
    </div>
  );
};

export default ProfileStory;