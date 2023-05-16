import React from 'react';
import styled from 'styled-components';

export default function BackgroundImage({ children }) {
  return <BgImg>{children}</BgImg>;
}

const BgImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  line-height: 0;
  background-image: url(/images/background.png);
`;
