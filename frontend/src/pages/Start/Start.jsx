import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

// component
import { Outlet } from 'react-router-dom';

const StyledStartPage = styled.div.attrs({
  id: 'startpage',
})`
  ${tw`flex flex-col items-center h-screen w-screen`}

  & {
    div {
      ${tw`flex`}
    }
  }
`;

function Start() {
  return (
    <StyledStartPage>
      <Outlet />
    </StyledStartPage>
  );
}

export default Start;
