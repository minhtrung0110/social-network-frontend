'use client';
// Libraries
import React, { useState } from 'react';
import AvatarUser from '../molecules/AvatarUser';

// Component

// Style

// Types

interface Props {
  listUserStories: any;
}

const TopStory: React.FC<Props> = props => {
  const { listUserStories } = props;
  // State
  const [showSlide, setShowSlide] = useState<boolean>(false);

  return (
    <div className={'flex flex-row justify-between items-center'}>
      {listUserStories?.map((story: any) => (
        <div className={'flex flex-col justify-center items-center'} key={`story-${story.id} `}>
          <AvatarUser
            className={'mr-3'}
            firstName={story.firstName}
            avatar={story.avatar}
            story={true}
            type={'story'}
          />

          <div className={'small-regular'}>{story.username}</div>
        </div>
      ))}
    </div>
  );
};

export default TopStory;