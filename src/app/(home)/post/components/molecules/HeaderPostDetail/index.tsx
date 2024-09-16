'use client';
// Libraries
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Component
import { Button } from '@/components/ui/button';

// Style

// Types

interface Props {
  // Define your component's props here
}

const HeaderPostDetail: React.FC<Props> = props => {
  const router = useRouter();
  return (
    <div className="hidden md:flex max-w-5xl w-full">
      <Button onClick={() => router.back()} variant="ghost" className="shad-button_ghost">
        <ArrowLeft width={24} height={24} />
        <p className="small-medium lg:base-medium">Back</p>
      </Button>
    </div>
  );
};

export default HeaderPostDetail;