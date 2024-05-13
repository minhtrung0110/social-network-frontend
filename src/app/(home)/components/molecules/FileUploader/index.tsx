'use client';
// Libraries
import React, { useCallback, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import Image from 'next/image';

// Component
import { Button } from '@/components/ui/button';
import { UploadIcon } from '@/components/atoms/icons';

// Utils
import { convertFileToUrl } from '@/utils/util';

// Types

interface Props {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
}

const FileUploader: React.FC<Props> = props => {
  const { fieldChange, mediaUrl } = props;
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
    <div
      {...getRootProps()}
      className="flex flex-center border-2  flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <Image
              src={fileUrl}
              width={100}
              height={100}
              alt="image"
              className="file_uploader-img"
            />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box ">
          <UploadIcon width={96} height={77} />

          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

          <Button type="button" className="shad-button_dark_4">
            Select from computer
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
