import React, { Dispatch, SetStateAction, useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IPeople {
  setPeople: Dispatch<SetStateAction<string>>;
}

function TripPeopleCount({ setPeople }: IPeople) {
  const countList = ['2명', '3명', '4명', '5명', '6명이상'];
  const [count, setCount] = useState('');

  const countonChange = (e: SelectChangeEvent<string>) => {
    setCount(e.target.value);
    setPeople(e.target.value);
  };
  return (
    <FormControl sx={{ m: 1, Width: 120 }}>
      <Select value={count} onChange={countonChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
        <MenuItem value="">
          <em>인원 선택</em>
        </MenuItem>
        {countList.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default TripPeopleCount;
