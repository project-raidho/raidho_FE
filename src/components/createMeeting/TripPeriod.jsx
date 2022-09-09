import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"	

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import React, { useState } from 'react';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';



const TripPeriod = ({ setTripPeriod  }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])
    return (
        <CalenderContainer>

            <DateRange
            showPreview={false}
             locale={ko} 
                editableDateInputs={true}
                onChange={(item) => {setState([item.selection]); setTripPeriod([item.selection])}}
                moveRangeOnFirstSelection={false}
                ranges={state}
                months={2}
                direction="horizontal"
                dateDisplayFormat={'yyyy/MMM/d일'} // 날짜 포맷값
            />
        </CalenderContainer>

    )
}
export default TripPeriod;

const CalenderContainer = styled.div`
display:flex;

`

      