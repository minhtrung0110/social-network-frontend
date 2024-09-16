import Loader from '@/components/atoms/Loader';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Cross1Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import useDebounce from '@/hooks/useDebounce';

export interface InputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading: boolean;
  onSearch: any;
}

// eslint-disable-next-line react/display-name
const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  ({ className, isLoading = false, onSearch, type, ...props }, ref) => {
    // State
    const [isFocused, setIsFocused] = useState<boolean>(false);
    //const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    console.log(isLoading);
    // Hooks
    const debouncedSearch = useDebounce(value, 500);
    useEffect(() => {
      onSearch(value);
    }, [debouncedSearch]);
    return (
      <label className="relative block w-full font-[14px]">
        {!isFocused && (
          <span className="absolute  inset-y-0 left-0 flex items-center pl-3 text-gray-500 z-10">
            <MagnifyingGlassIcon />
          </span>
        )}
        <Input
          type={type}
          className={`px-8 ${className}`}
          ref={ref}
          {...props}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(!!value)}
        />
        <span className="absolute cursor-pointer  inset-y-0 right-0 flex items-center pr-3 text-gray-500 z-10">
          {isLoading ? (
            <span className="">
              <Loader />
            </span>
          ) : (
            <span
              className={`${!!value ? '' : '!hidden'} cursor-pointer flex-center bg-gray-200 rounded-full p-1 w-[20px] h-[20px]`}
              onClick={() => setValue('')}
            >
              <Cross1Icon />
            </span>
          )}
        </span>
      </label>
    );
  },
);

export default InputSearch;
