import React from 'react';
import styled from 'styled-components';
import { FaFacebookSquare } from 'react-icons/fa';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
// import FacebookLogin from 'react-facebook-login';



const FaceBookLogin = ({ oAuthLoginHandler }) => {
  
  const responseFacebook = (response) => {
    const { id, email } = response; //페이스북 응답객체에서 id와 email을 할당한 후 
    console.log(response)
    oAuthLoginHandler(Number(id), email);  // props로 내려준 oAuthLoginHandler라는 함수에 인자로 넘겨준다.
  };

  return (
    <StWrapper>
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
                marginLeft: "20px",
                marginRight: '23px',
                fontSize: '26px'
              }}
            />
            <ButtoninnerText>페이스북 계정으로 로그인</ButtoninnerText>
          </ButtonInnerDiv>
        </FaceBookLoginButton>
      )}
    ></FacebookLogin>
    </StWrapper>
   
  );
};

export default FaceBookLogin;

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const FaceBookLoginButton = styled.button`
margin-top: 20px;
    width: 268px;
    height: 60px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -.04em;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    border: none;
    background-color: #4267b2;
`;

const ButtonInnerDiv = styled.div`
width: 300px;
display: flex;
`;

const ButtoninnerText = styled.h3`
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    color:#fff
`;