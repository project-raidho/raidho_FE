import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { authInstance } from "../../shared/api";
import styled from "styled-components";
import Button from "../../elements/Button";
import { authInstance } from "../../shared/api";
// 사용자가 접속한 현재 채팅방의 이름을 표시할 최소단위 컴포넌트
const ChatName = () => {
  // const [roomName, setRoomName] = useState("프랑스여행");
  const { id } = useParams();
  const roomName = "프랑스여행";
  //채팅방 정보 단건조회
  // const getChat = async (roomId) => {
  //   try {
  //     const res = await authInstance.get(`/api/chat/rooms/${roomId}`);
  //     return setRoomName(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getMessageList = async (roomId) => {
  //   try {
  //     const res = await axios.get(`/api/chat/rooms/${roomId}/messages`);

  //     return setMessages(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const oncloseHandler = async () => {
    try {
      const res = await authInstance.delete(`/api/chat/rooms/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getChat(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // // 카테고리 2개까지 표시
  // const categoryInfo = [];
  // for (let i = 0; i < 2; i++) {
  //   if (category[i] === undefined) {
  //     continue
  //   }
  //   categoryInfo.push(category[i])
  // }
  return (
    <Container>
      {roomName}
      {/* {categoryInfo.map((c, idx) => {
      return (
        <TagWrap
          key={idx}
        >
          {c}
        </TagWrap>

      )
    })} */}
      <Button size="small" variant="lineBlue" onClick={oncloseHandler}>
        나가기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_row}
  justify-content: space-between;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 10%;
  /* background-color: ${(props) => props.theme.theme_gray}; */

  color: ${(props) => props.theme.font_color};
  padding: 20px;
  font-size: 26px;
  font-weight: 700;
  @media ${(props) => props.theme.mobile} {
    font-size: 1rem;
  }
`;

// const TagWrap = styled.div`
//   margin: 0px 5px;
//   padding: 5px;
//   font-size: 1rem;
//   background-color: orange;
//   border-radius: 10px;
//   @media ${(props) => props.theme.mobile} {
//     font-size: 0.5rem;
//   }
//   color: whitesmoke;
// `

export default ChatName;
