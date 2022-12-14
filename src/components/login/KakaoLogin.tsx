import React, { useEffect } from "react";
import { instance } from "../../shared/api";
import { useLocation, useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const kakaoLoginAction = async () => {
    try {
      const KAKAO_CODE = location.search.split("=")[1];
      // console.log(KAKAO_CODE);
      const res = await instance.get(
        `/login/oauth2/code/kakao?code=${KAKAO_CODE}`
      );
      // console.log(res);
      localStorage.setItem("Authorization", res.headers.authorization);
      localStorage.setItem("refreshToken", res.headers.refreshtoken);
      localStorage.setItem("memberId", res.data.id);
      localStorage.setItem("memberName", res.data.memberName);
      localStorage.setItem("memberIntro", res.data.memberIntro);
      localStorage.setItem("memberImage", res.data.memberImage);
      localStorage.setItem("providerId", res.data.providerId);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    kakaoLoginAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>.</>;
};

export default KakaoLogin;
