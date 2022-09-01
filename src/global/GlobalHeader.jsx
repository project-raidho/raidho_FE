import React, {useState} from "react";
import { Link } from "react-router-dom";
import GlobalLayout from "./GlobalLayout";
import Button from "../elements/Button";
import Potal from "../global/globalModal/Potal";
import LoginModal from "../components/login/LoginContainer";
import SearchContainer from "../components/header/search/SearchContainer";
import styled from "styled-components";
import RaidhoLogo from "../assets/raidhoLogo.svg";
import AddPostIcon from "../assets/addPost.svg";
import GoChattingIcon from "../assets/goChatting.svg";


const GlobalHeader = () => {
  // ::: 로그인 여부 확인하기
  const [ isLogin, setIsLogin ] = useState(false);

  // ::: 로그인 여부에 따라 헤더 레이아웃 달리 적용하기 위해 테스트용으로 사용
  const testCheckedLogin = (event) => {
    setIsLogin(event.target.checked);
  }

  // ::: 모달 여부 확인하기
  const [ modalOn, setModalOn ] = useState(false);
  const handleModal = () => {
    setModalOn(!modalOn);
  }

  return(
    <StGlobalHeaderWrap>
      <label className="testCheckedLogin">
        <input type="checkbox" onClick={testCheckedLogin} /> 로그인 여부 확인
      </label>
      <GlobalLayout>
        <StHeaderRow>
          <StRaidhoLogo>
            <Link to={'/'}>
              <img src={RaidhoLogo} alt="RaidhoLogo" />
            </Link>
          </StRaidhoLogo>
          <SearchContainer isLogin={isLogin} />
          {isLogin ?
            <StHeaderRightMenu>
              <p>
                <Link to={'/createPost'}>
                  <img src={AddPostIcon} alt="게시물 추가하러 가기" />
                </Link>
              </p>
              <p>
                <Link to={'/meetingList'}>
                  <img src={GoChattingIcon} alt="채팅하러 가기" />
                  <span>5</span>
                </Link>
              </p>
              <p>
                <Link to={'/myProfile'}>
                  {/* ::: 로그인한 유저 프로필 이미지 넣어야 함 / 링크에 유저아이디 연결?! */}
                  
                </Link>
              </p>
            </StHeaderRightMenu>
          :
            <StHeaderRightMenu>
              <Button 
                size="small"
                variant="primary"
                onClick={handleModal}>로그인</Button>
              <Potal>
                {modalOn && <LoginModal onClose={handleModal} /> }
              </Potal>
            </StHeaderRightMenu>
          }
        </StHeaderRow>
      </GlobalLayout>
    </StGlobalHeaderWrap>
  );
};

export default GlobalHeader;

const StGlobalHeaderWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 135px;
  padding-top: 80px;
  margin-bottom: 58px;
  background-color: var(--bg-color);

  .testCheckedLogin {
    position: absolute;
    top: 10px;
    left: 10px;
  }
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

const StHeaderRightMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;

  p {
    position: relative;
    margin-right: 18px;
  }

  p:last-child {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: var(--main-color);
    margin-right: 0;
    overflow: hidden;
  }

  p span {
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
