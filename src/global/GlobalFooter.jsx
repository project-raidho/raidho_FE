import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const GlobalFooter = () => {
  const { pathname } = useLocation();
  const [isNoNeed, setIsNoNeed] = useState(false);

  const checkNoNeedFooter = () => {
    const checkUrl = pathname.includes("chatting");
    setIsNoNeed(checkUrl);
  };

  useEffect(() => {
    checkNoNeedFooter();
    // eslint-disable-next-line
  }, [pathname]);

  console.log("footer location =====>>>>>", pathname);
  return <StFooterWrap isNoNeed={isNoNeed}>ddddd</StFooterWrap>;
};

export default GlobalFooter;

const StFooterWrap = styled.div`
  display: ${(props) => (props.isNoNeed ? "none" : "block")};
  width: 100%;
  height: 100px;
  background-color: var(--sub-color);

  @media (max-width: 639px) {
    height: 200px;
    padding-bottom: 100px;
  }
`;
