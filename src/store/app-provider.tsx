'use client';
import React, { createContext, useContext, useState } from 'react';
import { AccountResType, FullUser } from '@/schema/user.schema';

type User = AccountResType['data'];

interface PostState {
  comment_ref: HTMLElement | null;
  comment_reply: number | string | null;
}

interface AppContextType {
  user: FullUser | null;
  sessionToken: string | null;
  setSessionToken: (token: string | null) => void;
  setRefCommentPost: (ref: React.MutableRefObject<HTMLTextAreaElement | null>) => void;
  setReplyCommentPost: (id: number | null) => void;
  setUser: (user: FullUser | null) => void;
  postState: PostState;
}

const AppContext = createContext<AppContextType>({
  user: null,
  sessionToken: null,
  postState: {
    comment_ref: null,
    comment_reply: null,
  },
  setUser: () => {},
  setRefCommentPost: () => {},
  setReplyCommentPost: () => {},
  setSessionToken: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppProvider({
  children,
  initialSessionToken = '',
  user: userProp,
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
  user: User | null;
}) {
  const [user, setUser] = useState<User | null>(userProp);
  const [sessionToken, setSessionToken] = useState<string | null>(initialSessionToken);
  // const [commentRef,setCommentRef] = useState<HTMLElement|null>(null);
  // const [replyComment,setReplyComment] = useState<number>(null)
  const [postState, setPostState] = useState<PostState>({ comment_ref: null, comment_reply: null });
  //console.log(AppContext);

  const setRefCommentPost = (ref: HTMLTextAreaElement | null) => {
    setPostState(prevState => ({
      ...prevState,
      comment_ref: ref,
    }));
  };

  const setReplyCommentPost = (id: number | null) => {
    setPostState(prevState => ({
      ...prevState,
      comment_reply: id,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        sessionToken,
        setSessionToken,
        setRefCommentPost,
        setReplyCommentPost,
        setUser,
        postState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
