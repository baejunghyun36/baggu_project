import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useBagguStore = create(set => ({
  nickname: '',
  town: '',
  categories: [],
}));

const useStore = create(devtools(useBagguStore));

export default useStore;
