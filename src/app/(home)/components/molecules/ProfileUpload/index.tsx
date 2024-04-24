// Libraries
import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { convertFileToUrl } from '@/_lib/utils';
import Image from 'next/image';
import { ProfileIcon } from '@/components/atoms/icons';


// Component

// Style

// Types

interface Props {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
  register?: any;
}

const ProfileUploader: React.FC<Props> = (props) => {
  const { fieldChange, mediaUrl, register } = props;
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg'],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className='cursor-pointer' />

      <div className='cursor-pointer flex-center gap-4'>
        {
          fileUrl ? <Image
            src={fileUrl}
            alt='image'
            width='100'
            height='100'
            className='h-24 w-24 rounded-full object-cover object-top'
          /> : <ProfileIcon />
        }

        <p className='text-primary-500 small-regular md:bbase-semibold'>
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default ProfileUploader;
