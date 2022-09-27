import React, { useState, useEffect } from "react";
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

  // ::: 디바이스 화면 크기 확인
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const checkDiviceWidth = () => {
    const browserWidth = window.innerWidth;
    browserWidth <= 639 ? setIsMobile(true) : setIsMobile(false);
    browserWidth > 639 && browserWidth < 1023
      ? setIsTablet(true)
      : setIsTablet(false);
  };

  useEffect(() => {
    window.addEventListener("resize", checkDiviceWidth);
    return () => {
      window.removeEventListener("resize", checkDiviceWidth);
    };
  }, []);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "error") {
    return <Error message={error.message} />;
  }

  const countMeetingCard = () => {
    if (isMobile) {
      return 1;
    }
    if (isTablet) {
      return 2;
    }
    return 3;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: countMeetingCard(),
    slidesToScroll: 1,
  };

  console.log("내가 작성한 모집글 리스트 ::::", data);
  return (
    <StMyMeetingListWrap>
      {data.length < 3 && (!isMobile || !isTablet) ? (
        <StMeetingCardBox>
          {data.map((meeting) => (
            <MeetingListCard key={meeting.id} meeting={meeting} />
          ))}
        </StMeetingCardBox>
      ) : (
        <Slider {...settings}>
          {data.map((meeting) => (
            <MeetingListCard key={meeting.id} meeting={meeting} />
          ))}
        </Slider>
      )}
    </StMyMeetingListWrap>
  );
};

export default MyMeetingList;

const StMyMeetingListWrap = styled.div``;

const StMeetingCardBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
