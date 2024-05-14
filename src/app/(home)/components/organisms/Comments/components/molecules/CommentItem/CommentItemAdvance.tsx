'use client';
// Libraries
import React, { memo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommentObj } from '@/schema/comment.schema';
import Link from 'next/link';
import { ROUTES } from '@/constrants/route';
import ProfileMini from '@/components/molecules/ProfileMini';
import UserAdvance from '@/components/organisms/UserAdvance.tsx';
import { multiFormatDateString } from '@/utils/date';
import { useAppContext } from '@/store/app-provider';
import { MoreIcon } from '@/components/atoms/icons';
import { ConfirmDialog } from '@/components/molecules/AlertDialog';
import { useDeleteComment } from '@/queries/queries';
import CommentItemChildAdvance from '@/app/(home)/components/organisms/Comments/components/molecules/CommentItem/CommentItemChildAdvance';
import { isEqual } from 'lodash';

// Component

// Style

// Types

interface Props {
  data: CommentObj | any;
}

const compareProps = (prev: any, next: any) => {
  const isData = isEqual(prev.data, next.data);
  return isData;
};
// eslint-disable-next-line react/display-name
const CommentItemAdvance: React.FC<Props> = memo(props => {
  const { data } = props;
  // State
  const [showChildCmt, setShowChildCmt] = useState(false);
  const [focused, setFocused] = useState(false);

  // Query
  const { mutate: deleteComment } = useDeleteComment();

  // Global State
  const { postState, setReplyCommentPost } = useAppContext();
  // @ts-ignore
  const commentInput = postState?.comment_ref.current;

  // Handle
  const handleReply = () => {
    setReplyCommentPost(data.id);
    setTimeout(() => (commentInput.value = `@${data.user.username}`), 100);
    commentInput.focus();
  };
  const handleDeleteComment = (id: number) => {
    try {
      deleteComment(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`flex justify-start items-start my-4  `}>
      <Avatar className={'w-8 h-8'}>
        <AvatarImage src={data.user.avatar} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className={`flex justify-start items-stretch ml-2 flex-col`}>
        <UserAdvance profile={<ProfileMini user={data.user} />}>
          <Link
            href={`${ROUTES.PROFILE.key}/${data.user.id}`}
            className="base-medium  max-w-36 w-auto text-light-1 mr-1  "
          >
            {data.user.username}
          </Link>
        </UserAdvance>

        <div className="cursor-text base-regular break-words text-foreground">{data.content}</div>
        <div className={'mt-1 small-medium flex items-center gap-4 text-gray-400'}>
          <p>1525 likes</p>
          <span className={'cursor-pointer'} onClick={handleReply}>
            Reply
          </span>
          <span> {multiFormatDateString(data.updatedAt)}</span>
          <ConfirmDialog
            title="Delete comment"
            description={'Are you sure delete this comment ?'}
            onOk={() => handleDeleteComment(data.id)}
          >
            <MoreIcon
              width={35}
              height={30}
              className={'text-secondary hover:text-gray-400 cursor-pointer p-1 '}
            />
          </ConfirmDialog>
        </div>
        {data.children.length > 0 && (
          <span
            onClick={() => setShowChildCmt(!showChildCmt)}
            className={' ml-2 my-2 cursor-pointer text-gray-400 small-regular'}
          >
            --- {!showChildCmt ? 'View' : 'Hide'} all comments
          </span>
        )}
        {showChildCmt && (
          <div className={''}>
            {data.children.map((item: any) => (
              <CommentItemChildAdvance key={`child-cmt-${item.id}`} data={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}, compareProps);

export default CommentItemAdvance;
