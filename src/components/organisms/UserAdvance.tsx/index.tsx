// Libraries
import React from 'react';

// Component
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Style

// Types


interface Props {
  profile: React.ReactNode;
  children: React.ReactNode;
}

const UserAdvance: React.FC<Props> = (props) => {
  const { children, profile } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          {profile}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserAdvance;