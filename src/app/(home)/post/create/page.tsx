// Libraries
import React from 'react';
import { CreateIcon } from '@/components/atoms/icons';
import PostForm from '@/app/(home)/post/components/organisms/PostForm';

// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const CreatePostPage: React.FC<Props> = (props) => {
  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <CreateIcon width={35} height={35} />

          <h2 className='h3-bold md:h2-bold text-left w-full'>Create Post</h2>
        </div>

        <PostForm />
      </div>
    </div>
  );
};

export default CreatePostPage;