import React from "react";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
import MeetingListCard from "../meetingList/MeetingListCard";
import SearchAlert from "./SearchAlert";
import styled from "styled-components";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import { MeetingContentProps } from "../../elements/Type";

const SearchTagMeeting = ({ tagName }: { tagName: string }) => {
  // ::: 태그 상세 리스트 리스트 불러오기
  const getSearchTagMeetingList = async () => {
    return await authInstance.get(`/api/search/meeting/${tagName}`);
  };

  const { data, status, error } = useQuery(
    ["tagMeetingList", tagName],
    getSearchTagMeetingList,
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  if (status === "loading") return <Loading />;
  if (status === "error") return <Error message={(error as Error).message} />;

  return (
    <>
      {data?.data.data.content.length === 0 ? (
        <SearchAlert tagName={tagName} />
      ) : (
        <StMeetingCardBox>
          {data?.data.data.content.map((meeting: MeetingContentProps) => (
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
              onClickTheme={undefined}
            />
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

  @media ${(props) => props.theme.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${(props) => props.theme.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
