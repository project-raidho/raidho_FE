import React, { useState, useCallback, useEffect } from "react";
import { Calendar } from "react-date-range"; // 얘가 캘린더 라이브러리
import ko from "date-fns/locale/ko"; // 날짜 포맷 라이브러리 (한국어 기능을 임포트)
import moment from "moment";
import Input from "../../elements/Input";
import styled from "styled-components";
import { BsCalendar3 } from "react-icons/bs";
const RoomCloseDateBox = ({
  roomCloseDate,
  setRoomCloseDate,
  maxRoomCloseDate,
}) => {
  // 캘린더 여는 토글
  const [showCalendar, setShowCalendar] = useState(false);
  // 오늘 날짜 기본값지정을 위해
  const today = moment().add(0, "d").toDate();
  const [maxDate, setmMaxDate] = useState();
  //기본값을 오늘날짜로 지정
  const [date, setDate] = useState(today);
  const [inputDate, setInputDate] = useState(roomCloseDate);
  const onChangeDate = useCallback(
    (date) => {
      // date 변경값을 받아오는 함수
      if (!date) {
        return;
      } // 날짜값이 없을 때 예외처리
      setDate(date); // 날짜값이 들어오면 date 를 set해준다
      setInputDate(moment(date).format("YYYY-MM-DD"));
      setRoomCloseDate(moment(date).format("YYYY-MM-DD"));
      setShowCalendar(false);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [date]
  );
  // const inputonChangeHandler = (e) => {
  //   setInputdate(e.target.value);
  //   // setRoomCloseDate(inputdate);
  // };
  useEffect(() => {
    setInputDate(roomCloseDate);
    setmMaxDate(maxRoomCloseDate);
  }, [roomCloseDate, maxRoomCloseDate]);

  return (
    <StRoomCloseDateBoxContainer>
      <h1>모집마감일자</h1>
      <StInputbox>
        <StDateInput
          placeholder={"모집마감일자를 선택해주세요"}
          value={inputDate}
          variant="default"
          size="large"
          onFocus={() => setShowCalendar(true)}
          // onBlur={()=>setShowCalendar(false)}
          // onChange={inputonChangeHandler}
        />
        <CalendarIcon onClick={() => setShowCalendar(!showCalendar)} />
      </StInputbox>

      {showCalendar && ( // 클릭 등으로 토글상태 값이 true 이 되면 달력이 보여진다
        <Calendar
          className="calendar"
          editableDateInputs={true}
          locale={ko} // 한국어 달력
          months={1} // 1달치 달력만 디스플레이
          minDate={today} // 최소날짜값 내일이면 내일부터 선택가능하다.
          maxDate={maxDate}
          date={date} // 날짜값
          onChange={onChangeDate} // onChange 함수
          dateDisplayFormat={"yyyy.mm.dd"} // 날짜 포맷값
        />
      )}
    </StRoomCloseDateBoxContainer>
  );
};

export default RoomCloseDateBox;

const StRoomCloseDateBoxContainer = styled.div`
  .calendar {
    @media ${(props) => props.theme.mobile} {
      .rdrMonth {
        width: 300px;
      }
    }
  }
`;

const CalendarIcon = styled(BsCalendar3)`
  font-size: 25px;
  margin: auto 0 auto 10px;
  cursor: pointer;
`;

const StDateInput = styled(Input)`
  width: 80%;
  @media (max-width: 639px) {
    font-size: 1.2rem;
  }
`;
const StInputbox = styled.div`
  display: flex;
`;
