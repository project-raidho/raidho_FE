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
  const [count, setCount] = useState(0);
  const onChangeHandler = (item) => {
    setState([item.selection]);
    setStart(moment([item.selection][0].startDate).format("YYYY-MM-DD"));
    setEnd(moment([item.selection][0].endDate).format("YYYY-MM-DD"));
    setStartDate(moment([item.selection][0].startDate).format("YYYY-MM-DD"));
    setEndDate(moment([item.selection][0].endDate).format("YYYY-MM-DD"));
    setmaxRoomCloseDate(
      moment([item.selection][0].startDate).add(-1, "d").toDate()
    );
    if (count !== 1) {
      return setCount((prev) => prev + 1);
    } else {
      setShowCalendar(false);
      return setCount(0);
    }
  };
  const startinputonChangeHandler = (e) => {
    setStartDate(e.target.value);
    setStart(e.target.value);
  };

  const endinputonChangeHandler = (e) => {
    setEndDate(e.target.value);
    setEnd(e.target.value);
  };
  useEffect(() => {
    setStart(startDate);
    setEnd(endDate);
    // eslint-disable-next-line
  }, [startDate, endDate]);

  return (
    <CalenderContainer>
      <h1>여행기간 *</h1>
      <div>
        <InputBox>
          <div>
            <p>시작일</p>
            <InputSpan onClick={() => setShowCalendar(!showCalendar)}>
              <Input
                className="input"
                value={start || ""}
                placeholder=""
                variant="default"
                size="large"
                onChange={startinputonChangeHandler}
                disabled={true}
              />
            </InputSpan>
          </div>
          <h4 className="calenderIconAndInput">
            <div>
              <p>종료일</p>
              <InputSpan onClick={() => setShowCalendar(!showCalendar)}>
                <Input
                  className="input"
                  value={end || ""}
                  placeholder=""
                  variant="default"
                  size="large"
                  onChange={endinputonChangeHandler}
                  disabled={true}
                />
              </InputSpan>
            </div>
            <CalendarIcon onClick={() => setShowCalendar(!showCalendar)} />
          </h4>
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
      </div>
    </CalenderContainer>
  );
};
export default TripPeriod;

const CalenderContainer = styled.div`
  width: 100%;

  @media ${(props) => props.theme.mobile} {
    .rdrMonth {
      width: 300px;
    }
  }
`;
const InputBox = styled.div`
  display: flex;
  /* flex-direction: row; */
  div {
    width: 180px;
    margin: 10px 0;
  }
  p {
    margin-bottom: 10px;
    font-size: 15px;
  }
  input {
    font-size: 1.2rem;
  }
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    gap: 10px;
  }
  .input {
    cursor: pointer;
  }
  .calenderIconAndInput {
    display: flex;
    margin-left: 5px;
    @media ${(props) => props.theme.mobile} {
      margin-left: 0;
    }
  }
`;

const CalendarIcon = styled(BsCalendar3)`
  font-size: 25px;
  margin: 47px 0 0 8px;
  cursor: pointer;
`;

const InputSpan = styled.span`
  cursor: pointer;
`;
