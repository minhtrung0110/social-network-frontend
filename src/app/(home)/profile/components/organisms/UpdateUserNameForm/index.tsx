'use client';
// Libraries
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GearIcon } from '@/components/atoms/icons/GearIcon';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import userApiRequest from '@/api/user';
import { useToast } from '@/components/ui/use-toast';

// Component

// Style

// Types

interface Props {
  id: string;
  username: string;
}

const UpdateUserNameForm: React.FC<Props> = props => {
  const { id, username = '' } = props;
  const { toast } = useToast();
  const [userName, setUserName] = useState(username);
  const [error, setError] = useState('');
  const handleSubmit = async () => {
    console.log('update username:', userName);
    const res = await userApiRequest.updateUserNameToNextServer(Number(id), { username: userName });
    // const res = await userApiRequest.updateUserName(Number(id), { username: userName });
    if (res.status === 200)
      toast({
        title: 'Update successfully',
      });
    else
      toast({
        title: 'Cannot update username',
        variant: 'destructive',
      });
  };
  const validate = (value: string) => {
    const inputValue = value.trim();
    return !(inputValue.length < 2 || inputValue.length > 18);
  };

  const handleOnBlur = async () => {
    let message = validate(userName)
      ? ''
      : 'Username is minimum 2 characters and maximum 18 characters.';
    const res = await userApiRequest.getUsersFormClientToServer(userName);
    if (res.data.length > 0) message = 'Username is existence !';
    else setError('');
    setError(message);
  };
  console.log(validate(userName));
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={'!h-10 !w-40 shad-button_primary '}>
          <GearIcon />
          Update Username
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <div className="items-center gap-4">
            <Label htmlFor="username" className="text-right base-bold pb-5 ml-1">
              Username
            </Label>
            <Input
              id="username"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              className="col-span-3"
              onBlur={handleOnBlur}
            />
            <p className={'mt-2 ml-1 w-full small-regular text-red-500'}>{error}</p>
          </div>
        </div>
        <DialogFooter>
          <Button
            onKeyDown={event => event.key === 'Enter' && handleSubmit()}
            onClick={handleSubmit}
            disabled={error !== ''}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateUserNameForm;