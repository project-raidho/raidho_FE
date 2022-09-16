import React, { useState } from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const TripPeopleCount = ({ setPeople }) => {
  const countList = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [count, setCount] = useState();

  const countonChange = (e) => {
    setCount(e.target.value);
    setPeople(e.target.value);
  };
  return (
    <StPeopleWrapp>
      <FormControl sx={{ m: 1, Width: 120 }}>
        <Select
          value={count}
          onChange={countonChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="">
            <em>인원 선택</em>
          </MenuItem>
          {countList.map((item, i) => (
            <MenuItem value={item} key={i}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <People>명</People>
    </StPeopleWrapp>
  );
};
export default TripPeopleCount;

const StPeopleWrapp = styled.div`
  display: flex;
`;

const People = styled.div`
  margin: auto 5px;
  font-size: 20px;
`;
