import React from 'react';
import upload_icon from '../../assets/icons/upload-Icon.png';

function ImageAddButton({ clickFunction }) {
  return (
    <div className="flex flex-col">
      <img
        src={upload_icon}
        alt="upload_image_button"
        className="w-7 h-7"
        onClick={clickFunction}
      />
    </div>
  );
}

export default ImageAddButton;
