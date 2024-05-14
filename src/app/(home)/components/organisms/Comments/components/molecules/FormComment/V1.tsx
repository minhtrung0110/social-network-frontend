'use client';
// Libraries
import React, { useEffect, useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// Component
import { Textarea } from '@/components/ui/textarea';
import { EmotionIcon } from '@/components/atoms/icons';
import { EmotionWrapper } from '@/app/(home)/components/organisms/Comments/style';

// Config
import { useAppContext } from '@/store/app-provider';

// Types

interface Props {
  onSubmit: (comment: string) => void;
  forwardedRef?: HTMLElement | null;
  className?: string;
}

// eslint-disable-next-line react/display-name
const FormComment: React.FC<Props> = props => {
  const { className = '', forwardedRef = null, onSubmit } = props;
  console.log('Props Post Card: ', forwardedRef);
  // State
  const [hasText, setHasText] = useState(false);
  const [comment, setComment] = useState<any>('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const inputRef = useRef(null);
  const { setRefCommentPost, setReplyCommentPost } = useAppContext();

  // Ref
  const pickerRef = useRef(null);
  //const inputRef = useRef<HTMLInputElement>(null);

  // Handle
  useEffect(() => {
    if (forwardedRef === null && inputRef !== null) setRefCommentPost(inputRef);
  }, [inputRef]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (pickerRef.current && !pickerRef?.current?.contains(event.target)) {
        setIsPickerVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEmotionIconClick = () => {
    setIsPickerVisible(prevShowPicker => !prevShowPicker);
  };
  const handleTextareaChange = () => {
    const textarea: any = inputRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Đặt chiều cao về auto để tính lại chiều cao thực tế
      textarea.style.height = `${textarea.scrollHeight}px`; // Đặt chiều cao là chiều cao thực tế
    }
  };

  // Handle pick emotion and insert to comment

  const handleEmojiPickup = (emoji: any) => {
    console.log('Emoji', emoji, inputRef);
    const pickerInputRef = forwardedRef === null ? inputRef : forwardedRef;
    if (pickerInputRef) {
      const cursorPosition = pickerInputRef?.current?.selectionStart || 0;
      // concat the emoji to the string
      //console.log('FormComment:', forwardedRef);
      const text = comment.slice(0, cursorPosition) + emoji.native + comment.slice(cursorPosition);
      setComment(text);
      console.log('FormComment Text:', text);
      const newCursorPosition = cursorPosition + emoji.native!.length;
      // allow to add multiple emojis in the same position of string
      setTimeout(() => {
        pickerInputRef?.current?.setSelectionRange(newCursorPosition, newCursorPosition);
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
            ref={forwardedRef === null ? inputRef : forwardedRef} //
            placeholder={'Add your comment...'}
            id={`messageInput-${Math.random() * 1000}`}
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
            <div className={'relative flex justify-between items-center'}>
              <button
                type="submit"
                className={
                  ' base-regular flex items-center justify-center px-2 text-blue-500 cursor-pointer font-bold'
                }
              >
                Post
              </button>
              <EmotionIcon
                width={20}
                height={20}
                className={'cursor-pointer fill-pink-500'}
                onClick={handleEmotionIconClick}
              />
              {isPickerVisible && (
                <EmotionWrapper>
                  <div ref={pickerRef}>
                    <Picker
                      data={data}
                      onSelect={handleEmojiPickup}
                      onClick={() => inputRef.current?.focus()}
                      onEmojiSelect={handleEmojiPickup}
                    />
                  </div>
                </EmotionWrapper>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormComment;
