// Libraries
import React from 'react';
import Loader from '@/components/atoms/Loader';
import userApiRequest from '@/api/user';
import { cookies } from 'next/headers';
import ProfileInfo from '../components/organisms/ProfileInfo';
import ProfilePost from '@/app/(home)/profile/components/organisms/ProfilePost';
import ProfileStory from '@/app/(home)/profile/components/organisms/ProfileStory';


// Component

// Style

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
  const res = await userApiRequest.getUserById(id, sessionToken?.value ?? '');
  const currentUser = res.data;
  if (!currentUser)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );
  return (
    <div className='profile-container'>
      <ProfileInfo user={currentUser} />
      <ProfileStory data={listStories} />
      <ProfilePost />


      {/*{currentUser.$id === user.id && (*/}
      {/*  <div className='flex max-w-5xl w-full'>*/}
      {/*    <Link*/}
      {/*      to={`/profile/${id}`}*/}
      {/*      className={`profile-tab rounded-l-lg ${*/}
      {/*        pathname === `/profile/${id}` && '!bg-dark-3'*/}
      {/*      }`}>*/}
      {/*      <img*/}
      {/*        src={'/assets/icons/posts.svg'}*/}
      {/*        alt='posts'*/}
      {/*        width={20}*/}
      {/*        height={20}*/}
      {/*      />*/}
      {/*      Posts*/}
      {/*    </Link>*/}
      {/*    <Link*/}
      {/*      to={`/profile/${id}/liked-posts`}*/}
      {/*      className={`profile-tab rounded-r-lg ${*/}
      {/*        pathname === `/profile/${id}/liked-posts` && '!bg-dark-3'*/}
      {/*      }`}>*/}
      {/*      <img*/}
      {/*        src={'/assets/icons/like.svg'}*/}
      {/*        alt='like'*/}
      {/*        width={20}*/}
      {/*        height={20}*/}
      {/*      />*/}
      {/*      Liked Posts*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*)}*/}

      {/*<Routes>*/}
      {/*  <Route*/}
      {/*    index*/}
      {/*    element={<GridPostList posts={currentUser.posts} showUser={false} />}*/}
      {/*  />*/}
      {/*  {currentUser.$id === user.id && (*/}
      {/*    <Route path='/liked-posts' element={<LikedPosts />} />*/}
      {/*  )}*/}
      {/*</Routes>*/}
      {/*<Outlet />*/}
    </div>
  );
};

export default ProfilePage;