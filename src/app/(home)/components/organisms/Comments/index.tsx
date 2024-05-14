'use client';
// Libraries
import React from 'react';
import CommentItemAdvance
  from '@/app/(home)/components/organisms/Comments/components/molecules/CommentItem/CommentItemAdvance';
import { CommentWithChildren } from '@/utils/util';
import { Comment } from '@/schema/comment.schema'; // Component

// Component

// Style

// Types

interface CommentGroupProps {
  tree: CommentWithChildren[];
}

const CommentGroup: React.FC<CommentGroupProps> = props => {
  const { tree } = props;
  return (
    <div className={'px-5'}>
      {tree.length > 0 &&
        tree.map((comment: Comment) => (
          <CommentItemAdvance key={`cmt-${comment.id}`} data={comment} />
        ))}
    </div>
  );
};

export default CommentGroup;

