import { create } from 'zustand';

type State = {
  count: number;
  sessionToken: string;
};

type Actions = {
  increment: (qty: number) => void;
  decrement: (qty: number) => void;
};

const useCountStore = create<State & Actions>(set => ({
  count: 0,
  sessionToken: '',
  increment: (qty: number) => set(state => ({ count: state.count + qty })),
  decrement: (qty: number) => set(state => ({ count: state.count - qty })),
}));
