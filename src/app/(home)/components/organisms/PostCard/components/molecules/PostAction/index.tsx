'use client';
// Libraries
import React, { memo, useRef, useState } from 'react';
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  HeartFilledIcon,
  PaperPlaneIcon,
} from '@radix-ui/react-icons';
import { isEqual } from 'lodash';
import Link from 'next/link';
import { handleCheckUserExist } from '@/utils/util';

// Component
import { HeartIcon } from '@/components/atoms/icons';
import CommentItem from '@/app/(home)/components/organisms/Comments/components/molecules/CommentItem/CommentItem';
import FormComment from '@/app/(home)/components/organisms/Comments/components/molecules/FormComment/FormComment';

// Types
import { FullUser } from '@/schema/user.schema';
import { CommentObj } from '@/schema/comment.schema';

interface PostActionProps {
  user: FullUser | null;
  Like: { userId: number }[];
  saved: { userId: number }[];
  amountComment: number;
  postId: number;
  onLike: () => void;
  onDisLike: () => void;
  onSaved: () => void;
  onUnSaved: () => void;
  onCreateComment: (data: any) => Promise<any>;
}

const compareProps = (prev: any, next: any) => {
  const isSaved = isEqual(prev.saved, next.saved);
  const isEqualUser = isEqual(prev.user, next.user);
  const isPostId = isEqual(prev.postId, next.postId);
  const isEqualComment = isEqual(prev.amountComment, next.amountComment);
  const isLike = isEqual(prev.Like, next.Like);
  const isType = isEqual(prev.type, next.type);
  return isSaved && isPostId && isEqualUser && isLike && isEqualComment && isType;
};

// eslint-disable-next-line react/display-name
const PostAction: React.FC<PostActionProps> = memo(props => {
  // Props
  const {
    user,
    saved,
    amountComment,
    Like,
    postId,
    onLike,
    onDisLike,
    onSaved,
    onUnSaved,
    onCreateComment,
  } = props;

  // Hooks
  const focusRef = useRef();

  // State
  const [like, setLike] = useState<number>(Like.length);
  const [isSaved, setSaved] = useState<boolean>(handleCheckUserExist(saved ?? [], user?.id ?? 1));
  const [isLiked, setIsLiked] = useState<boolean>(handleCheckUserExist(Like ?? [], user?.id ?? 1));
  const [comments, setComments] = useState<CommentObj[]>([]);

  // Handle
  const handleCreateComment = async (cmt: string) => {
    const newComment = {
      id: Math.random(),
      content: cmt,
      userId: user?.id,
      postId,
      replyId: null,
    };
    const res: any = await onCreateComment(newComment);
    if (res.status === 200)
      // @ts-ignore
      setComments(prev => [...prev, { ...newComment, user: user }]);

    // Fetch
  };
  //console.log('Props', props);
  const focusInputComment = () => {
    // @ts-ignore
    focusRef.current.focusCommentInput();
  };
  const handleReactPost = async () => {
    const res: any = isLiked ? await onDisLike() : await onLike();
    if (res.status === 200) {
      setLike(like => (isLiked ? like - 1 : like + 1));
      setIsLiked(!isLiked);
    }
  };
  const handleSaved = async () => {
    const res: any = isSaved ? await onUnSaved() : await onSaved();
    if (res.status === 200) {
      setSaved(!isSaved);
    }
  };

  return (
    <div>
      <div className="post-card-actions">
        <div className="flex flex-row justify-between cursor-pointer">
          {isLiked ? (
            <HeartFilledIcon
              width={25}
              height={25}
              color={'#FF0066'}
              className={'action-icon'}
              onClick={handleReactPost}
            />
          ) : (
            <HeartIcon width={25} height={25} className={'action-icon'} onClick={handleReactPost} />
          )}

          <PaperPlaneIcon width={25} height={25} className={'action-icon'} />
          <ChatBubbleIcon
            width={25}
            height={25}
            className={'action-icon'}
            onClick={focusInputComment}
          />
        </div>

        <div className="cursor-pointer" onClick={handleSaved}>
          {isSaved ? (
            <BookmarkFilledIcon
              width={25}
              color={'#1788ce'}
              height={25}
              className={'action-icon'}
            />
          ) : (
            <BookmarkIcon width={25} height={25} className={'action-icon'} />
          )}
        </div>
      </div>
      <div className="flex flex-col px-3 py-1">
        {like > 0 && (
          <div className="small-semibold">
            {like} like{like > 1 ? 's' : ''}
          </div>
        )}
      </div>
      <div className={''}>
        <div className={'flex-col'}>
          <Link href={`post/${postId}`} className={'text-gray-500 cursor-pointer base-regular'}>
            View {amountComment} comment{amountComment > 1 && 's'}
          </Link>
          {comments && comments.map(item => <CommentItem key={`cmt-${item.id}`} data={item} />)}
        </div>
        <FormComment ref={focusRef} onSubmit={handleCreateComment} />
      </div>
    </div>
  );
}, compareProps);

export default PostAction;
