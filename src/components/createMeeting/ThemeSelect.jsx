import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../elements/Button";
import { useSelector } from "react-redux";

const ThemeSelect = ({ setTheme }) => {
  let [btnActive, setBtnActive] = useState("");

  const themeList = useSelector((state) => state.themeSlice.themeList);
  //   const themeList = [
  //     "국내",
  //     "유럽",
  //     "아시아",
  //     "아메리카",
  //     "아프리카",
  //     "오세아니아",
  //   ];
  const toggleActive = (e) => {
    setTheme(e.target.value);
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

  return (
    <StThemeSelectBox>
      {themeList.map((theme, index) => {
        return (
          <StButton
            value={theme.themeName}
            size="large"
            variant={theme.themeName === btnActive ? "primary" : "gray"}
            key={index}
            onClick={toggleActive}
            themeImage={theme.themeImage}
          >
            {theme.themeName}
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
`;

const StButton = styled(Button)`
  margin-right: 20px;
  font-size: 13px;
  width: 300px;
  /* background-image:URL(${(props) => props.themeImage}); 
    background-size: cover; */
`;
