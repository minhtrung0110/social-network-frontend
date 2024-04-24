import { create } from 'zustand';
import { UserAuth } from '@/types/user';

type State = {
  count: number;
  sessionToken: string;
  user: UserAuth | undefined;
};

type Actions = {
  setUser: (user: UserAuth) => void;
  setSessionToken: (token: string) => void;
};

export const useGlobalState = create<State & Actions>(set => ({
  count: 0,
  sessionToken: '',
  user: undefined,
  setUser: (user: UserAuth) => set(() => ({ user: user })),
  setSessionToken: (token: string) => set(() => ({ sessionToken: token })),
}));
