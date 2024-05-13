// Libraries
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
// Component

// Style

// Types


interface AlertDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  textCancel?: string;
  textOk?: string;
  onOk: any;
}

export function ConfirmDialog(props: AlertDialogProps) {
  const {
    children,
    title = 'Are you absolutely sure?',
    description = ' This action cannot be undone. This will permanently delete your account and remove your data from our servers.',
    textOk = 'Continue',
    textCancel = 'Cancel',
    onOk,
  } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{textCancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onOk}>{textOk}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
