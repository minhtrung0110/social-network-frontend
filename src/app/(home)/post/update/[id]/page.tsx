// Libraries
import React from 'react';
import { EditIcon } from '@/components/atoms/icons';
import PostForm from '@/app/(home)/post/components/organisms/PostForm';
import postApiRequest from '@/api/post';
import Loader from '@/components/atoms/Loader';
import { cookies } from 'next/headers';

// Component

// Style

// Types


interface Props {
  params: { id: string };
}

const Page: React.FC<Props> = async (props) => {
  const { id } = props.params;
  const cookie = cookies();
  const res = await postApiRequest.getById(id, cookie.get('sessionToken')?.value ?? '');
  const currentPost = res.data;
  if (!currentPost)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );
  return (
    <div className='flex flex-1 w-full'>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full max-w-5xl'>
          <EditIcon
            width={36}
            height={36}
            alt='edit'
            className='invert-white'
          />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
        </div>

        <PostForm type='update' post={currentPost} />
      </div>
    </div>
  );
};

export default Page;