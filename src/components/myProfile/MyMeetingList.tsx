import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";

import MeetingListCard from "../meetingList/MeetingListCard";

import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import { MeetingContentProps } from "../../elements/Type";
import "../../elements/slider/slick-theme.css";
import "../../elements/slider/slick.css";

const MyMeetingList = ({
  status,
  data,
  error,
}: {
  status: string;
  error: { message: string };
  data: MeetingContentProps[];
}) => {
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

  return (
    <StMyMeetingList>
      {(data.length < 2 && isMobile) ||
      (data.length < 3 && isTablet) ||
      (data.length < 4 && !isMobile && !isTablet) ? (
        <StMeetingCardBox>
          {data.map((meeting: MeetingContentProps) => (
            <MeetingListCard
              key={meeting.id}
              departLocation={meeting.departLocation}
              desc={meeting.desc}
              endDate={meeting.endDate}
              id={meeting.id}
              isAlreadyJoin={meeting.isAlreadyJoin}
              isMine={meeting.isMine}
              isStarMine={meeting.isStarMine}
              meetingStatus={meeting.meetingStatus}
              meetingTags={meeting.meetingTags}
              memberCount={meeting.memberCount}
              memberImage={meeting.memberImage}
              memberName={meeting.memberName}
              people={meeting.people}
              roomCloseDate={meeting.roomCloseDate}
              startDate={meeting.startDate}
              themeCategory={meeting.themeCategory}
              title={meeting.title}
            />
          ))}
        </StMeetingCardBox>
      ) : (
        <Slider {...settings}>
          {data.map((meeting: MeetingContentProps) => (
            <MeetingListCard
              key={meeting.id}
              departLocation={meeting.departLocation}
              desc={meeting.desc}
              endDate={meeting.endDate}
              id={meeting.id}
              isAlreadyJoin={meeting.isAlreadyJoin}
              isMine={meeting.isMine}
              isStarMine={meeting.isStarMine}
              meetingStatus={meeting.meetingStatus}
              meetingTags={meeting.meetingTags}
              memberCount={meeting.memberCount}
              memberImage={meeting.memberImage}
              memberName={meeting.memberName}
              people={meeting.people}
              roomCloseDate={meeting.roomCloseDate}
              startDate={meeting.startDate}
              themeCategory={meeting.themeCategory}
              title={meeting.title}
            />
          ))}
        </Slider>
      )}
    </StMyMeetingList>
  );
};

export default MyMeetingList;

const StMyMeetingList = styled.div``;

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
