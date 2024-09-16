'use client';
// Libraries
import React, { useState } from 'react';
import { isEmpty } from 'lodash';

// Components
import ExtraDialog from '@/components/molecules/ExtraDialog';
import ListSearchUserSkeleton from '@/components/molecules/skeleton/ListSearchUser';
import SearchUser from '@/app/(home)/components/molecules/SearchUser';
import InputSearch from '@/components/molecules/InputSearch';

// Query
import { useSearchUsers } from '@/queries/queries';

export type ListUserSearchProps = {
  isSearchFetching: boolean;
  searchedUsers: any;
};
export const ListUserSearch = ({ isSearchFetching = true, searchedUsers }: ListUserSearchProps) => {
  if (isSearchFetching) {
    return <ListSearchUserSkeleton />;
  } else if (searchedUsers && searchedUsers.length > 0) {
    return searchedUsers?.map((user: any) => (
      <SearchUser
        type={'user'}
        key={`user-search-x${user?.id}`}
        user={user}
        className={'hover:bg-muted rounded-md p-2'}
      />
    ));
  } else if (isEmpty(searchedUsers)) {
    return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
  }
};

interface SearchBoxProps {
  children: React.ReactNode;
}

const SearchBox: React.FC<SearchBoxProps> = props => {
  const { children } = props;
  // State
  const [searchTerm, setSearchTerm] = useState('');

  // Hooks
  const { data: searchUsers, isFetching: isSearchFetching } = useSearchUsers(searchTerm);

  // Handle

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <ExtraDialog
      title={'Search'}
      side={'left'}
      className={'left-[220px] bg-secondary md:w-[400px] rounded-r-[16px]'}
      content={
        <div className=" py-4 h-full  w-full border-t border-gray-500 ">
          <div className="flex-center">
            <InputSearch
              placeholder={'Search...'}
              className={'h-12 w-full '}
              isLoading={isSearchFetching}
              onSearch={handleSearch}
            />
          </div>
          <div
            className={`w-full h-[300px] max-h-[390px] flex  flex-col gap-1  overflow-auto mt-4`}
          >
            <ListUserSearch searchedUsers={searchUsers} isSearchFetching={isSearchFetching} />

            {/*{hasNextPage && !searchValue && (*/}
            {/*  <div className=" flex-center flex-col h-8 w-full" ref={ref}>*/}
            {/*    <span className="flex-center small-regular italic">Loading...</span>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        </div>
      }
    >
      {children}
    </ExtraDialog>
  );
};

export default SearchBox;