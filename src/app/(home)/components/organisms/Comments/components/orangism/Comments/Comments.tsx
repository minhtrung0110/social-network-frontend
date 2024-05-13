'use client';

import React, { forwardRef, useState } from 'react';
import CommentItem from '@/app/(home)/components/organisms/Comments/components/molecules/CommentItem/CommentItem';
import { CommentObj } from '@/schema/comment.schema';
import FormComment from '@/app/(home)/components/organisms/Comments/components/molecules/FormComment/FormComment';
import { useAppContext } from '@/store/app-provider';

// Component

// Style

// Types

interface Props {
  amount: number;
  postId: number;
  focusRef: any;
  onCreate: any;
}

// eslint-disable-next-line react/display-name
const Comments: React.FC<Props> = forwardRef(props => {
  const { amount, postId, focusRef, onCreate } = props;
  // State
  const { user, postState } = useAppContext();
  const [comments, setComments] = useState<CommentObj[]>([]);
  const handleCreateComment = async (cmt: string) => {
    const newComment = {
      id: Math.random(),
      content: cmt,
      userId: user?.id,
      postId,
      replyId: null,
    };
    const res = await onCreate(newComment);
    if (res.status === 200)
      // @ts-ignore
      setComments(prev => [...prev, { ...newComment, user: user }]);

    // Fetch
  };

  return (
    <div className={'my-5'}>
      <div className={'flex-col'}>
        <span className={'text-gray-500 cursor-pointer base-regular mb-1'}>
          View {amount} comment{amount > 1 && 's'}
        </span>
        {comments &&
          comments.map(item => (
            <CommentItem type={'new-feed'} key={`cmt-${item.id}`} data={item} />
          ))}
      </div>
      <FormComment forwardedRef={focusRef} onSubmit={handleCreateComment} />
    </div>
  );
});

export default Comments;