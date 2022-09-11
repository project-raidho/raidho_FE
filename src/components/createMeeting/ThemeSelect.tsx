import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

import Button from '../../elements/Button';

interface ITeme {
  setTheme: Dispatch<SetStateAction<string>>;
}

function ThemeSelect({ setTheme }: ITeme) {
  const [btnActive, setBtnActive] = useState('');
  const themeList = ['국내', '유럽', '아시아', '아메리카', '아프리카', '오세아니아'];

  const toggleActive = (theme: string) => {
    console.log(theme);
    setTheme(theme);
    setBtnActive(theme);
  };

  return (
    <StThemeSelectBox>
      {themeList.map((theme) => {
        return (
          <StButton
            size="small"
            variant={theme === btnActive ? 'primary' : 'gray'}
            key={theme}
            onClick={() => {
              toggleActive(theme);
            }}
          >
            {theme}
          </StButton>
        );
      })}
    </StThemeSelectBox>
  );
}

export default ThemeSelect;

const StThemeSelectBox = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
`;

const StButton = styled(Button)`
  margin-right: 20px;
  width: '100px';
`;
