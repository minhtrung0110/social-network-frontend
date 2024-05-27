// Libraries
import React from 'react';
import { cookies } from 'next/headers';
import postApiRequest from '@/api/post';
import { isEmpty } from 'lodash';
import Loader from '@/components/atoms/Loader';
import CardImage from '@/app/(home)/components/molecules/CardImage';

// Component

// Constraint

// Types

// Actions


interface ExplorePageProps {
  // Define your component's props here
}

const ExplorePage: React.FC<ExplorePageProps> = async (props) => {
  const cookie = cookies();
  const accessToken = cookie.get('sessionToken');
  // Handle
  const { data: listPosts } = await postApiRequest.getCompactPostsWithToken({ compact: true }, accessToken?.value ?? '');

  return (
    <div className={' px-[140px] py-8 w-full h-[700px]  grid grid-cols-3'}>
      {
        isEmpty(listPosts) ? <div className='flex-center'><Loader size={'xl'} /></div> :
          listPosts.map((post: any) => (
            <CardImage post={post} key={`post-compact-key-${post.id}`} className={'mb-1'} />))
      }
    </div>
  );
};

export default ExplorePage;