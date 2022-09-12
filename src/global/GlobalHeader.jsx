import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { getDarkMode, updateDarkMode } from "../redux/modules/searchSlice";
import { useSelector, useDispatch } from "react-redux";
import Button from "../elements/Button";
import Potal from "../global/globalModal/Potal";
import LoginModal from "../components/login/LoginContainer";
import SearchContainer from "../components/header/search/SearchContainer";
import styled from "styled-components";
import RaidhoLogo from "../assets/raidhoLogo.svg";
import AddPostIcon from "../assets/addPost.svg";
import GoChattingIcon from "../assets/goChatting.svg";
import DefaultMemberImage from "../assets/defaultProfileImage.svg";

const GlobalHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkDarkMode = useSelector((state) => state.searchSlice.darkMode);

  // ::: 유저 프로필 이미지 적용하기
  const memberImage =
    localStorage.getItem("memberImage") === "null"
      ? `${DefaultMemberImage}`
      : localStorage.getItem("memberImage");

  // ::: 로그인 여부 확인하기
  const [isLogin, setIsLogin] = useState(false);
  const userIsLogin = localStorage.getItem("Authorization");

  // ::: 유저 토글 메뉴 확인하기
  const [isToggle, setIsToggle] = useState(false);

  // ::: 게시글 추가 메뉴 확인하기
  const [isAddPostToggle, setIsAddPostToggle] = useState(false);

  // ::: 모달 여부 확인하기
  const [modalOn, setModalOn] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // ::: 로그아웃 하기
  const onClickLogOut = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("memberImage");
    localStorage.removeItem("memberName");
    localStorage.removeItem("memberIntro");

    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    // ::: 로그인 여부 확인하기
    userIsLogin !== null ? setIsLogin(true) : setIsLogin(false);
  }, [userIsLogin]);

  // ::: Dark & Light 기능구현
  useEffect(() => {
    dispatch(getDarkMode());
    if (checkDarkMode) {
      document.getElementsByTagName("html")[0].classList.add("darkMode");
    }
  }, []);

  const darkOnOff = (event) => {
    if (
      document.getElementsByTagName("html")[0].classList.contains("darkMode")
    ) {
      document.getElementsByTagName("html")[0].classList.remove("darkMode");
      dispatch(updateDarkMode(false));
    } else {
      document.getElementsByTagName("html")[0].classList.add("darkMode");
      dispatch(updateDarkMode(true));
    }
  };

  return (
    <StGlobalHeaderWrap>
      <StGlobalLayoutHeader>
        <StHeaderRow>
          <StRaidhoLogo>
            <Link to={"/"}>
              <img src={RaidhoLogo} alt="RaidhoLogo" />
            </Link>
          </StRaidhoLogo>
          <SearchContainer isLogin={isLogin} />
          <StHeaderMidMenu>
            <NavLink
              to={`/`}
              className={({ isActive }) => (isActive ? "selected" : "not")}
            >
              여행 후기
            </NavLink>
            <NavLink
              to={`/meetingList`}
              className={({ isActive }) => (isActive ? "selected" : "not")}
            >
              여행 친구 찾기
            </NavLink>
            <StSwitchButton>
              <input
                type="checkbox"
                onClick={darkOnOff}
                //ref={RefDarkModeButton}
                checked={checkDarkMode && "checked"}
              />
              <span className="onoffSwitch"></span>
            </StSwitchButton>
          </StHeaderMidMenu>
          {isLogin ? (
            <StHeaderRightMenu>
              <div className="rightMenu">
                <p
                  onClick={() => {
                    setIsToggle(false);
                    setIsAddPostToggle(!isAddPostToggle);
                  }}
                >
                  <img src={AddPostIcon} alt="게시물 추가하러 가기" />
                </p>

                <StToggleBox isToggle={isAddPostToggle}>
                  <li>
                    <Link to={`/createPost`}>여행 후기 작성하기</Link>
                  </li>
                  <li>
                    <Link to={`/createMeeting`}>모집글 작성하기</Link>
                  </li>
                </StToggleBox>
              </div>
              <div className="rightMenu">
                <Link to={"/chatting"}>
                  <img src={GoChattingIcon} alt="채팅하러 가기" />
                  <span>5</span>
                </Link>
              </div>
              <div
                className="rightMenu userMenu"
                onClick={() => {
                  setIsAddPostToggle(false);
                  setIsToggle(!isToggle);
                }}
              >
                <img src={memberImage} alt="사용자 프로필 이미지" />
              </div>
              <StToggleBox isToggle={isToggle}>
                <li>
                  <Link to={`/myProfile`}>마이페이지</Link>
                </li>
                <li onClick={onClickLogOut}>로그아웃</li>
              </StToggleBox>
            </StHeaderRightMenu>
          ) : (
            <StHeaderRightMenu>
              <Button size="small" variant="primary" onClick={handleModal}>
                로그인
              </Button>
              <Potal>{modalOn && <LoginModal onClose={handleModal} />}</Potal>
            </StHeaderRightMenu>
          )}
        </StHeaderRow>
      </StGlobalLayoutHeader>
    </StGlobalHeaderWrap>
  );
};

