import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MainBanner from "../components/main/MainBanner";
import MainContainer from "../components/main/MainContainer";
import IntroTutorial from "../components/main/IntroTutorial";
import Potal from "../global/globalModal/Potal";
import styled from "styled-components";
import { MdKeyboardArrowUp } from "react-icons/md";

const MainPage = () => {
  const location = useLocation();
  const [state, setState] = useState<string>(
    location.pathname === "/" ? "latest" : location.pathname.split("/")[1]
  );

  // ::: 모달 여부 확인하기
  const [modalOn, setModalOn] = useState<boolean>(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  };

  // ::: 처음 들어온 유저인지 확인
  const isFirstUser = localStorage.getItem("firstUser");

  useEffect(() => {
    const changeState =
      location.pathname === "/" ? "latest" : location.pathname.split("/")[1];
    setState(changeState);
  }, [location.pathname, state]);

  const [ScrollY, setScrollY] = useState<number>(0); // 스크롤값을 저장하기 위한 상태
  const [BtnStatus, setBtnStatus] = useState<boolean>(false); // 버튼 상태
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setBtnStatus(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  // ::: 처음 들어온 유저 확인
  useEffect(() => {
    if (!isFirstUser || isFirstUser === null) {
      setModalOn(true);
    } else {
      setModalOn(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <StMainPage>
      <MainBanner />
      <StLayout>
        <StMainNav>
          {location.pathname === "/" ? (
            <p>
              <a href="/" className="active">
                최신순
              </a>
            </p>
          ) : (
            <p onClick={() => setState("latest")}>
              <NavLink
                to={`/latest`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                최신순
              </NavLink>
            </p>
          )}
          <p onClick={() => setState("likelist")}>
            <NavLink
              to={`/likelist`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              추천순
            </NavLink>
          </p>
        </StMainNav>
        <MainContainer state={state} />
      </StLayout>
      <MdKeyboardArrowUp
        className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
      />
      <Potal>{modalOn && <IntroTutorial onClose={handleModal} />}</Potal>
    </StMainPage>
  );
};

export default MainPage;

const StMainPage = styled.div`
  width: 100%;
  padding-top: 170px;

  // top 버튼 적용
  .topBtn {
    position: fixed;
    opacity: 0;
    bottom: 2rem;
    right: 2rem;
    z-index: -10;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 0 none;
    background-color: var(--bg-color);
    box-shadow: var(--box-shadow);
    cursor: pointer;
    transition: opacity 0.3s ease-in;
    path {
      color: var(--title-color);
    }
  }
  .topBtn.active {
    z-index: 6;
    opacity: 1;
  }
  .topBtn:hover,
  .topBtn:focus,
  .topBtn:active {
    outline: 0 none;
  }

  @media ${(props) => props.theme.mobile} {
    padding-top: 250px;

    .topBtn {
      bottom: 60px;
      right: 1rem;
    }
  }
`;

const StMainNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.8rem 0;
  background-color: var(--bg-color);

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--gray-color);
    margin-right: 1rem;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #ffffff;
    width: 100%;
    height: 100%;
    &.active {
      background-color: var(--main-color);
    }
  }
  @media ${(props) => props.theme.mobile} {
    justify-content: center;
    padding: 0.8rem 0 0;

    p {
      width: 100px;
      height: 30px;
      border-radius: 15px;
      margin-right: 0.5rem;
      a {
        font-size: 1rem;
      }
    }
  }
`;

const StLayout = styled.div`
  padding-top: 190px;
  max-width: 1305px;
  margin: 0 auto;

  @media ${(props) => props.theme.mobile} {
    padding-top: 70px;
  }
`;
