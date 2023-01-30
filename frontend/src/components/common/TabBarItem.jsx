import React from 'react';
import { useState, useEffect } from 'react';

function TabBarItem({ tabName, className }) {
  // 해당 탭을 눌렀을 경우 isActive = true
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (className === 'active') {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [className]);

  return (
    <div
      className={`${
        isActive ? 'border-b-2 border-primary ' : ' '
      }h-full flex items-center justify-center gap-2 w-full`}
    >
      <span
        className={`${
          isActive ? 'text-main-bold text-primary' : 'text-main text-grey3'
        } text-main`}
      >
        {tabName}
      </span>
    </div>
  );
}

export default TabBarItem;
