import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
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
  return (
    <StFooterWrap isNoNeed={isNoNeed}>
      <StCenterBox>
        <StFooterMenu>
          <li>
            <Link to={`/`}>여행후기</Link>
          </li>
          <li>
            <Link to={`/`}>여행친구찾기</Link>
          </li>
          <li>
            <Link to={`/`}>마이페이지</Link>
          </li>
        </StFooterMenu>
        <h4>
          <BsGithub
            onClick={() =>
              window.open("https://github.com/project-raidho", "_blank")
            }
          />
        </h4>
        <h3>만든 사람들</h3>
        <StOurProfile>
          <ul>
            <li>리더 / FE</li>
            <li>나유진</li>
            <li
              onClick={() =>
                window.open("https://github.com/YooJinRa", "_blank")
              }
            >
              <p>
                <img
                  src="https://avatars.githubusercontent.com/u/99028253?s=96&v=4"
                  alt="프로필 이미지"
                />
              </p>
            </li>
          </ul>
          <ul>
            <li>FE</li>
            <li>김경문</li>
            <li
              onClick={() =>
                window.open("https://github.com/rudans987", "_blank")
              }
            >
              <p>
                <img
                  src="https://avatars.githubusercontent.com/u/97393364?s=96&v=4"
                  alt="프로필 이미지"
                />
              </p>
            </li>
          </ul>
          <ul>
            <li>부리더 / BE</li>
            <li>박상욱</li>
            <li
              onClick={() =>
                window.open("https://github.com/ParkRio", "_blank")
              }
            >
              <p>
                <img
                  src="https://avatars.githubusercontent.com/u/96435200?s=96&v=4"
                  alt="프로필 이미지"
                />
              </p>
            </li>
          </ul>
          <ul>
            <li>BE</li>
            <li>전태훈</li>
            <li
              onClick={() =>
                window.open("https://github.com/JeonTaehun", "_blank")
              }
            >
              <p>
                <img
                  src="https://avatars.githubusercontent.com/u/108983141?s=96&v=4"
                  alt="프로필 이미지"
                />
              </p>
            </li>
          </ul>
          <ul>
            <li>BE</li>
            <li>김성호</li>
            <li
              onClick={() =>
                window.open("https://github.com/kimsoungho", "_blank")
              }
            >
              <p>
                <img
                  src="https://avatars.githubusercontent.com/u/109057206?s=96&v=4"
                  alt="프로필 이미지"
                />
              </p>
            </li>
          </ul>
          <ul>
            <li>DESIGN</li>
            <li>강예진</li>
            <li>
              <p>
                <img
                  src="https://lh3.googleusercontent.com/a-/AOh14Ghl5mUsgXM8Aox11nYk6QJj8cBnvefWlchsfeoyqQ=s100"
                  alt="프로필 이미지"
                />
              </p>
            </li>
          </ul>
        </StOurProfile>
        <p className="copy">&copy; 2022 RAIDHO</p>
      </StCenterBox>
    </StFooterWrap>
  );
};

export default GlobalFooter;

const StFooterWrap = styled.div`
  display: ${(props) => (props.isNoNeed ? "none" : "block")};
  width: 100%;
  height: 310px;
  background-color: var(--sub-color);

  @media (max-width: 639px) {
    height: 350px;
    padding-bottom: 50px;
  }
`;

const StFooterMenu = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  margin-bottom: 1rem;

  li {
    height: 20px;
    border-right: 1px solid var(--gray-color);
    a {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 1rem;
      font-weight: bolder;
      padding: 0 15px;
    }

    &:last-child {
      border-right: 0;
    }
  }
  @media (max-width: 639px) {
    ul {
      li {
        a {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const StCenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 1rem;

  h4 {
    width: 30px;
    height: 30px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
      path {
        color: var(--title-color);
      }
    }
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  p.copy {
    font-size: 0.9rem;
    color: var(--gray-color);
    margin-top: 0.5rem;
  }
  @media (max-width: 639px) {
    h3 {
      font-size: 0.9rem;
    }
    p.copy {
      font-size: 0.7rem;
    }
  }
`;

const StOurProfile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ul {
    width: 75px;
    li {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 3px 0;
      border-bottom: 1px solid var(--gray-color);

      p {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      &:first-child {
        font-size: 0.9rem;
        border-top: 2px solid var(--gray-color);
      }
      &:nth-child(2) {
        font-size: 1.1rem;
        font-weight: bold;
      }
      &:last-child {
        cursor: pointer;
      }
    }
  }

  @media (max-width: 639px) {
    ul {
      width: 58px;
      li {
        p {
          width: 48px;
          height: 48px;
        }

        &:first-child {
          font-size: 0.75rem;
          border-top: 2px solid var(--gray-color);
        }
        &:nth-child(2) {
          font-size: 0.9rem;
          font-weight: bold;
        }
      }
    }
  }
`;
