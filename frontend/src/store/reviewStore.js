import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/*
< 유저 리뷰 작성할 때 보낼 데이터>
{
	"userIdx": "14",
	"reviewTagTypes" : ["TYPE0","TYPE1"]
}

< 거래 리뷰 작성할 때 보낼 데이터>
{
	"targetItemIdx" : 13,
	"writeUserIdx" : 3,
	"reviewText" : "좋아요~"
}
*/
export const reviewStore = create(
  devtools(set => ({
    yourIdx: '',
    yourNickname: '',
    targetItemIdx: '',
    writeUserIdx: '',
    reviewText: '',
    roomId: '',

    saveYourIdx: yourIdx => set(state => ({ yourIdx: yourIdx })),
    saveYourNickname: yourNickname =>
      set(state => ({ yourNickname: yourNickname })),
    saveTargetItemIdx: targetItemIdx =>
      set(state => ({ targetItemIdx: targetItemIdx })),
    saveWriteUserIdx: writeUserIdx =>
      set(state => ({ writeUserIdx: writeUserIdx })),
    saveReviewText: reviewText => set(state => ({ reviewText: reviewText })),
    saveRoomId: roomId => set(state => ({ roomId: roomId })),
  }))
);
