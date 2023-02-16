import React from 'react';
import OfferImgListItem from './OfferImgListItem';

function OfferImgList({
  requestItemList,
  checkShow,
  selected,
  setSelected,
  selectedIdx,
  setSelectedIdx,
  setTradeDetailIdx,
}) {
  // const [selected, setSelected] = useState(false);
  return (
    <div>
      <div className="p-2 flex w-full justify-center hover:bg-primary-hover border-b gap-2 relative">
        {requestItemList.map(requestItem => (
          <div key={requestItem.requestItemIdx}>
            <OfferImgListItem
              requestItemIdx={requestItem.requestItemIdx}
              requestItemFirstImg={requestItem.requestItemFirstImg}
              checkShow={checkShow}
              selected={selected}
              setSelected={setSelected}
              selectedIdx={selectedIdx}
              setSelectedIdx={setSelectedIdx}
              tradeDetailIdx={requestItem.tradeDetailIdx}
              setTradeDetailIdx={setTradeDetailIdx}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferImgList;
