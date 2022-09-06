import styled from "styled-components";
const KakaoOauth=()=> {

const CLIENT_ID = "	fc00c4665f0eb89984830e7a1189b9ca";
const REDIRECT_URI =  "http://raidho.site/oauth/kakao";

 const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

 return(
    <h1>
        <Kakaobutton className="kakao" href={KAKAO_AUTH_URL}><img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          alt="kakao"
        /></Kakaobutton>
    </h1>
)
}

export default KakaoOauth;


const Kakaobutton =styled.a`
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -.04em;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    color: #1c1c1c;
    border: none;

 img {
  width: 268px;
 }
`
