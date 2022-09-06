const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID
const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID
const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_CALLBACK_URL
// const NAVER_CLIENT_ID = "oq32J_8jgLtjcSRvYUO4";
// const NAVER_REDIRECT_URI = "https://xn--wk0b636a.com/user/naver/callback";



const GOOGLE_CLIENT_ID ="418085046130-194eqk6jjjmn32gnfiv6g331ooh985de.apps.googleusercontent.com";
const GOOGLE_REDIRECT_URI = "https://xn--wk0b636a.com/user/google/callback";

const randomString = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const stringLength = 6;
  let randomstring = "";
  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }
  return randomstring;
};
const newState = randomString();

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email%20profile%20openid&access_type=offline`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=${newState}`;