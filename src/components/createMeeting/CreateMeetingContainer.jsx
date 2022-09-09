import React, { useState } from 'react';
import styled from "styled-components";
import ThemeSelect from './ThemeSelect';
import TripLocationSelect from './TripLocationSelect';
import axios from 'axios';
import Button from '../../elements/Button';
import TripPeriod from './TripPeriod';
import Input from '../../elements/Input';
import CreatePostTags from '../createPost/CreatePostTags';
import RoomCloseDateBox from './RoomclosedateBox';
import MeetingLocationSearch from './MeetingLocationSearch';

const CreateMeetingContatiner = () => {
    const [theme, setTheme] = useState("");
    const [tripLocation, setTripLocation] = useState([]);
    const selectedTags = (tags) => {
        console.log(tags);
    };
    const [tripPeriod, setTripPeriod] = useState({});
    console.log(tripPeriod)



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
        theme: theme,
        tripLocation: tripLocation,
        tripPeriod: tripPeriod[0]

    }
    console.log(data);
    const postcreatemeeting = async (id) => {
        const res = await axios.post(`${URI}/detail/${id}`,
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
            <TripLocationSelect setTripLocation={setTripLocation} />
            <h1>제목</h1>
            <Input variant="default" size="medium" />

            <h1>설명</h1>
            <Input variant="default" size="square" />

            <h1>해시태그</h1>
            <StTags>
                <CreatePostTags
                className="tagbox"
                    selectedTags={selectedTags}
                    tags={['활동적']}
                    tagMassage={'태그를 입력해주세요!'}
                />
            </StTags>

            <h1>모집인원</h1>
            <h1>모집마감일자</h1>
            <RoomCloseDateBox />
            <h1>여행기간</h1>
            <TripPeriod setTripPeriod={setTripPeriod}/>
            <h1>출발장소</h1>
            <MeetingLocationSearch />

            <Button
                size="small"
                variant="primary"
                onClick={postcreatemeeting}
            >개설하기</Button>
        </StContainer>

    )
}
export default CreateMeetingContatiner

const StContainer = styled.div`
    h1{
        font-size:20px;
        margin-top: 20px;
    }
`

const StTags = styled.div`
width: 600px;
.kkqTPl {
    border-radius: 10px;
    border: 1px solid #A0A0A0;
    box-shadow: 0px 4px 5px rgba(0,0,0,0.1);
}
`


// const StCategorySelectBox = styled.div`
/* display: flex; */
// `
// const StTriplocationBox = styled.div`
// /* display: flex; */
// `