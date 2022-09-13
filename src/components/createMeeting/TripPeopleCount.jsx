import React, {useState} from "react";


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const TripPeopleCount=({setPeople})=> {
    const countList = ["2명","3명","4명","5명","6명이상"];
    const [count, setCount]=useState("");


    const countonChange = (e) => {
        setCount(e.target.value);
        setPeople(e.target.value)
      };
    return(
<FormControl sx={{ m: 1, Width: 120 }}>
        <Select
          value={count}
          onChange={countonChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        > 
         <MenuItem value="">
            <em>인원 선택</em>
          </MenuItem>
        {countList.map((item, i) => (
        <MenuItem value={item} key={i}>{item}</MenuItem>
        ))}
      </Select>
      </FormControl>
    )
}
export default TripPeopleCount;