// Libraries
import React from 'react';

// Component

// Style

// Types


interface Props {
  // Define your component's props here
}

const HomePage: React.FC<Props> = (props) => {
  const isPostLoading = true;
  return (
    <div>
      Home Page
      <div className={'home-container'}>
        <div className='home-posts'>
          <h2 className='h3-bold md:h2-bold text-left w-full'>Home Feed</h2>
          {/*{isPostLoading && !posts ? (*/}
          {/*  <Loader />*/}
          {/*) : (*/}
          {/*  <ul className='flex flex-col flex-1 gap-9 w-full '>*/}
          {/*    {posts?.documents.map((post) => (*/}
          {/*      <li key={post.$id} className='flex justify-center w-full'>*/}
          {/*        <PostCard post={post} />*/}
          {/*      </li>*/}
          {/*    ))}*/}
          {/*  </ul>*/}
          {/*)}*/}
        </div>
      </div>
      <div className={'home-creators'}>
        Creator
      </div>
    </div>
  );
};

export default HomePage;