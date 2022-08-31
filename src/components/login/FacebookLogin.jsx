import React from 'react';
import styled from 'styled-components';
import { FaFacebookSquare } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const FaceBookLoginButton = styled.button`
    width: 300px;
    height: 60px;
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -.04em;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1c1c1c;
    border: none;
`;

const ButtonInnerDiv = styled.div`
width: 300px;
display: flex;
`;

const ButtoninnerText = styled.h3`
font-size: 14px;
`;

const FaceBookLogin = ({ oAuthLoginHandler }) => {
  
  const responseFacebook = (response) => {
    const { id, email } = response; //페이스북 응답객체에서 id와 email을 할당한 후 
    oAuthLoginHandler(Number(id), email);  // props로 내려준 oAuthLoginHandler라는 함수에 인자로 넘겨준다.
  };
  
  return (
    <FacebookLogin
      appId="478386947176217" // 페이스북 앱 등록 후, 생성되는 앱 아이디를 넣어준다.
      autoLoad={false} // 자동 실행 여부를 정해줄 수 있다.
      fields="name,email,picture" // fields 설정
      callback={responseFacebook} 
      
      render={(renderProps) => (
        <FaceBookLoginButton>
          <ButtonInnerDiv onClick={renderProps.onClick}>
            <FaFacebookSquare
              style={{
                marginRight: '23px',
                fontSize: '26px',
              }}
            />
            <ButtoninnerText>페이스북 계정으로 로그인</ButtoninnerText>
          </ButtonInnerDiv>
        </FaceBookLoginButton>
      )}
    ></FacebookLogin>
  );
};

export default FaceBookLogin;