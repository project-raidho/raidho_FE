import React, { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';

import axios from 'axios';
import Button from '../../elements/Button';
import TripPeriod from './TripPeriod';

import CreatePostTags from '../createPost/CreatePostTags';
import RoomCloseDateBox from './RoomclosedateBox';
import MeetingLocationSearch from './MeetingLocationSearch';
import TripPeopleCount from './TripPeopleCount';

import ThemeSelect from './ThemeSelect';

function CreateMeetingContatiner() {
  const [theme, setTheme] = useState('');
  const [locationtags, setLocationTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [people, setPeople] = useState();
  const [roomClosedate, setRoomCloseDate] = useState();
  const [tripPeriod, setTripPeriod] = useState([{ startDate: '', endDate: '' }]);
  const [departLocation, setDepartLocation] = useState();

  const selectedLocationTags = (tags: string[]) => {
    setLocationTags(tags);
  };

  const selectedTags = (tags: string[]) => {
    setTags(tags);
  };

  const URI = process.env.REACT_APP_BASE_URI;
  // const accesstoken = localStorage.getItem("Authorization");
  // const refreshtoken = localStorage.getItem("RefreshToken");

  // let config = {
  //     headers: {
  //         Authorization: accesstoken,
  //         RefreshToken: refreshtoken,
  //     },
  // };
  const data = {
    theme,
    locationtags,
    title,
    desc,
    tripPeriod,
    tags,
    people,
    roomClosedate,
    departLocation,
  };

  const postcreatemeeting = async (id: number) => {
    const res = await axios.post(
      `${URI}/detail/${id}`,
      data,
      // config
    );
    return res;
  };

  return (
    <StContainer>
      <h1>테마</h1>
      <ThemeSelect setTheme={setTheme} />

      <h1>여행장소</h1>
      <StTags>
        <CreatePostTags
          selectedTags={selectedLocationTags}
          tags={['예시)프랑스']}
          tagMassage="여행할 도시나 나라를 입력해주세요!"
        />
      </StTags>
      <h1>제목</h1>
      <StTitleBox multiline maxRows={4} value={title} onChange={(e) => setTitle(e.target.value)} />
      <h1>설명</h1>
      <StDescBox
        id="outlined-multiline-static"
        multiline
        rows={4}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <h1>해시태그</h1>
      <StTags>
        <CreatePostTags selectedTags={selectedTags} tags={['예시)활동적']} tagMassage="태그를 입력해주세요!" />
      </StTags>

      <h1>모집인원</h1>
      <TripPeopleCount setPeople={setPeople} />
      <h1>모집마감일자</h1>
      <RoomCloseDateBox setRoomCloseDate={setRoomCloseDate} />
      <h1>여행기간</h1>
      <TripPeriod setTripPeriod={setTripPeriod} />
      <h1>출발장소</h1>
      <MeetingLocationSearch setDepartLocation={setDepartLocation} />

      <Button size="small" variant="primary" onClick={postcreatemeeting}>
        개설하기
      </Button>
    </StContainer>
  );
}
export default CreateMeetingContatiner;

const StContainer = styled.div`
  h1 {
    font-size: 20px;
    margin-top: 20px;
  }
`;
const StTitleBox = styled(TextField)`
  width: 50%;
  height: 55px;

  element.style {
    height: 50px;
  }
  .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root {
  }

  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
    height: 55px;
    padding: 5px;
  }
`;
const StDescBox = styled(TextField)`
  width: 50%;
  .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1.5rem;
    padding: 5px;
  }
`;

const StTags = styled.div`
  .kkqTPl {
    width: 50%;
    height: 55px;
    border-radius: 10px;
    border: 1px solid #a0a0a0;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    border: 1px solid;
  }
`;

// const StCategorySelectBox = styled.div`
/* display: flex; */
// `
// const StTriplocationBox = styled.div`
// /* display: flex; */
// `
