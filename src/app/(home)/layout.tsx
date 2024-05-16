// Libraries
import React, { ReactNode, Suspense } from 'react';
import LeftSideBar from '@/components/organisms/LeftSideBar';
import BottomBar from '@/components/organisms/BottomBar';
import Loading from '@/app/(home)/loading';

// Component

// Style

// Types


interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = async (props) => {
  // const cookieStore = cookies();
  // const sessionToken = cookieStore.get('sessionToken');
  // console.log(sessionToken);
  //
  // let user: UserAuth | null = null;
  // if (sessionToken) {
  //   const res = await userApiRequest.me(sessionToken.value);
  //   user = res.data;
  //
  //   //console.log('Account', user);
  //   // user = data.payload.data;
  // }
  return (
    <div className='w-full h-full md:flex relative'>
      <LeftSideBar />
      <Suspense fallback={<Loading />}>
        <section className='flex flex-1 h-full max-h-[750px]'>
          {props.children}
        </section>
      </Suspense>


      <BottomBar />

    </div>
  );
};

export default Layout;