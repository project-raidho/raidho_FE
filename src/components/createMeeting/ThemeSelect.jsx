import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';
import { useSelector } from 'react-redux';

const ThemeSelect = ({ setTheme }) => {

    let [btnActive, setBtnActive] = useState("");
    // const themeList = ['자전거', '등산', '힐링','바다'];
    const themeList = useSelector((state) => state.themeSlice.themeList);

    const toggleActive = (e) => {

        setTheme(e.target.value)
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
                        size="small"
                        variant={(theme.themeName === btnActive ? "primary" : "gray")}
                        key={index}
                        onClick={toggleActive}
                        themeImage={theme.themeImage}

                    >
                        {theme.themeName}
                    </StButton>
                )
            })}

        </StThemeSelectBox>
    )
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
    width:"100px";
    /* background-image:URL(${props => props.themeImage}); 
    background-size: cover; */
`

