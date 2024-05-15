'use client';
// Libraries
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useGetInfiniteFollows, useSearchFollow } from '@/queries/queries';
import useDebounce from '@/hooks/useDebounce';
import { useInView } from 'react-intersection-observer';
import SearchUser from '@/app/(home)/components/molecules/SearchUser';
import Loader from '@/components/atoms/Loader';
import { QUERY_KEYS } from '@/constrants/queries'; // Component

// Component

// Constraint

// Types

// Actions

interface DialogSearchProps {
  children: React.ReactNode;
  title: string;
  userId: number;
  type: string;
  queryKey: string;
}

const listUserSearch = [
  {
    id: 1,
    username: 'dh.baotrung',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
  {
    id: 2,
    username: 'dh.baotrung',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
  {
    id: 3,
    username: 'dh.baotrung',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
  {
    id: 4,
    username: 'dh.baotrung',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
  {
    id: 5,
    username: 'dh.baotrung',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
  {
    id: 6,
    username: 'dh.baotrung',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
  {
    id: 7,
    username: 'dh.baotrung',
    firstName: 'Trung',
    lastName: 'Nguyen Duc Minh',
    avatar:
      'https://firebasestorage.googleapis.com/v0/b/social-network-storage-f6ab6.appspot.com/o/1713982059299_3592.jpg?alt=media',
  },
];

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedUsers: any;
};
export const SearchResults = ({ isSearchFetching, searchedUsers }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedUsers && searchedUsers.length > 0) {
    return searchedUsers?.map((user: any) => (
      <SearchUser key={`user-search-x${user?.id}`} user={user} />
    ));
  } else {
    return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
  }
};

const DialogSearch: React.FC<DialogSearchProps> = props => {
  const {
    children,
    queryKey = QUERY_KEYS.GET_INFINITE_FOLLOWERS,
    title,
    userId,
    type = 'follower',
  } = props;
  // State
  const [searchValue, setSearchValue] = useState('');
  // Hooks
  const { ref, inView } = useInView();
  const {
    data: listUsers,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteFollows(queryKey, userId, type);
  const debouncedSearch = useDebounce(searchValue, 400);
  const { data: searchedUsers, isFetching: isSearchFetching } = useSearchFollow(
    debouncedSearch,
    userId,
    type,
  );

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  // Handle
  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts =
    !shouldShowSearchResults && listUsers?.pages.every(item => item.length === 0);

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px] p-0">
        <DialogHeader className={'border-b-1 border-gray-400 pt-3'}>
          <DialogTitle className={'flex-center h-8'}>{title}</DialogTitle>
        </DialogHeader>
        <Separator orientation={'horizontal'} />
        <div className="flex w-full flex-col px-2 pb-2 ">
          <div className={`flex p-2 w-full`}>
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className={'h-10 font-[14px] w-full'}
            />
          </div>
          <div
            className={`w-full h-[300px] max-h-[350px] flex  flex-col gap-3 overflow-auto px-4 pt-3`}
          >
            {shouldShowSearchResults ? (
              <SearchResults searchedUsers={searchedUsers} isSearchFetching={isSearchFetching} />
            ) : shouldShowPosts ? (
              <div className=" flex-center flex-col h-8 w-full" ref={ref}>
                <span className="flex-center small-regular italic">End of Users</span>
              </div>
            ) : (
              listUsers?.pages.map(page =>
                page.map((user: any) => (
                  <SearchUser key={`user-search-x${user?.id}`} user={user} />
                )),
              )
            )}

            {hasNextPage && !searchValue && (
              <div className=" flex-center flex-col h-8 w-full" ref={ref}>
                <span className="flex-center small-regular italic">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSearch;