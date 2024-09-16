// Libraries
import React from 'react';


// Component
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Types

interface ExtraDialogProps {
  children?: React.ReactNode;
  content?: React.ReactNode,
  title: string;
  className?: string;
  side?: 'right' | 'top' | 'bottom' | 'left' | null | undefined;

}

const ExtraDialog: React.FC<ExtraDialogProps> = props => {
  const { children, title, side = 'right', content, className } = props;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {
          content
        }
      </SheetContent>
    </Sheet>
  );
};

export default ExtraDialog;