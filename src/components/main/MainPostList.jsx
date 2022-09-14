// import axios from "axios";
import React from "react";
import styled from "styled-components";

import MainPostCard from "./MainPostCard";

const MainPostList = ({ postList }) => {
  return (
    <StPostLisWrapp>
      <StitemList>
        {postList.map((post) => (
          <MainPostCard key={post.id} post={post} />
        ))}
      </StitemList>
    </StPostLisWrapp>
  );
};

export default MainPostList;

const StPostLisWrapp = styled.div`
  display: flex;
`;

const StitemList = styled.div`
  margin-top: 20px;
  column-width: 310px;
  column-gap: 15px;
`;
