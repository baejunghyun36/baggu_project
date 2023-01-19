import React from 'react';
import { useState } from 'react';
import TabBarItem from './TabBarItem';

function TabBar({ tabNames }) {
  const [index, setIndex] = useState(0);

  //   const onClickHandler = id => {
  //     setIndex(id);
  //     console.log(id);
  //   };
  const changeTabHandler = id => {
    setIndex(id);
  };

  return (
    <div className="h-[60px] px-2 flex">
      {tabNames.map((tabName, id) => (
        <div onClick={() => changeTabHandler(id)} key={id} className="w-full">
          <TabBarItem
            tabName={tabName}
            className={index === id ? 'active' : null}
          />
        </div>
      ))}
    </div>
  );
}

export default TabBar;
