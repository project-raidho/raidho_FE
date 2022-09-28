import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../elements/Button";

const ThemeSelect = ({ theme, setTheme }) => {
  let [btnActive, setBtnActive] = useState(theme);

  const themeList = [
    "국내",
    "유럽",
    "아메리카",
    "아시아",
    "오세아니아",
    "아프리카",
  ];
  const toggleActive = (e) => {
    setTheme(e.target.value);
    setBtnActive(e.target.value);
  };

  return (
    <StThemeSelectBox>
      {themeList.map((theme, index) => {
        return (
          <StButton
            value={theme}
            size="large"
            variant={theme === btnActive ? "primary" : "lineGray"}
            key={index}
            onClick={toggleActive}
            themeImage={theme}
            className="themeName"
          >
            {theme}
          </StButton>
        );
      })}
    </StThemeSelectBox>
  );
};

export default ThemeSelect;

const StThemeSelectBox = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;

  @media (max-width: 767px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .themeName {
      width: 90px;
      margin-bottom: 15px;
    }
    button {
      height: 30px;
    }
  }
  .themeName {
    font-size: 1rem;
    font-weight: 800;
  }
`;

const StButton = styled(Button)`
  margin-right: 20px;
  border-radius: 15px;

  /* width: 300px; */
  /* background-image:URL(${(props) => props.themeImage}); 
    background-size: cover; */
`;
