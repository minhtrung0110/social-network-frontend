// Libraries
import React from 'react';
import { SpinnerIcon } from '@/components/atoms/icons';

// Component

// Style

// Types

interface Props {
  size?: 's' | 'm' | 'l' | 'x' | 'xl';
}

const Loader: React.FC<Props> = (props) => {
  const { size } = props;
  const handleSize = (size: any) => {
    switch (size) {
      case 's':
        return 20;
      case 'm':
        return 28;
      case 'l':
        return 38;
      case 'x':
        return 48;
      case 'xl':
        return 60;
      default:
        return 80;
    }
  };
  return (
    <SpinnerIcon width={handleSize(size)} height={handleSize(size)} className='animate-spin ' />
  );
};

export default Loader;
Loader.defaultProps = {
  size: 's',
};
