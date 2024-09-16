'use client';
// Libraries
import React from 'react';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';

// Component

// Types

// Actions

interface CardImageProps {
  post: any;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = props => {
  const { post, className = '' } = props;
  // State

  // Hooks

  // Handle

  return (
    <Link
      href={`/post/${post.id}`}
      className={`relative w-[21rem] h-[21rem] cursor-pointer p-[2px] overflow-hidden ${className} `}
    >
      <div className="absolute z-20 flex-center rounded-[6px] inset-0 bg-gray-600 opacity-0 hover:opacity-50 transition-opacity duration-300">
        <span className="body-bold flex-center flex-row brightness-150 mr-2">
          <HeartFilledIcon width={28} height={28} />
          <span className={'ml-[5px]'}>{post?._count?.Like}</span>
        </span>
        <span className="body-bold flex-center flex-row brightness-150">
          <ChatBubbleIcon width={28} height={28} />
          <span className={'ml-[5px]'}>{post?._count?.comments}</span>
        </span>
      </div>
      <Image
        src={post.imageUrl}
        alt={'img-post'}
        fill
        // width={330}
        // height={330}
        sizes={'(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={'rounded-[6px]'}
        style={{
          objectFit: 'cover',
        }}
      />
    </Link>
  );
};

export default CardImage;