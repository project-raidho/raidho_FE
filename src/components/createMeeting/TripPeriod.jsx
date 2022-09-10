
import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"	

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import React, { useState } from 'react';
import styled from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import moment from 'moment';
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다. 
import 'moment/locale/ko';

const TripPeriod = ({ setTripPeriod }) => {
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ])
    // setInputdate(moment(date).format('YYYY-MM-DD'))

    const onChangeHandler=(item)=>{
      setState([item.selection]); 
      setTripPeriod({
        startDate: moment([item.selection][0].startDate).format('YYYY-MM-DD'),
        endDate: moment([item.selection][0].endDate).format('YYYY-MM-DD')
    })
    console.log({
        startDate: moment([item.selection][0].startDate).format('YYYY-MM-DD'),
        endDate: moment([item.selection][0].endDate).format('YYYY-MM-DD')
    })
    }
    return (
        <CalenderContainer>
            <DateRange

            showPreview={false}
             locale={ko} 
                editableDateInputs={true}
                onChange={(item)=>onChangeHandler(item)}
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
  display: flex;
`;