'use client';
// Libraries
import React from 'react';
import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { useAppContext } from '@/store/app-provider';
import { ListStories } from '@/constraints/common';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { EmblaOptionsType } from 'embla-carousel';
import StoryCard from '@/app/(home)/components/molecules/StoryCard';

// Component

// Constraint

// Types

// Actions

interface StoryModeProps {}

const StoryMode: React.FC<StoryModeProps> = props => {
  // State
  const data = ListStories[0].stories;
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 3,
    speed: 500,
  };
  // Hooks
  const { showStoryMode, setShowStoryMode } = useAppContext();
  console.log('GlobalState:-- StoryMode ->', showStoryMode);
  // Handle
  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <Dialog defaultOpen={false} open={showStoryMode} onOpenChange={setShowStoryMode}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          className={'fixed left-0 top-0 z-50  w-full h-full flex-center bg-transparent  '}
        >
          <StoryCard data={ListStories[0]} />
          {/*<EmblaCarousel slides={SLIDES} options={OPTIONS} />*/}
          {/*<Carousel className="w-full max-w-[420px]">*/}
          {/*  <CarouselContent>*/}
          {/*    {ListStories[0].stories.map((story, index) => (*/}
          {/*      <CarouselItem key={index}>*/}
          {/*        <StoryCard data={story} key={`key--${index}`} />*/}
          {/*      </CarouselItem>*/}
          {/*    ))}*/}
          {/*  </CarouselContent>*/}
          {/*  <CarouselPrevious />*/}
          {/*  <CarouselNext />*/}
          {/*</Carousel>*/}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};

export default StoryMode;


