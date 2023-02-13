import React from 'react';

// twin.macro
import tw, { styled } from 'twin.macro';

// Styled Component
const PreviewContainer = styled.div`
  ${tw`flex gap-1`}
`;

const PreviewImg = styled.img`
  ${tw`rounded-lg w-7 h-7`}
`;

const DeleteBtn = styled.div`
  ${tw`fill-primary absolute w-2 h-2 right-[4px] top-[4px]`}
`;

// Main Component
function Preview({ itemImages, onDelete }) {
  return (
    <PreviewContainer id="preview">
      {itemImages.map((itemImage, index) => (
        <div key={index} className="relative">
          <DeleteBtn onClick={() => onDelete(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
            </svg>
          </DeleteBtn>
          <PreviewImg
            src={URL.createObjectURL(itemImage)}
            alt={itemImage.name}
          />
        </div>
      ))}
    </PreviewContainer>
  );
}

export default Preview;
