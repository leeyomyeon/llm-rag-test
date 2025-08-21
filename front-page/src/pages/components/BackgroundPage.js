import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BackgroundPage = ({ children }) => {
  return (
    <Background>
      {children}
    </Background>
  );
}

export default BackgroundPage;