'use client';
// Libraries
import React, { useTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUser } from '@/schema/user.schema';
import z from 'zod';
import ProfileUploader from '@/app/(home)/components/molecules/ProfileUpload';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/atoms/Loader';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/style';
import { format } from 'date-fns';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import uploadApiRequest from '@/api/upload';
import userApiRequest from '@/api/user';
import { ROUTES } from '@/constrants/route';
import { useAppContext } from '@/store/app-provider';
// Component

// Style

// Types

interface Props {
  profile: any;
}

interface Props {
  // Define your component's props here
}

const FormProfile: React.FC<Props> = props => {
  const { profile } = props;
  // Function
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useAppContext();
  //console.log('profile', profile);

  const form = useForm<z.infer<typeof UpdateUser>>({
    resolver: zodResolver(UpdateUser),
    defaultValues: {
      avatar: [],
      firstName: profile.firstName,
      lastName: profile.lastName,
      address: profile.address,
      birthday: new Date(profile.birthday),
      gender: profile.gender,
      // bio: profile.bio || '',
    },
  });
  const { formState, register } = form;
  const handleUpdate = async (value: z.infer<typeof UpdateUser>) => {
    //console.log('Form Sate:', formState, formState.dirtyFields, formState.isDirty);
    let resultUpload = null;
    try {
      if (value?.avatar?.length ?? 0 > 0) {
        const formData = new FormData();
        // @ts-ignore
        formData.append('file', value?.avatar?.[0] as Blob);
        //console.log('formdata', formData);
        resultUpload = await uploadApiRequest.sendFileToNextServer(formData);
        // console.log('Res uploaded', resultUpload);
      }

      const response = await userApiRequest.updateUserClientToNextServer(profile.id, {
        avatar: resultUpload ? resultUpload?.data : profile.avatar,
        firstName: value.firstName,
        lastName: value.lastName,
        address: value.address,
        birthday: value.birthday,
        gender: value.gender,
        // bio: value.bio || '',
      });

      if (response.status === 200) {
        toast({
          title: `Update successfully`,
        });
        setUser(response.data);
        setTimeout(() => router.push(`/${ROUTES.PROFILE.key}/${profile.id}`), 800);
      } else {
        toast({
          title: `Update user failed. Please try again.`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: `Something went wrong`,
        variant: 'destructive',
      });
      // }
    }
  };
  const handleSubmitWithTransition = (e: any) => {
    e.preventDefault();
    startTransition(() => {
      form.handleSubmit(handleUpdate)();
    });
  };
  //console.log('Pending transition:', pending);
  const handleCancel = (e: any) => {
    router.back();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitWithTransition}
        className="flex flex-col gap-7 w-full mt-4 max-w-5xl"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem className="flex">
              <FormControl>
                <ProfileUploader fieldChange={field.onChange} mediaUrl={profile.avatar} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">First Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Last Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label block">Date of birth</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal bg-foreground hover:bg-foreground hover:text-background text-background ',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={date => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Address</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*<FormField*/}
        {/*  control={form.control}*/}
        {/*  name="bio"*/}
        {/*  render={({ field }) => (*/}
        {/*    <FormItem>*/}
        {/*      <FormLabel className="shad-form_label">Bio</FormLabel>*/}
        {/*      <FormControl>*/}
        {/*        <Textarea className="shad-textarea custom-scrollbar" {...field} />*/}
        {/*      </FormControl>*/}
        {/*      <FormMessage className="shad-form_message" />*/}
        {/*    </FormItem>*/}
        {/*  )}*/}
        {/*/>*/}

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4 whitespace-nowrap"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={pending || !formState.isDirty}
          >
            {pending && <Loader />}
            {!pending && <>Update</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default FormProfile;