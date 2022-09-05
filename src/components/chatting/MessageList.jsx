import React from 'react';

import styled from 'styled-components';

// elements
import Message from '../../elements/Message';

// 리덕스 접근
// import { useSelector } from 'react-redux';


// 메시지 리스트 컴포넌트
const MessageList = (props) => {
  // const messages = useSelector((state) => state.chat.messages);
  const messages=[
    {
      userId:2,
     message: "믿고 있을게요",
     createdAt:"2022-09-05 18:15",
     user:{
        username: "유진님",
        profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXiJKCJfUo-QZzQ5gpm4ol9qtYe9W8BevUw&usqp=CAU"
      }
    },
    {
    userId:1,
   message: "믿지 마세요;;;",
   createdAt:"2022-09-05 18:16",
   sender:"경문"
  },
  {
    userId:2,
   message: "믿어요 ㅎㅎ",
   createdAt:"2022-09-05 18:17",
   user:{
    username: "유진님",
    profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXiJKCJfUo-QZzQ5gpm4ol9qtYe9W8BevUw&usqp=CAU"
  }
  },  {
    userId:2,
   message: "믿고 있을게요",
   createdAt:"2022-09-05 18:15",
   user:{
      username: "유진님",
      profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXiJKCJfUo-QZzQ5gpm4ol9qtYe9W8BevUw&usqp=CAU"
    }
  },
  {
  userId:1,
 message: "믿지 마세요;;;",
 createdAt:"2022-09-05 18:16",
 sender:"경문"
},
{
  userId:2,
 message: "믿어요 ㅎㅎ",
 createdAt:"2022-09-05 18:17",
 user:{
  username: "유진님",
  profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXiJKCJfUo-QZzQ5gpm4ol9qtYe9W8BevUw&usqp=CAU"
}
},
{
  userId:2,
 message: "믿고 있을게요",
 createdAt:"2022-09-05 18:15",
 user:{
    username: "유진님",
    profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXiJKCJfUo-QZzQ5gpm4ol9qtYe9W8BevUw&usqp=CAU"
  }
},
{
userId:1,
message: "믿지 마세요;;;",
createdAt:"2022-09-05 18:16",
sender:"경문"
},
{
userId:2,
message: "믿어요 ㅎㅎ",
createdAt:"2022-09-05 18:17",
user:{
username: "유진님",
profileUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXiJKCJfUo-QZzQ5gpm4ol9qtYe9W8BevUw&usqp=CAU"
}
}];

  // 스크롤 대상
  const messageEndRef = React.useRef(null);
  //  하단 스크롤 함수
  // const scrollTomBottom = () => {
  //   // 모바일이면 실행하지 않기
  //   if (window.innerWidth <= 375) {
  //     return
  //   }
  //   messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  // };
  // 렌더링시 이동
  // React.useEffect(() => {
  //   scrollTomBottom();
  // }, [messages]);


  return (
    <Container className="scroll" id="messagelist">
      {messages.map((m, idx) => {
        return <Message key={idx} messageInfo={m} is_me={true} />;
      })}

      <div ref={messageEndRef}></div>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.border_box};
  ${(props) => props.theme.flex_column};
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 30px 30px 60px 30px;
  overflow: auto;
  @media ${(props) => props.theme.mobile} {
    height: 90%;
    padding: 30px 10px 90px 10px;
  }
`;

export default MessageList;