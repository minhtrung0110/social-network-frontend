'use client';
// Libraries
import React from 'react';
import Image from 'next/image';

// Component

// Constant

// Types

// Actions

type StoryCardItemType = {
  id: number;
  source: string;
  music: string;
  type: 'video' | 'image';
};

interface StoryCardItemProps {
  data: StoryCardItemType;
  className: string;
}

const StoryCardItem: React.FC<StoryCardItemProps> = props => {
  const { data, className } = props;
  // State

  const [progress, setProgress] = React.useState(13);
  // Hooks

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Handle

  return (
    <div
      className={` transition duration-500 justify-center items-center mt-14 py-2 relative w-[380px] h-[550px] ${className}`}
    >
      {data.source && (
        <Image
          src={data.source}
          alt="post image"
          width={380}
          height={500}
          quality={100}
          className="story-card_img max-w-[100%] lg:h-[550px]"
        />
      )}
    </div>
  );
};

export default StoryCardItem;