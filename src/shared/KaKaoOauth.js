const CLIENT_ID = "	fc00c4665f0eb89984830e7a1189b9ca";
const REDIRECT_URI =  "http://raidho.site/oauth/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;