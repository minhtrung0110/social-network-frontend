'use client';
// Libraries
import React from 'react';
import CardImage from '@/app/(home)/components/molecules/CardImage';

// Component

// Style

// Types

interface Props {
  data: any;
}

const PostRelated: React.FC<Props> = props => {
  const { data } = props;

  return (
    <div className="w-full max-w-5xl">
      <hr className="border w-full border-dark-4/80" />

      <h3 className="body-bold md:h3-bold w-full my-10 ">More Related Posts</h3>
      <div className={`w-full grid grid-col-3 grid-rows-${data.length > 3 ? 2 : 1} grid-flow-col `}>
        {data.length > 0 &&
          data.map((post: any) => <CardImage key={`post-related-${post.id}`} post={post} />)}
      </div>
    </div>
  );
};

export default PostRelated;