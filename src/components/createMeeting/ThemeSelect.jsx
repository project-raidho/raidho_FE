import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../elements/Button';

const ThemeSelect = ({setTheme}) => {
 
    let [btnActive, setBtnActive] = useState("");
    const themeList = ['자전거', '등산', '힐링','바다'];

    const toggleActive = (e) => {
      
        setTheme(e.target.value)
        setBtnActive((prev) => {
            return e.target.value;
          });
    };

    return (
        <StThemeSelectBox>
            {themeList.map((cur, index) => {
                return (
                    <Button
                        value={cur}
                        size="small"
                        variant={(cur ===btnActive? "primary": "gray")}
                        key={index}
                        onClick={toggleActive}
                        style={{marginRight: "20px",
                                width:"100px"}}
                    >
                        {cur}
                    </Button>
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