// Libraries
import React from 'react';
import { cookies } from 'next/headers';

// Component
import HeaderPostDetail from '@/app/(home)/post/components/molecules/HeaderPostDetail';
import { DetailPostCard } from '@/app/(home)/components/organisms/DetailPostCard';
import PostRelated from '@/app/(home)/post/components/organisms/PostReleted';

// Api
import postApiRequest from '@/api/post';

// Types


interface Props {
  params: { id: string };
}

const PostDetailPage: React.FC<Props> = async (props) => {
  const { id } = props.params;
  const cookie = cookies();
  const res = await postApiRequest.getById(id, cookie.get('sessionToken')?.value ?? '');
  const postDetail = res.data;
  const { data: listPost } = await postApiRequest.getCompactByCondition({
    userId: postDetail.user.id,
    compact: true,
  }, cookie.get('sessionToken')?.value ?? '');
  const listPostRelated = listPost.filter((p: any) => p.id !== postDetail.id);

  return (
    <div className='post_details-container'>
      <HeaderPostDetail />
      <DetailPostCard post={postDetail} />
      {
        listPostRelated.length > 0 && <PostRelated data={listPostRelated} />
      }

    </div>
  );
};

export default PostDetailPage;

