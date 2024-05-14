'use client';
// Libraries
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// Component
import { Textarea } from '@/components/ui/textarea';
import { EmotionIcon } from '@/components/atoms/icons';
import { useAppContext } from '@/store/app-provider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
// Style

// Types

interface Props {
  onSubmit: (comment: string) => void;
  className?: string;
}

// eslint-disable-next-line react/display-name
const FormComment: React.FC<Props> = (props, ref) => {
  const { className = '', onSubmit } = props;

  // State
  const [hasText, setHasText] = useState(false);
  const [comment, setComment] = useState<any>('');

  // Ref
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const { setRefCommentPost } = useAppContext();

  // Hooks
  useEffect(() => {
    if (inputRef !== null) setRefCommentPost(inputRef);
  }, [inputRef]);

  useImperativeHandle(
    ref,
    () => {
      return {
        focusCommentInput: focusTextArea,
      };
    },
    [],
  );

  // Functions
  const focusTextArea = () => {
    inputRef.current?.focus();
  };
  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     console.log('MouseDown:', event.target, 'picker:', pickerRef.current);
  //     // @ts-ignore
  //     if (pickerRef.current && !inputRef?.current?.contains(event.target)) {
  //       setIsPickerVisible(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const handleTextareaChange = () => {
    const textarea = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Đặt chiều cao về auto để tính lại chiều cao thực tế
      textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao là chiều cao thực tế
    }
  };

  // Handle pick emotion and insert to comment
  const handleEmojiPickup = (emoji: any) => {
    // console.log('Emoji', emoji);
    if (inputRef) {
      const cursorPosition = inputRef.current?.selectionStart || 0;
      // concat the emoji to the string
      //console.log('FormComment:', forwardedRef);
      const text = comment.slice(0, cursorPosition) + emoji.native + comment.slice(cursorPosition);
      setComment(text);
      const newCursorPosition = cursorPosition + emoji.native!.length;
      // allow to add multiple emojis in the same position of string
      setTimeout(() => {
        inputRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
      }, 10);
    }
  };

  // Create comment
  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(comment);
    // on Success
    setComment('');
    setHasText(false);
  };
  return (
    <div className={` my-5 ${className}`}>
      <div>
        <form onSubmit={handleSubmit} className={'flex flex-row'}>
          <Textarea
            ref={inputRef}
            placeholder={'Add your comment...'}
            id="messageInput"
            name={'content'}
            value={comment}
            onChange={event => {
              handleTextareaChange();
              setHasText(true);
              setComment(event.target.value);
            }}
            onKeyDown={event => event.key === 'Enter' && handleSubmit(event)}
            //ref={forwardedRef}
            rows={1}
            className={
              '!min-h-[45px] h-[45px] max-h-[80px] overflow-auto resize-none custom-scrollbar rounded-[3px]  flex items-center px-1  bg-secondary border-0 text-[15px] text-gray-400 !focus-visible:shadow-none'
            }
          />
          {hasText && (
            <div className={' flex justify-between items-center'}>
              <button
                type="submit"
                className={
                  'base-regular flex items-center justify-center px-2 text-blue-500 font-bold'
                }
              >
                Post
              </button>

              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <span>
                    <EmotionIcon
                      width={20}
                      height={20}
                      className={'cursor-pointer fill-pink-500'}
                    />
                  </span>
                </PopoverTrigger>
                <PopoverContent className={'w-full p-0'}>
                  <Picker
                    data={data}
                    //onSelect={handleEmojiPickup}
                    // onClick={f}
                    onEmojiSelect={handleEmojiPickup}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

// @ts-ignore
export default forwardRef(FormComment);
