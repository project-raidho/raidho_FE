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
import { useEffect } from "react";
const TripPeriod = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setmaxRoomCloseDate,
}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const tomorrow = moment().add(1, "d").toDate();
  const [showCalendar, setShowCalendar] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  // setInputdate(moment(date).format('YYYY-MM-DD'))

  const onChangeHandler = (item) => {
    setState([item.selection]);
    setStart(moment([item.selection][0].startDate).format("YYYY-MM-DD"));
    setEnd(moment([item.selection][0].endDate).format("YYYY-MM-DD"));
    setStartDate(moment([item.selection][0].startDate).format("YYYY-MM-DD"));
    setEndDate(moment([item.selection][0].endDate).format("YYYY-MM-DD"));
    setmaxRoomCloseDate(
      moment([item.selection][0].startDate).add(-1, "d").toDate()
    );
  };
  // const startinputonChangeHandler = (e) => {
  //   setStartDate(e.target.value);
  //   setStart(e.target.value);
  // };

  // const endinputonChangeHandler = (e) => {
  //   setEndDate(e.target.value);
  //   setEnd(e.target.value);
  // };
  useEffect(() => {
    setStart(startDate);
    setEnd(endDate);
    // eslint-disable-next-line
  }, [startDate, endDate]);

  return (
    <CalenderContainer>
      <InputBox>
        <div>
          <p>시작일</p>
          <Input
            value={start}
            placeholder="날짜는 내일부터 선택가능합니다"
            onFocus={() => setShowCalendar(true)}
            variant="default"
            size="large"
            // onChange={startinputonChangeHandler}
          />
        </div>
        <div>
          <p>종료일</p>
          <Input
            value={end}
            placeholder="날짜는 내일부터 선택가능합니다"
            onFocus={() => setShowCalendar(true)}
            variant="default"
            size="large"
            // onChange={endinputonChangeHandler}
          />
        </div>

        <CalendarIcon onClick={() => setShowCalendar(!showCalendar)} />
      </InputBox>

      {showCalendar && (
        <DateRange
          showPreview={false}
          locale={ko}
          minDate={tomorrow}
          onChange={(item) => onChangeHandler(item)}
          moveRangeOnFirstSelection={false}
          ranges={state}
          months={1}
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
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    .rdrMonth {
      width: 300px;
    }
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  div {
    margin: 10px;
  }
  p {
    margin-bottom: 10px;
    font-size: 15px;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    gap: 10px;
  }
`;

const CalendarIcon = styled(BsCalendar3)`
  font-size: 25px;
  margin: auto 5px;
  cursor: pointer;
`;
