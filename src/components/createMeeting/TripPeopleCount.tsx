import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import styled from "styled-components";

const TripPeopleCount = ({
  people,
  setPeople,
}: {
  people: number | undefined;
  setPeople: Dispatch<SetStateAction<number | undefined>>;
}) => {
  const countList = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  const [count, setCount] = useState(2);

  const countonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCount(Number(e.target.value));
    setPeople(Number(e.target.value));
  };
  useEffect(() => {
    if (people === undefined) {
      setCount(2);
    } else {
      setCount(people);
    }
  }, [people]);

  return (
    <StPeopleWrapper>
      <h1>여행희망인원(채팅인원) *</h1>
      <StSelectBox>
        <select
          value={count}
          onChange={(e) => countonChange(e)}
          className="select"
        >
          {countList.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>

        <People>명</People>
      </StSelectBox>
    </StPeopleWrapper>
  );
};
export default TripPeopleCount;

const StPeopleWrapper = styled.div`
  .select {
    width: 100px;
    height: 35px;
    background: url("https://freepikpsd.com/media/2019/10/down-arrow-icon-png-7-Transparent-Images.png")
      calc(100% - 5px) center no-repeat;
    background-size: 20px;
    padding: 5px 30px 5px 10px;
    border-radius: 10px;
    outline: 0 none;
    cursor: pointer;
  }
  option {
    background: var(--bg-color);
    color: var(--title-color);
    padding: 3px 0;
  }
`;
const StSelectBox = styled.div`
  margin-top: 50px;
  display: flex;
  background-color: var(--subBg-color);

  @media ${(props) => props.theme.mobile} {
    margin-top: 15px;
  }
`;

const People = styled.div`
  margin: auto 5px;
  font-size: 20px;
`;
