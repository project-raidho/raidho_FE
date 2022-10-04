import React, {
  useState,
  useCallback,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import styled from "styled-components";
import { BsCalendar3 } from "react-icons/bs";
//달력 관련 라이브러리
import { Calendar } from "react-date-range";
import ko from "date-fns/locale/ko";
import moment from "moment";

import Input from "../../elements/Input";

interface RoomCloseDateBoxProps {
  roomCloseDate?: string;
  setRoomCloseDate: Dispatch<SetStateAction<string>>;
  maxRoomCloseDate: Date | undefined;
}

const RoomCloseDateBox = ({
  roomCloseDate,
  setRoomCloseDate,
  maxRoomCloseDate,
}: RoomCloseDateBoxProps) => {
  // 캘린더 여는 토글
  const [showCalendar, setShowCalendar] = useState(false);
  // 오늘 날짜 기본값지정을 위해
  const today = moment().add(0, "d").toDate();
  const [maxDate, setmMaxDate] = useState(today);
  //기본값을 오늘날짜로 지정
  const [date, setDate] = useState(today);
  const [inputDate, setInputDate] = useState(roomCloseDate);
  const onChangeDate = useCallback(
    (date: Date) => {
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
    if (maxRoomCloseDate === undefined) {
      return setmMaxDate(moment().add(600, "d").toDate());
    } else {
      return setmMaxDate(maxRoomCloseDate);
    }
  }, [roomCloseDate, maxRoomCloseDate]);

  return (
    <StRoomCloseDateBoxContainer>
      <h1>모집마감일자 *</h1>
      <StInputbox>
        <span className="input" onClick={() => setShowCalendar(!showCalendar)}>
          <StDateInput
            placeholder={"모집마감일자를 선택해주세요"}
            value={inputDate}
            variant="default"
            size="large"
            // onChange={inputonChangeHandler}
            disabled={true}
          />
        </span>

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
  .input {
    .SKpjV:disabled {
      cursor: pointer;
      opacity: 1;
    }
  }
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
  font-size: 1rem;
`;
const StInputbox = styled.div`
  display: flex;
  span {
    width: 80%;
  }
`;
