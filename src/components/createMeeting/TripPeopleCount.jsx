import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TripPeopleCount = ({ people, setPeople }) => {
  const countList = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(people);
  const index = countList.indexOf(people);

  const NewCountList = countList.slice(index);
  console.log(NewCountList);
  const [count, setCount] = useState("");
  console.log(count);

  const countonChange = (e) => {
    setCount(e.target.value);
    setPeople(e.target.value);
  };
  useEffect(() => {
    setCount(people);
  }, [people]);

  return (
    <StSelectBox>
      <FormControl sx={{ m: 1, Width: 120 }} className="select">
        <StSelect
          value={count}
          onChange={countonChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>인원 선택</em>
          </MenuItem>
          {NewCountList.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </StSelect>
      </FormControl>

      <People>명</People>
    </StSelectBox>
  );
};
export default TripPeopleCount;

const People = styled.div`
  margin: auto 5px;
  font-size: 20px;
`;

const StSelectBox = styled.div`
  display: flex;
  background-color: var(--subBg-color);

  .select {
    margin: 0;
  }
  .css-1yk1gt9-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root {
  }
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    border: 2px solid var(--gray-color);
  }
  .css-1poimk-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper {
    background-color: black;
  }
  .css-6hp17o-MuiList-root-MuiMenu-list {
    background-color: black;
  }
  .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root {
    background-color: var(--subBg-color);
  }
`;
// var(--subBg-color)
const StSelect = styled(Select)`
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    color: var(--text-color);
  }
`;
