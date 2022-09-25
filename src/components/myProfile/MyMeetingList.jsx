import React from "react";
import { useQuery } from "react-query";
import { authInstance } from "../../shared/api";
import Slider from "react-slick";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";
import MeetingListCard from "../meetingList/MeetingListCard";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import styled from "styled-components";

const getMeetingMineList = async () => {
  try {
    const responsePostList = await authInstance.get(
      `/api/meeting/myMeetingPost`
    );
    console.log(responsePostList);
    return responsePostList.data.data;
  } catch (error) {
    console.log("내가 작성한 모집글 불러오기 오류 :::", error);
  }
};

const MyMeetingList = () => {
  const { status, data, error } = useQuery("meetingList", getMeetingMineList);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "error") {
    return <Error message={error.message} />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  console.log("내가 작성한 모집글 리스트 ::::", data);
  return (
    <StMyMeetingListWrap>
      <Slider {...settings}>
        {data.map((meeting) => (
          <MeetingListCard key={meeting.id} meeting={meeting} />
        ))}
      </Slider>
    </StMyMeetingListWrap>
  );
};

export default MyMeetingList;

const StMyMeetingListWrap = styled.div`
  /* display: flex;
  flex-direction: row;
  width: 100%;
  height: 526px;
  overflow: hidden; */
`;