export default GlobalHeader;

const StGlobalHeaderWrap = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 58px;
  background-color: var(--bg-color);
  /* transition: 1s; */
  padding: 30px 0;
  z-index: 10;

  /* &.originHeader {
    height: 135px;
    padding-top: 80px;
    padding-bottom: 50px;
  }
  &.changeHeader {
    position: fixed;
    left: 0;
    top: 0;
    height: 105px;
    padding: 25px 0;
    z-index: 10;
  } */
`;

const StButtonDarkMode = styled.button`
  position: absolute;
  top: 50px;
  left: 50px;
`;

const StSwitchButton = styled.label`
  position: relative;
  width: 55px;
  height: 30px;
  margin-left: 10px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .onoffSwitch {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background-color: #ccc;
    box-shadow: inset 1px 5px 1px var(--gray-color);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .onoffSwitch:before {
    position: absolute;
    content: "";
    height: 22px;
    width: 22px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    -webkit-transition: 0.5s;
    transition: 0.4s;
    border-radius: 20px;
  }

  input:checked + .onoffSwitch {
    background-color: var(--main-color);
    box-shadow: inset 1px 5px 1px var(--main-color);
  }

  input:checked + .onoffSwitch:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

const StGlobalLayoutHeader = styled.div`
  width: 100%;
  max-width: 1305px;
  margin: 0 auto;
`;

const StHeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StRaidhoLogo = styled.h1`
  width: 200px;
  height: 55px;
  padding-top: 0.6rem;
`;

const StHeaderMidMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  a {
    margin-right: 0.5rem;
    font-size: 1.5rem;
  }
  .selected {
    border-bottom: 2px solid var(--title-color);
  }
  .not {
  }
`;

const StHeaderRightMenu = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  .rightMenu {
    position: relative;
    margin-right: 18px;
  }

  .userMenu {
    width: 55px;
    height: 55px;
    border: 1px solid var(--gray-color);
    border-radius: 50%;
    background-color: var(--main-color);
    margin-right: 0;
    overflow: hidden;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .rightMenu span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 22px;
    height: 22px;
    color: #ffffff;
    text-align: center;
    line-height: 22px;
    border-radius: 50%;
    background-color: var(--main-color);
    margin-left: 10px;
  }
`;

const StToggleBox = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  right: 0px;
  top: 70px;
  width: 150px;
  height: ${(props) => (props.isToggle === true ? "100px" : "0px")};
  border: ${(props) =>
    props.isToggle === true ? "1px solid var(--gray-color)" : "0px"};
  background-color: var(--bg-color);
  padding: ${(props) => (props.isToggle === true ? "0.5rem 1rem" : "0px")};
  margin-right: -50px;
  overflow: hidden;
  transition: 0.3s;
  z-index: 10;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    text-align: center;
    font-size: 1.2rem;
    border-bottom: 1px solid var(--gray-color);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    a {
      font-size: 1.2rem;
    }
  }

  li:last-child {
    border-bottom: none;
  }
`;
