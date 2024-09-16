// Libraries
import React from 'react';
import Link from 'next/link';

// Constants
import { ROUTES } from '@/constraints/route';

// Types
import { CommentObj } from '@/schema/comment.schema';

interface Props {
  data: CommentObj | any;
}

const CommentItem: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <div className={`flex justify-start items-start my-4  `}>
      <div
        className={`flex justify-start items-stretch ml-2 flex-row`}>
        <Link href={`${ROUTES.PROFILE.key}/${data.user.id}`}
              className='base-medium text-light-1 mr-1  '>
          {data.user.username}
        </Link>
        <div className=' cursor-text base-regular break-words text-foreground'>{data.content}</div>
      </div>

    </div>
  );
};

export default CommentItem;
