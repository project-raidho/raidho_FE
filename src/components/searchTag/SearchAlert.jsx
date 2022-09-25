import React from "react";
import styled from "styled-components";
import Info from "../../elements/Info";

const SearchAlert = ({ tagName }) => {
  return (
    <StAlertWrap>
      <>
        <StIconBox>
          <Info />
        </StIconBox>

        <div>
          <h3>
            <strong>{tagName}</strong>에 대한 검색결과가 없습니다.
          </h3>
          <p>
            - 단어의 철자가 정확한지 확인해 보세요.
            <br />
            - 한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.
            <br />
            - 검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해
            보세요. <br />
            - 두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요. <br />
          </p>
        </div>
      </>
    </StAlertWrap>
  );
};

export default SearchAlert;

const StAlertWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  h3 {
    padding: 2rem 1rem 0 1rem;
    strong {
      font-size: 1.5rem;
      border-bottom: 1px solid var(--title-color);
    }
  }
  p {
    font-size: 1.2rem;
    line-height: 1.5;
    padding: 0 1rem;
  }

  @media (max-width: 639px) {
    flex-direction: column;
  }
`;

const StIconBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 3rem;
  margin-right: 1rem;
  overflow: hidden;

  @media (max-width: 639px) {
    width: 50px;
    height: 50px;
    min-width: 50px;
    min-height: 50px;
  }
`;
