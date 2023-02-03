import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// {
//     "requestItemIdxList" : [1,2,3],
//     "requestUserIdx" : 1,
//     "comment" : "바꾸자"
// }

export const makeRequestStore = create(
  devtools(set => ({
    // state
    requestItemIdxList: [],
    requestUserIdx: '',
    comment: '',

    // action
    setRequestItemIdxList: list =>
      set(state => ({ ...state, requestItemIdxList: list })),
    addItem: itemIdx =>
      set(state => ({
        ...state,
        requestItemIdxList: state.requestItemIdxList.push(itemIdx),
      })),
    removeItem: itemIdx =>
      set(state => ({
        ...state,
        requestItemIdxList: state.requestItemIdxList.filter(x => x !== itemIdx),
      })),
    saveRequestUserIdx: userIdx =>
      set(state => ({ ...state, requestUserIdx: userIdx })),
    saveComment: comment => set(state => ({ ...state, comment: comment })),
  }))
);
