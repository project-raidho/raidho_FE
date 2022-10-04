import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { BiImage } from "react-icons/bi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsChatRightDots } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import ToggleBox from "./ToggleBox";
import Button from "../../elements/Button";
import Potal from "../../global/globalModal/Potal";
import LoginModal from "../login/LoginContainer";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";

interface HeaderProps {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const HeaderRightMenu = ({ isLogin, setIsLogin }: HeaderProps) => {
  const navigate = useNavigate();
  const userIsLogin = localStorage.getItem("Authorization");

  // ::: 유저 프로필 이미지 적용하기
  let memberImage = localStorage.getItem("memberImage");
  if (memberImage === null) {
    memberImage = `${DefaultMemberImage}`;
  }

  // ::: 모달 여부 확인하기
  const [modalOn, setModalOn] = useState<boolean>(false);
  const handleModal = () => {
    setModalOn(!modalOn);
    modalOn && setInfoMessage("");
  };

  // ::: 토글 메뉴 확인하기
  const [isAddToggle, setIsAddToggle] = useState<boolean>(false);
  const [isUserToggle, setIsUserToggle] = useState<boolean>(false);

  const [infoMessage, setInfoMessage] = useState<string>("");

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

  // ::: 로그인 여부 확인 후 메뉴 이동
  const checkLoginGoToChat = (message: string) => {
    if (!isLogin) {
      setInfoMessage(message);
      handleModal();
    } else {
      navigate(`/chatting`);
    }
  };

  const checkLoginGoToCreateMeeting = (message: string) => {
    if (!isLogin) {
      setInfoMessage(message);
      handleModal();
    } else {
      navigate(`/createMeeting`);
    }
    onCloseToggle();
  };

  const checkLoginGoToCreatePost = (message: string) => {
    if (!isLogin) {
      setInfoMessage(message);
      handleModal();
    } else {
      navigate(`/createPost`);
    }
    onCloseToggle();
  };

  useEffect(() => {
    // ::: 로그인 여부 확인하기
    userIsLogin !== null ? setIsLogin(true) : setIsLogin(false);
    // eslint-disable-next-line
  }, [userIsLogin]);

  return (
    <StHeaderRightMenuWrap>
      <StLoginRightMenu>
        <li>
          <Link to={`/`}>
            <BiImage className="iconPost" />
          </Link>
        </li>
        <li>
          <Link to={`/meetingList/all`}>
            <MdOutlineTravelExplore className="iconMeeting" />
          </Link>
        </li>
        <li onClick={() => setIsAddToggle(!isAddToggle)}>
          <AiOutlineCloudUpload className="iconAdd" />
          <ToggleBox isToggle={isAddToggle} onCloseToggle={onCloseToggle}>
            <li
              onClick={() =>
                checkLoginGoToCreatePost("로그인 후 이용이 가능합니다.")
              }
            >
              여행후기 작성
            </li>
            <li
              onClick={() =>
                checkLoginGoToCreateMeeting("로그인 후 이용이 가능합니다.")
              }
            >
              모집글 작성
            </li>
          </ToggleBox>
        </li>
        <li onClick={() => checkLoginGoToChat("로그인 후 이용이 가능합니다.")}>
          <BsChatRightDots className="iconChat" />
        </li>
        {isLogin ? (
          <li className="userMenu">
            <p onClick={() => setIsUserToggle(!isUserToggle)}>
              <img src={memberImage} alt="마이프로필" />
            </p>
            <ToggleBox isToggle={isUserToggle} onCloseToggle={onCloseToggle}>
              <li>
                <Link to={`/myProfile`} onClick={onCloseToggle}>
                  마이페이지
                </Link>
              </li>
              <li onClick={onClickLogOut}>로그아웃</li>
            </ToggleBox>
          </li>
        ) : (
          <li className="loginMenu">
            <Button size="small" variant="primary" onClick={handleModal}>
              로그인
            </Button>

            <Potal>
              {modalOn && (
                <LoginModal onClose={handleModal} message={infoMessage} />
              )}
            </Potal>
          </li>
        )}
      </StLoginRightMenu>
    </StHeaderRightMenuWrap>
  );
};

export default HeaderRightMenu;

const StHeaderRightMenuWrap = styled.div`
  @media ${(props) => props.theme.mobile} {
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    background-color: var(--bg-color);
    box-shadow: var(--header-bottom-shadow);
    z-index: 11;
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

      svg {
        width: 100%;
        height: 100%;
        path {
          color: var(--menu-color);
        }
      }

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
    svg {
      width: 100%;
      height: 100%;
      path {
        color: var(--menu-color);
      }

      &.iconChat {
        width: 80%;
        height: 80%;
        margin-top: 0.4rem;
      }
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
  li.loginMenu {
    width: 100px;
    & > button {
      margin-right: 0%;
      padding: 0 25px;
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

    li.loginMenu {
      width: 76px;
      & > button {
        margin-right: 0%;
        padding: 0 10px;
      }
    }
  }
`;
