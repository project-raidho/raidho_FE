import React from "react";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import MeetingListCard from "../meetingList/MeetingListCard";
import SearchAlert from "./SearchAlert";
import styled from "styled-components";
import Loading from "../../elements/Loading";

const SearchTagMeeting = ({ tagName }) => {
  // ::: 태그 상세 리스트 리스트 불러오기
  const getSearchTagMeetingList = async () => {
    // console.log("====>tag", tagName);
    try {
      return await authInstance.get(`/api/search/meeting/${tagName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const tagMeetingListQuery = useQuery(
    ["tagMeetingList", tagName],
    getSearchTagMeetingList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  if (tagMeetingListQuery.isLoading) {
    return <Loading />;
  }

  // console.log("tagMeetingListQuery", tagMeetingListQuery);

  return (
    <>
      {tagMeetingListQuery.data.data.data.content.length === 0 ? (
        <SearchAlert tagName={tagName} />
      ) : (
        <StMeetingCardBox>
          {tagMeetingListQuery.data.data.data.content.map((meeting) => (
            <MeetingListCard key={meeting.id} meeting={meeting} />
          ))}
        </StMeetingCardBox>
      )}
    </>
  );
};

export default SearchTagMeeting;

const StMeetingCardBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-bottom: 5rem;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
