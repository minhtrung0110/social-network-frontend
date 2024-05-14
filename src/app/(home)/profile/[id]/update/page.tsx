// Libraries
import React, { Suspense } from 'react';
import { EditIcon } from '@/components/atoms/icons';

import { cookies } from 'next/headers';
import userApiRequest from '@/api/user';
import Loader from '@/components/atoms/Loader';
import FormProfile from '../../components/organisms/FormProfile';

// Component

// Style

// Types


interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const Page: React.FC<Props> = async (props) => {
  const { id } = props.params;
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const res = await userApiRequest.getUserById(id, sessionToken?.value ?? '');
  const currentUser = res.data;
  if (!currentUser)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    );


  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='flex-start gap-3 justify-start w-full max-w-5xl'>

          <EditIcon width={36} height={36} alt='edit' className='invert-white' />
          <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
        </div>
        <Suspense fallback={<Loader />}>
          <FormProfile profile={currentUser} />
        </Suspense>


      </div>
    </div>
  );
};

export default Page;