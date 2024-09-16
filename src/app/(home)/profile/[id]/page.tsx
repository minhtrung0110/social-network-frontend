// Libraries
import React, { Suspense } from 'react';
import { cookies } from 'next/headers';

// Component
import ProfileInfo from '../components/organisms/ProfileInfo';
import ProfilePost from '@/app/(home)/profile/components/organisms/ProfilePost';
import ProfileStory from '@/app/(home)/profile/components/organisms/ProfileStory';

// Api
import userApiRequest from '@/api/user';
import Loader from '@/components/atoms/Loader';

// Types

interface ProfileProps {
  params: { id: string };
}

const listStories = [
  {
    id: 1,
    username: 'dh.baotrung',
    email: 'nguyenducminhtrung0044@gmail.com',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    story: true,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',

  },
  {
    id: 2,
    username: 'le hoai linh',
    email: 'linhka56@gmail.com',
    firstName: 'Linh',
    lastName: 'Nguyen Duc Minh',
    story: true,
    avatar: 'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',

  },
];
const ProfilePage: React.FC<ProfileProps> = async props => {
  const { id } = props.params;
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const { data: currentUser } = await userApiRequest.getProfile(Number(id), sessionToken?.value ?? '');
  

  return (
    <div className='profile-container'>
      <Suspense fallback={<Loader />}>
        <ProfileInfo user={currentUser} profileId={id} />
      </Suspense>

      <ProfileStory data={listStories} />
      <ProfilePost userId={currentUser?.id} />
    </div>
  );
};

export default ProfilePage;