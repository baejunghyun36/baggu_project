import { styled } from '@tanstack/react-query-devtools/build/lib/utils';
import React from 'react';
import tw from 'twin.macro';
import default_avatar from '../../assets/images/avatar_1x.png';

const Container = styled.div`
  ${tw`rounded-full overflow-hidden w-6 h-6 flex object-cover object-center`}

  & {
    img {
      ${tw`w-full h-full`}
    }
  }
`;

function Avatar({ imgURL }) {
  return (
    <Container>
      <img src={imgURL} alt="user profile image" />
    </Container>
  );
}

export default Avatar;
