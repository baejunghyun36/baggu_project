import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Chip from 'components/common/Chip';

const CarouselContainer = styled.div`
  position: relative;
  width: 500px;
  height: 300px;
  overflow: hidden;
`;

const CarouselInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform: translateX(-${props => props.translate}%);
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  rounded-full
`;

function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translate, setTranslate] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setTranslate((currentIndex - 1) * 100);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setTranslate((currentIndex + 1) * 100);
  };

  return (
    <CarouselContainer>
      <CarouselInner translate={translate}>
        {images.map((image, index) => (
          <ImageContainer
            key={index}
            style={{ width: `${100 / images.length}%` }}
          >
            <Image src={image} />
          </ImageContainer>
        ))}
      </CarouselInner>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </CarouselContainer>
  );
}

export default Carousel;
