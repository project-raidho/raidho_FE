import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import React, { useState } from "react";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import moment from "moment";
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다.
import "moment/locale/ko";
import Input from "../../elements/Input";
import { BsCalendar3 } from "react-icons/bs";
const TripPeriod = ({ setStartDate, setEndDate }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  // setInputdate(moment(date).format('YYYY-MM-DD'))

  const onChangeHandler = (item) => {
    setState([item.selection]);
    setStart(moment([item.selection][0].startDate).format("YYYY-MM-DD"));
    setEnd(moment([item.selection][0].endDate).format("YYYY-MM-DD"));
    setStartDate(moment([item.selection][0].startDate).format("YYYY-MM-DD"));
    setEndDate(moment([item.selection][0].endDate).format("YYYY-MM-DD"));
  };
  const startinputonChangeHandler = (e) => {
    setStart(e.target.value);
  };

  const endinputonChangeHandler = (e) => {
    setEnd(e.target.value);
  };

  return (
    <CalenderContainer>
      <InputBox>
        <Input
          value={start}
          placeholder="ex) 2022-01-01"
          onFocus={() => setShowCalendar(true)}
          variant="default"
          size="medium"
          onChange={startinputonChangeHandler}
        />
        <Wave>~</Wave>
        <Input
          value={end}
          placeholder="ex) 2022-01-02"
          onFocus={() => setShowCalendar(true)}
          variant="default"
          size="medium"
          onChange={endinputonChangeHandler}
        />
        <CalendarIcon onClick={() => setShowCalendar(!showCalendar)} />
      </InputBox>

      {showCalendar && (
        <DateRange
          showPreview={false}
          locale={ko}
          onChange={(item) => onChangeHandler(item)}
          moveRangeOnFirstSelection={false}
          ranges={state}
          months={2}
          direction="horizontal"
          dateDisplayFormat={"yyyy/MMM/d일"} // 날짜 포맷값
          showDateDisplay={false}
        />
      )}
    </CalenderContainer>
  );
};
export default TripPeriod;

const CalenderContainer = styled.div`
  /* display: flex; */
`;
const InputBox = styled.div`
  display: flex;
`;
const Wave = styled.div`
  margin: auto 5px;
  font-size: 25px;
`;

const CalendarIcon = styled(BsCalendar3)`
  font-size: 25px;
  margin: auto 5px;
  cursor: pointer;
`;
