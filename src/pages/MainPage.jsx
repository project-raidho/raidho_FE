import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import MainBanner from "../components/main/MainBanner";
import MainContainer from "../components/main/MainContainer";
import styled from "styled-components";
import { FaArrowAltCircleUp } from "react-icons/fa";

const MainPage = () => {
  const { stateName } = useParams();
  const [state, setState] = useState(
    stateName === undefined ? "latest" : stateName
  );

  useEffect(() => {
    const changeState = stateName === undefined ? "latest" : stateName;
    setState(changeState);
  }, [stateName, state]);

  const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
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
  return (
    <StMainPageWrap>
      <MainBanner />
      <StLayout>
        <StMainNav>
          {stateName === undefined ? (
            <p>
              <a href="/" className="active">
                실시간
              </a>
            </p>
          ) : (
            <p onClick={() => setState("latest")}>
              <NavLink
                to={`/latest`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                실시간
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
        <MainContainer state={state} handleTop={handleTop} />
      </StLayout>
      <FaArrowAltCircleUp
        color="red"
        className={BtnStatus ? "topBtn active" : "topBtn"} // 버튼 노출 여부
        onClick={handleTop} // 버튼 클릭시 함수 호출
      />
    </StMainPageWrap>
  );
};

export default MainPage;

const StMainPageWrap = styled.div`
  padding-top: 170px;

  .topBtn {
    position: fixed;
    opacity: 0;
    bottom: 50px;
    right: 50px;
    z-index: -10;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 0 none;
    background-color: var(--bg-color);
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.06em;

    cursor: pointer;
    transition: opacity 0.3s ease-in;
  }
  .topBtn.active {
    z-index: 10;
    opacity: 1;
  }

  .topBtn:hover,
  .topBtn:focus,
  .topBtn:active {
    outline: 0 none;
  }
`;
const StMainNav = styled.div`
  /* position: fixed;
  left: 0;
  top: 70px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 0.8rem 0;
  /* box-shadow: var(--box-shadow); */
  background-color: var(--bg-color);
  /* z-index: 4; */

  p {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--lightGray-color);
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
  @media (max-width: 639px) {
    /* top: 57px; */
    justify-content: center;
    padding: 0.8rem 0 0;
    margin-top: 30px;
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
`;
