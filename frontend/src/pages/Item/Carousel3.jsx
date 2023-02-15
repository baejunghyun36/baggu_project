import React, { useState } from 'react';
import tw, { styled, css } from 'twin.macro';

// Styled Component
const Window = styled.div`
  ${tw`overflow-hidden w-full h-[300px] relative`}
`;

const Slider = styled.div`
  ${tw`h-full flex`}
  ${props => css`
    transition: all 0.3s ease-out;
    transform: translateX(-${props.index}00%);
  `}
`;

const Slide = styled.div`
  ${tw`w-full h-full bg-contain bg-no-repeat bg-center flex-none border-1`}
  ${props =>
    css`
      background-image: url(${props.imgUrl});
    `}
`;

const Button = styled.div`
  ${tw`absolute w-2 h-2 z-10 cursor-pointer fill-secondary opacity-60`}
  ${css`
    top: calc(50% - 16px);
  `}
  ${props => (props.type === 'left' ? tw`left-3` : tw`right-3`)}
  ${props => (props.cnt < 2 ? tw`hidden` : '')}
`;

// Main Component
const Carousel3 = ({ imgUrls }) => {
  // 슬라이드 이동
  const [currentIndex, setCurrentIndex] = useState(0);

  const NextHandler = () => {
    setCurrentIndex(prev => {
      if (currentIndex !== imgUrls.length - 1) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  const PrevHandler = () => {
    setCurrentIndex(prev => {
      if (currentIndex !== 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };
  return (
    <Window id="window">
      <Button type="left" onClick={PrevHandler} cnt={imgUrls.length}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      </Button>
      <Button type="right" onClick={NextHandler} cnt={imgUrls.length}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
          <path d="M246.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 41.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
        </svg>
      </Button>
      <Slider id="slider" index={currentIndex}>
        {imgUrls
          ? imgUrls.map((url, index) => <Slide key={index} imgUrl={url} />)
          : ''}
      </Slider>
    </Window>
  );
};

export default Carousel3;
