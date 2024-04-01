// Libraries
import React, { ReactNode } from 'react';
import LeftSideBar from '@/app/(home)/components/organisms/LeftSideBar';
import BottomBar from '@/app/(home)/components/organisms/BottomBar';

// Component

// Style

// Types


interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props) => {
  return (
    <div className='w-full md:flex'>
      <LeftSideBar />
      <section className='flex flex-1 h-full'>
        {props.children}
      </section>
      <BottomBar />

    </div>
  );
};

export default Layout;