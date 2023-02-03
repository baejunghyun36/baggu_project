import React from 'react';

function Preview({ itemImages, onDelete }) {
  return (
    <div>
      {itemImages.map((itemImage, index) => (
        <div key={index}>
          <img
            src={URL.createObjectURL(itemImage)}
            alt={itemImage.name}
            className="w-[40px] h-[40px]"
          />
          <button onClick={() => onDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Preview;
