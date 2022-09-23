import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../elements/Button";
import { authInstance } from "../../shared/api";
import { useQuery, useMutation, useQueryClient } from "react-query";

// 채팅방 정보 단건조회
const getChatDetail = async ({ queryKey }) => {
  return await authInstance.get(`/api/chat/rooms/${Number(queryKey[1])}`);
};

//채팅방 삭제 axios
const deleteChatDetail = async (id) => {
  return await authInstance.delete(`/api/chat/rooms/${Number(id)}`);
};

const ChatName = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  console.log(isOpenInfo);

  //채팅단건 조회 useQuery
  const chatDetailQuery = useQuery(["chatDetail", id], getChatDetail, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  //채팅단건삭제 mutation
  const queryClient = useQueryClient();
  //useMutation 첫번째 파라미터: 함수, 두번째 파라미터: 옵션
  const { mutate } = useMutation(deleteChatDetail, {
    onSuccess: () => {
      queryClient.invalidateQueries("chatList");
      navigate("/chatting");
    },
  });

  if (chatDetailQuery.isLoading) {
    return null;
  }

  const chatDetail = chatDetailQuery.data.data;

  // ::: 날짜 차이 계산하기
  const dateCalculation = (day1, day2) => {
    const dateStart = new Date(day1);
    const dateEnd = new Date(day2);

    const diffDate = dateStart.getTime() - dateEnd.getTime();
    return Math.abs(diffDate / (1000 * 60 * 60 * 24));
  };

  // ::: 모집날짜 몇 박 몇 일 계산하기
  const tripPeriod = dateCalculation(chatDetail.startDate, chatDetail.endDate);

  // ::: 오늘 날짜 계산하기
  const todayCalculation = () => {
    const originDate = new Date();
    const year = originDate.getFullYear();
    const month = originDate.getMonth() + 1;
    const date = originDate.getDate();

    return `${year}-${month}-${date}`;
  };
  const today = todayCalculation();
  // ::: 디데이 계산하기
  const dday = Math.floor(dateCalculation(today, chatDetail.roomCloseDate));

  return (
    <Container>
      <StInfoBox isOpenInfo={isOpenInfo}>
        <StTitleBox>
          {chatDetail.title}
          <div>
            <button onClick={() => setIsOpenInfo(!isOpenInfo)}>더보기</button>
            <Button size="small" variant="lineBlue" onClick={() => mutate(id)}>
              나가기
            </Button>
            <button>닫기</button>
          </div>
        </StTitleBox>
        {isOpenInfo && (
          <div>
            <div>카테고리 : {chatDetail.themeCategory}</div>
            <div>
              여행장소 :
              {chatDetail.meetingTags.map((tag, index) => (
                <span key={tag + index}>{tag}&nbsp;</span>
              ))}
            </div>
            <div>
              여행기간 :
              {tripPeriod === 0
                ? `${tripPeriod + 1}일`
                : `${tripPeriod}박 ${tripPeriod + 1}일`}
              <span>{` (${chatDetail.startDate.split("-")[1]}/${
                chatDetail.startDate.split("-")[2]
              } - ${chatDetail.endDate.split("-")[1]}/${
                chatDetail.endDate.split("-")[2]
              })`}</span>
            </div>
            <div>
              현재인원 :
              {chatDetail.memberNames.map((name, idx) => (
                <span key={idx}>{name}&nbsp;</span>
              ))}
            </div>
            <div>
              현재인원/모집인원 : {chatDetail.memberCount}명/
              {chatDetail.people}명
            </div>

            <div>
              모집마감일 : D-
              <b>
                {dday} {chatDetail.roomCloseDate}
              </b>
            </div>
            <div>모임장소 : {chatDetail.departLocation} </div>
          </div>
        )}
      </StInfoBox>
    </Container>
  );
};

export default ChatName;

const Container = styled.div`
  position: relative;
  display: block;
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row}

  width: 100%;

  text-overflow: ellipsis;
  white-space: nowrap;
  height: 10%;
  /* background-color: ${(props) => props.theme.theme_gray}; */

  color: ${(props) => props.theme.font_color};
  padding: 20px;

  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
  }
`;

const StInfoBox = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  transition: 0.1s;
  background-color: #fff;
  height: ${(props) => (props.isOpenInfo === true ? "200px" : "50px")};
`;

const StTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 26px;
  font-weight: 700;
`;
