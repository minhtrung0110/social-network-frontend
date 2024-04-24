// Libraries
import React, { Suspense } from 'react';
import Loader from '@/components/atoms/Loader';
import userApiRequest from '@/api/user';
import { cookies } from 'next/headers';
import ProfileInfo from '@/app/(home)/profile/components/molecules/ProfileInfo';


// Component

// Style

// Types

interface ProfileProps {
  params: { id: string };
}

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
      <Suspense fallback={<Loader />}>
        <ProfileInfo user={currentUser} />
      </Suspense>

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