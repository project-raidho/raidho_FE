import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToggleBox from "./toggle/ToggleBox";
import Button from "../../elements/Button";
import Potal from "../../global/globalModal/Potal";
import LoginModal from "../login/LoginContainer";
import IconAdd from "../../assets/header/add.svg";
import IconChat from "../../assets/header/chat.svg";
import IconMeeting from "../../assets/header/meeting.svg";
import IconPost from "../../assets/header/post.svg";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";
import styled from "styled-components";

const HeaderRightMenu = ({ isLogin }) => {
  // ::: 유저 프로필 이미지 적용하기
  const memberImage =
    localStorage.getItem("memberImage") === "null"
      ? `${DefaultMemberImage}`
      : localStorage.getItem("memberImage");
  // ::: 모달 여부 확인하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  console.log("isLogin", isLogin);
  return (
    <StHeaderRightMenuWrap>
      {!isLogin ? (
        <>
          <Button size="small" variant="primary" onClick={handleModal}>
            로그인
          </Button>

          <Potal>{modalOn && <LoginModal onClose={handleModal} />}</Potal>
        </>
      ) : (
        <StLoginRightMenu>
          <li>
            <Link to={`/`}>
              <img src={IconPost} alt="여행후기 보러가기" />
            </Link>
          </li>
          <li>
            <Link to={`/meetingList/all`}>
              <img src={IconMeeting} alt="모집글 보러가기" />
            </Link>
          </li>
          <li>
            <img src={IconAdd} alt="게시글 추가하기" />
            <ToggleBox>
              <li>ddd</li>
            </ToggleBox>
          </li>
          <li>
            <Link to={"/chatting"}>
              <img src={IconChat} alt="채팅 하러가기" />
            </Link>
          </li>
          <li className="userMenu">
            <img src={memberImage} alt="마이프로필" />
          </li>
        </StLoginRightMenu>
      )}
    </StHeaderRightMenuWrap>
  );
};

export default HeaderRightMenu;

const StHeaderRightMenuWrap = styled.div`
  p.rightMenuBox {
  }
`;

const StLoginRightMenu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  li {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    margin-left: 1.2rem;
    cursor: pointer;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  li:first-child {
    margin-left: 0;
  }

  .userMenu {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
