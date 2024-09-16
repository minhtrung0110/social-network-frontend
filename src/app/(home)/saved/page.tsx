'use client';
// Libraries
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGetInfiniteComments } from '@/queries/queries';
import InputSearch from '@/components/molecules/InputSearch';

// Component

// Style

// Types

interface Props {
  // Define your component's props here
}

const Page: React.FC<Props> = props => {
  const callAPI = async () => {
    const res = await fetch(`http://localhost:8888/api/v1/post`, {
      cache: 'no-store',
      credentials: 'include',
    });
  };
  const { data: posts, fetchNextPage, hasNextPage } = useGetInfiniteComments(4);

  console.log('Cheking infinity:', posts);
  const [isLoading, setIsLoading] = useState(false);
  const handleSearch = (value: string) => {
    console.log('Searching:', value);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  return (
    <div className={'flex w-full flex-col '}>
      <Button onClick={() => fetchNextPage()}>Call APi</Button>
      <div className={'flex-center w-[400px] h-full p-2 '}>
        <InputSearch
          placeholder={'Search...'}
          className={'h-12 w-full '}
          isLoading={isLoading}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Page;