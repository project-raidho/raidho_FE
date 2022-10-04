import React, { SetStateAction, useState } from "react";
import styled from "styled-components";

import Button from "../../elements/Button";

const ThemeSelect = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: React.Dispatch<SetStateAction<string>>;
}) => {
  let [btnActive, setBtnActive] = useState(theme);

  const themeList = [
    "국내",
    "유럽",
    "아메리카",
    "아시아",
    "오세아니아",
    "아프리카",
  ];
  const toggleActive = (theme: string) => {
    setTheme(theme);
    setBtnActive(theme);
  };

  return (
    <StThemeSelect>
      {themeList.map((theme, index) => {
        return (
          <StButton
            size="medium"
            value={theme}
            variant={theme === btnActive ? "primary" : "lineGray"}
            key={index}
            onClick={() => toggleActive(theme)}
          >
            {theme}
          </StButton>
        );
      })}
    </StThemeSelect>
  );
};

export default ThemeSelect;

const StThemeSelect = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;

  @media ${(props) => props.theme.mobile} {
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    button {
      width: 90px;
      margin-bottom: 15px;
      height: 30px;
    }
  }
  button {
    font-size: 1rem;
    font-weight: 800;
  }
`;

const StButton = styled(Button)`
  margin-right: 20px;
  border-radius: 15px;
`;
