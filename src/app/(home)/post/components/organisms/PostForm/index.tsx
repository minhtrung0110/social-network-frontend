'use client';
// Libraries
import React, { useTransition } from 'react';
import { CreatePost, Post } from '@/schema/post.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

// Component
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Loader from '@/components/atoms/Loader';
import FileUploader from '@/app/(home)/components/molecules/FileUploader';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Api
import uploadApiRequest from '@/api/upload';
import postApiRequest from '@/api/post';

// Style
// Types
import { ROUTES } from '@/constrants/route';
import { useAppContext } from '@/store/app-provider';
import { useUpdatePost } from '@/queries/queries';

interface Props {
  post?: Post;
  type?: 'create' | 'update';
}

const PostForm: React.FC<Props> = props => {
  //Props
  const { type = 'create', post } = props;
  // Hooks
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAppContext();
  const [pending, startTransition] = useTransition();
  // Form
  const form = useForm<z.infer<typeof CreatePost>>({
    resolver: zodResolver(CreatePost),
    defaultValues: {
      caption: post ? post?.caption : '',
      imageUrl: [],
      tags: post ? post.tags : '',
      scope: post?.scope,
      //location: post ? post.location : '',
    },
  });
  const { formState } = form;
  //console.log('Form state:', formState.isDirty, formState.dirtyFields);
  // Query
  // const { mutateAsync: createPost, isLoading: isLoadingCreate } =
  //   useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
  // Handler
  const handleSubmitAction = async (value: Omit<z.infer<typeof CreatePost>, 'userId'>) => {
    console.log('Submit', value);
    let resUpload = null;
    try {
      const formData = new FormData();
      // @ts-ignore
      formData.append('file', value?.imageUrl?.[0] as Blob);
      if (value?.imageUrl?.length ?? 0 > 0) {
        resUpload = await uploadApiRequest.sendFileToNextServer(formData);
      }
      if (post && type === 'update') {
        const updatedPost = await updatePost({
          ...value,
          id: post.id,
          imageUrl: value?.imageUrl?.length ?? 0 > 0 ? resUpload?.data : post.imageUrl ?? '',
        });
        console.log('Result Update Post: ', updatedPost);

        if (updatedPost.status === 200) {
          toast({
            title: updatedPost.message,
          });
          router.push(ROUTES.HOME.path);
        } else {
          toast({
            title: `${type} post failed. Please try again.`,
            description: updatedPost.message,
            variant: 'destructive',
          });
        }
      } else {
        const res = await postApiRequest.sendCreatePostToNextServer({
          ...value,
          imageUrl: resUpload?.data ?? '',
          userId: user?.id ?? 1,
        });
        if (res.status === 200) {
          toast({
            title: res.message,
          });
          router.push(ROUTES.HOME.path);
        }
      }
    } catch (err) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };
  const handleTransitionSubmit = (e: any) => {
    e.preventDefault();
    startTransition(() => {
      form.handleSubmit(handleSubmitAction)();
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleTransitionSubmit} className="flex flex-col gap-9 w-full  max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl ?? ''} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma `` ,``)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Scope</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-y-1"
                >
                  <FormItem className="flex items-center mr-5 space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">Private</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center mr-5 space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <FormLabel className="font-normal">Public</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center mr-5 space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="follwer" />
                    </FormControl>
                    <FormLabel className="font-normal">Follower</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={pending || !formState.isDirty}
          >
            {pending && <Loader />}
            {!pending && <>Create</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;