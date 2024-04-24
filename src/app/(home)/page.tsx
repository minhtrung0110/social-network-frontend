// Libraries
import React, { Suspense } from 'react';
import HomeFeed from '@/app/(home)/components/organisms/HomeFeed';
import { cookies } from 'next/headers';
import postApiRequest from '@/api/post';
import Loader from '@/components/atoms/Loader';

// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const HomePage: React.FC<Props> = async (props) => {
  const isPostLoading = true;
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  // @ts-ignore
  const result = await postApiRequest.getList(sessionToken?.value ?? '');
  console.log('Posts', result);


  return (
    <div>
      Home Page
      <div className={'home-container'}>
        <Suspense fallback={<Loader />}>
          <HomeFeed data={result.data} />
        </Suspense>

      </div>
      <div className={'home-creators'}>
        Creator
      </div>
    </div>
  );
};

export default HomePage;