// Libraries
import React, { ReactNode } from 'react';

// Component
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// Style
// Types
import { MoreActionType } from '@/types/common';

interface Props {
  children: ReactNode,
  listActions: MoreActionType[],
}


const MoreActionPost: React.FC<Props> = (props) => {
  const { children, listActions } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className={'bg-background'}>
        {
          listActions && listActions.map(action =>
            (<DropdownMenuItem
              className='cursor-pointer py-2 text-foreground hover:text-background hover:bg-secondary'
              key={`dropdown-more-action-${action.key}`}
              onClick={action.onAction}
            >
              {action.label}
            </DropdownMenuItem>),
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreActionPost;