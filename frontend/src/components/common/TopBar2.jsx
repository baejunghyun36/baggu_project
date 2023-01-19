import React from 'react';
import { useNavigate } from 'react-router-dom';

// icon
import arrow_back from '../../assets/icons/arrow_back.svg';
import check from '../../assets/icons/check.svg';

function TopBar2({ pageTitle }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      id="top-bar-2"
      className="flex justify-between items-center p-2 border-b border-grey1 h-[60px] w-full"
    >
      <img src={arrow_back} alt="button to go back" onClick={handleGoBack} />
      <h3>{pageTitle}</h3>

      <img src={check} alt="button to confirm" className="opacity-0" />
    </div>
  );
}

export default TopBar2;
