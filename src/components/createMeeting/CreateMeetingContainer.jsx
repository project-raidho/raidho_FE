import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from "styled-components";
import TripLocationSelect from './TripLocationSelect';


const CreateMeetingContatiner = () => {
    const [theme, setTheme] = useState('');
  
    const themeHandleChange = (event) => {
        setTheme(event.target.value);
    };
  


    return (
        <div>
            <StCategorySelectBox>
                <p>테마</p>
                <Box sx={{ maxWidth: 200 }}>
                    <FormControl fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">테마</InputLabel> */}
                        <Select
                         value={theme}
                         onChange={themeHandleChange}
                         displayEmpty
                         inputProps={{ 'aria-label': 'Without label' }}
                          
                        >
                            <MenuItem value="">
                                <em>테마선택</em>
                            </MenuItem>
                            <MenuItem value={"자전거"}>자전거</MenuItem>
                            <MenuItem value={"등산"}>등산</MenuItem>
                            <MenuItem value={"도보"}>도보</MenuItem>
                            <MenuItem value={"힐링"}>힐링</MenuItem>
                            <MenuItem value={"액티비티"}>액티비티</MenuItem>
                            <MenuItem value={"전통"}>전통</MenuItem>
                            <MenuItem value={"맛집"}>맛집</MenuItem>
                            <MenuItem value={"바다"}>바다</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </StCategorySelectBox>


           <TripLocationSelect/>

        </div>

    )
}
export default CreateMeetingContatiner

const StCategorySelectBox = styled.div`
/* display: flex; */
`
const StTriplocationBox = styled.div`
/* display: flex; */
`