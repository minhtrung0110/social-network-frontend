// Libraries
import React, { Suspense } from 'react';
import { cookies } from 'next/headers';

// Component
import NewFeed from '@/app/(home)/components/organisms/NewFeed';
import Loader from '@/components/atoms/Loader';
import TopCreator from '@/app/(home)/components/organisms/TopCreator';
import ProfileInstant from '@/app/(home)/components/molecules/ProfileInstant';
import TopStory from '@/app/(home)/components/organisms/TopStory';
import { Separator } from '@/components/ui/separator';

// Api
import userApiRequest from '@/api/user';
import { ListStories } from '@/constraints/common';


interface Props {
  // Define your component's props here
}

const HomePage: React.FC<Props> = async (props) => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const { data: listUsers } = await userApiRequest.getAllUsers(sessionToken?.value ?? '');

  const listUserStories = listUsers?.map((item: any) => ({ ...item, story: true }));

  return (
    <div className={'flex flex-1'}>
      <div className={'home-container'}>
        <TopStory listUserStories={ListStories} />
        <Suspense fallback={<Loader />}>
          <NewFeed />
        </Suspense>
      </div>
      <div className={'home-creators'}>
        <ProfileInstant />
        <Separator orientation='horizontal' />
        <Suspense fallback={<Loader />}>
          <TopCreator data={listUsers} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;