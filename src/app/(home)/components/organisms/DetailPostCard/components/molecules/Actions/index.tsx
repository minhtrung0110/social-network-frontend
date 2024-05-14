'use client';
// Libraries
import React, { memo, useEffect, useState } from 'react';
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  HeartFilledIcon,
  PaperPlaneIcon,
} from '@radix-ui/react-icons';
import { isEqual } from 'lodash';

// Component
import Loader from '@/components/atoms/Loader';
import { HeartIcon } from '@/components/atoms/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FormComment from '@/app/(home)/components/organisms/Comments/components/molecules/FormComment/FormComment';
import { SRTooltip } from '@/components/molecules/Tooltip';

// Utils
import { handleCheckUserExist } from '@/utils/util';

// Types
import { Like } from '@/schema/like.schema';
import { FullUser } from '@/schema/user.schema';
import { SavedCompact } from '@/schema/saved.scheme';
import { useAppContext } from '@/store/app-provider';

interface Props {
  totalLikes: Like[];
  saved: SavedCompact[];
  currentUser: FullUser | null;
  onLike: any;
  onUnLike: any;
  onCreateComment: any;
  onSavedPost: any;
  onUnsavedPost: any;
}

const compareProps = (prev: any, next: any) => {
  const isSaved = isEqual(prev.saved, next.saved);
  const isTotalLikes = isEqual(prev.totalLikes, next.totalLikes);
  const isCurrentUser = isEqual(prev.currentUser, next.currentUser);

  return isSaved && isTotalLikes && isCurrentUser;
};
// eslint-disable-next-line react/display-name
const Actions: React.FC<Props> = memo(props => {
  const {
    totalLikes,
    saved,
    currentUser: user,
    onUnLike,
    onLike,
    onCreateComment,
    onSavedPost,
    onUnsavedPost,
  } = props;
  //State
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Hooks
  const { postState, setReplyCommentPost } = useAppContext();
  useEffect(() => {
    setIsLiked(handleCheckUserExist(totalLikes ?? [], user?.id ?? 1));
  }, [totalLikes]);
  useEffect(() => {
    setIsSaved(handleCheckUserExist(saved ?? [], user?.id ?? 1));
  }, [saved]);

  const handleCreateComment = (comment: string) => {
    onCreateComment(comment, postState.comment_reply);
    setReplyCommentPost(null);
  };
  const focusInputComment = () => {
    // @ts-ignore
    postState.comment_ref.current.focus();
  };

  const handleSaved = () => {
    const res = isSaved ? onUnsavedPost() : onSavedPost();
    setIsSaved(!isSaved);
  };

  return (
    <div
      className={
        'px-5 border-t border-dark-4/80"  py-3 absolute bottom-0 right-0 left-0 bg-secondary rounded-br-sm'
      }
    >
      <div className="post-card-actions">
        <div className="flex flex-row justify-between cursor-pointer">
          <SRTooltip title={`${isLiked ? 'Disliked Post' : 'Like Post'}`}>
            {isLiked ? (
              <HeartFilledIcon
                width={25}
                height={25}
                color={'#FF0066'}
                className={'action-icon'}
                onClick={onUnLike}
              />
            ) : (
              <HeartIcon width={25} height={25} className={'action-icon'} onClick={onLike} />
            )}
          </SRTooltip>
          <SRTooltip title={`Send this post`}>
            <PaperPlaneIcon width={25} height={25} className={'action-icon'} />
          </SRTooltip>

          <SRTooltip title={`Comment`}>
            <ChatBubbleIcon
              width={25}
              height={25}
              className={'action-icon'}
              onClick={focusInputComment}
            />
          </SRTooltip>
        </div>

        <div className="cursor-pointer" onClick={handleSaved}>
          <SRTooltip title={`${isSaved ? 'UnSaved Post' : 'Saved Post'}`}>
            {isSaved ? (
              <BookmarkFilledIcon
                width={25}
                height={25}
                color={'#3684dc'}
                className={'action-icon'}
              />
            ) : (
              <BookmarkIcon width={25} height={25} className={'action-icon'} />
            )}
          </SRTooltip>
        </div>
      </div>
      <div className="flex flex-col px-3 py-1">
        <div className="small-semibold flex flex-row">
          {!totalLikes ? <Loader size={'xs'} /> : totalLikes?.length}
          <span className={'ml-1'}> like{totalLikes?.length > 1 ? 's' : ''}</span>
        </div>
      </div>
      <div className={'flex items-center flex-row '}>
        <Avatar className={`'w-4 h-4'}`}>
          <AvatarImage width={'32px'} height={'32px'} src={user?.avatar ?? ''} alt="@user" />
          <AvatarFallback>{user?.firstName?.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <FormComment
          className={'w-full !mb-0 mt-1 bg-secondary border-0 ml-2 bottom-0 right-0'}
          onSubmit={handleCreateComment}
        />
      </div>
    </div>
  );
}, compareProps);

export default Actions;