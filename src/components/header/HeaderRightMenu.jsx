import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const HeaderRightMenu = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();
  const userIsLogin = localStorage.getItem("Authorization");

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

  // ::: 토글 메뉴 확인하기
  const [isAddToggle, setIsAddToggle] = useState(false);
  const [isUserToggle, setIsUserToggle] = useState(false);

  // ::: 토글 메뉴 닫기
  const onCloseToggle = () => {
    setIsAddToggle(false);
    setIsUserToggle(false);
  };

  // ::: 로그아웃 하기
  const onClickLogOut = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("memberImage");
    localStorage.removeItem("memberName");
    localStorage.removeItem("memberIntro");

    setIsLogin(false);
    onCloseToggle();
    navigate("/");
  };

  useEffect(() => {
    // ::: 로그인 여부 확인하기
    userIsLogin !== null ? setIsLogin(true) : setIsLogin(false);
    // eslint-disable-next-line
  }, [userIsLogin]);

  return (
    <StHeaderRightMenuWrap isLogin={isLogin}>
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
          <li onClick={() => setIsAddToggle(!isAddToggle)}>
            <img src={IconAdd} alt="게시글 추가하기" />
            <ToggleBox isToggle={isAddToggle} onCloseToggle={onCloseToggle}>
              <li>
                <Link to={`/createPost`}>여행후기 작성</Link>
              </li>
              <li>
                <Link to={`/createMeeting`}>모집글 작성</Link>
              </li>
            </ToggleBox>
          </li>
          <li>
            <Link to={"/chatting"}>
              <img src={IconChat} alt="채팅 하러가기" />
            </Link>
          </li>
          <li className="userMenu">
            <p onClick={() => setIsUserToggle(!isUserToggle)}>
              <img src={memberImage} alt="마이프로필" />
            </p>
            <ToggleBox isToggle={isUserToggle} onCloseToggle={onCloseToggle}>
              <li>
                <Link to={`/myProfile`}>마이페이지</Link>
              </li>
              <li onClick={onClickLogOut}>로그아웃</li>
            </ToggleBox>
          </li>
        </StLoginRightMenu>
      )}
    </StHeaderRightMenuWrap>
  );
};

export default HeaderRightMenu;

const StHeaderRightMenuWrap = styled.div`
  @media (max-width: 639px) {
    position: ${(props) => (props.isLogin ? "fixed" : "")};
    left: ${(props) => (props.isLogin ? "0" : "")};
    bottom: ${(props) => (props.isLogin ? "0" : "")};
    display: ${(props) => (props.isLogin ? "flex" : "")};
    align-items: ${(props) => (props.isLogin ? "center" : "")};
    width: ${(props) => (props.isLogin ? "100%" : "")};
    height: ${(props) => (props.isLogin ? "48px" : "")};
    background-color: ${(props) => (props.isLogin ? "var(--bg-color)" : "")};
    box-shadow: ${(props) =>
      props.isLogin ? "var(--header-bottom-shadow)" : ""};
    z-index: ${(props) => (props.isLogin ? "8" : "")};
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
    ul {
      li {
        width: 90%;
        height: 55px;
        margin: 0;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 1.1rem;
        }
      }
      li:first-child {
        border-bottom: 1px solid var(--gray-color);
        margin-top: 10px;
      }
    }
  }

  li:first-child {
    margin-left: 0;
  }

  .userMenu {
    width: 34px;
    height: 34px;

    p {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  @media (max-width: 639px) {
    width: 94%;
    height: 30px;
    margin: 0 auto;

    li {
      width: 30px;
      height: 30px;

      ul {
        li {
          height: 45px;
        }
        li:first-child {
          margin-top: 20px;
        }
      }
    }
    .userMenu {
      width: 30px;
      height: 30px;
    }
  }
`;
