import React, { Dispatch, SetStateAction, useState } from 'react';
import { Calendar } from 'react-date-range'; // 얘가 캘린더 라이브러리
import ko from 'date-fns/locale/ko'; // 날짜 포맷 라이브러리 (한국어 기능을 임포트)
import moment from 'moment';
import styled from 'styled-components';
import Input from '../../elements/Input';

interface IDate {
  setRoomCloseDate: Dispatch<SetStateAction<string>>;
}

function RoomCloseDateBox({ setRoomCloseDate }: IDate) {
  const [showCalendar, setShowCalendar] = useState(false); // 캘린더 여는 토글
  const tomorrow = moment().add(1, 'd').toDate(); // 내일 날짜 기본값지정을 위해
  const [date, setDate] = useState(tomorrow); // date 를 선언하고 기본값을 내일날짜로 지정
  const [inputdate, setInputdate] = useState('');
  const onChangeDate = (date: Date) => {
    // date 변경값을 받아오는 함수
    if (!date) {
      return;
    } // 날짜값이 없을 때 예외처리
    setDate(date); // 날짜값이 들어오면 date 를 set해준다
    setInputdate(moment(date).format('YYYY-MM-DD'));
    setRoomCloseDate(moment(date).format('YYYY-MM-DD'));
    setShowCalendar(false);
  };

  const inputonChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputdate(e.target.value);
    // setRoomCloseDate(inputdate);
  };

  return (
    <StRoomCloseDateBoxContainer>
      <Input
        value={inputdate}
        variant="default"
        size="medium"
        onFocus={() => setShowCalendar(true)}
        // onBlur={()=>setShowCalendar(false)}
        onChange={inputonChangeHandler}
        disabled={false} // props={undefined}
      />

      {showCalendar && ( // 클릭 등으로 토글상태 값이 true 이 되면 달력이 보여진다
        <Calendar
          editableDateInputs
          locale={ko} // 한국어 달력
          months={1} // 1달치 달력만 디스플레이
          minDate={tomorrow} // 최소날짜값 내일이면 내일부터 선택가능하다.
          date={date} // 날짜값
          onChange={onChangeDate} // onChange 함수
          dateDisplayFormat="yyyy.mm.dd" // 날짜 포맷값
        />
      )}
    </StRoomCloseDateBoxContainer>
  );
}

export default RoomCloseDateBox;

const StRoomCloseDateBoxContainer = styled.div`
  display: flexbox;
`;
