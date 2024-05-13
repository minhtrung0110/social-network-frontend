'use client';
// Libraries
import React from 'react';
import { useAppContext } from '@/store/app-provider';
import Creator from '@/app/(home)/components/molecules/Creator';
import { createFollow } from '@/actions/follow';
import { handleCheckUserExist } from '@/utils/util';

// Component

// Style

// Types

interface Props {
  data: any;
}

const TopCreator: React.FC<Props> = props => {
  const { data } = props;
  // Hooks
  const { user: currentUser } = useAppContext();
  console.log('TopCreat', currentUser);
  const listCreators = data.filter((u: any) => u.id !== currentUser?.id);
  const handleFollow = (id: number) => {
    return createFollow(currentUser?.id ?? 1, id);
  };

  return (
    <div className="list-creators">
      <h3 className="h3-bold text-light-1 my-1">Top Creators</h3>
      <ul className="flex flex-col gap-6">
        {listCreators?.map((creator: any) => (
          <li key={creator?.id}>
            <Creator
              user={creator}
              followed={handleCheckUserExist(currentUser?.following, creator.id, 'followId')}
              onFollow={() => handleFollow(creator?.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopCreator;