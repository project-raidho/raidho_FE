import React, { useEffect } from 'react';
import styled from 'styled-components';
import Routers from './shared/Router';

function App() {
  // ::: Dark & Light 기능구현
  useEffect(() => {
    const bgMode = window.localStorage.getItem('bgMode');

    if (bgMode === 'dark') {
      document.getElementsByTagName('html')[0].classList.add('darkMode');
    }
  }, []);

  const darkOnOff = () => {
    if (typeof window !== 'undefined') {
      if (document.getElementsByTagName('html')[0].classList.contains('darkMode')) {
        document.getElementsByTagName('html')[0].classList.remove('darkMode');
        window.localStorage.setItem('bgMode', 'light');
      } else {
        document.getElementsByTagName('html')[0].classList.add('darkMode');
        window.localStorage.setItem('bgMode', 'dark');
      }
    }
  };
  return (
    <>
      <StButtonDarkMode onClick={darkOnOff}>darkMode On / Off</StButtonDarkMode>
      <Routers />
    </>
  );
}

export default App;

const StButtonDarkMode = styled.button`
  position: absolute;
  top: 50px;
  left: 50px;
`;
