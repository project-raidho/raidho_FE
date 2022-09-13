// import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";

import MainPostCard from "./MainPostCard";

const MainPostList = ({ postList }) => {
  useEffect(() => {
    // getbestimages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ::: 상세보기 열고 닫는 state
  // const [detailopen, setDetailopen] = useState(false)
  // const detailhandler = (id) => {
  //   //getpostdetail(id)
  //   setDetailopen(true)
  // };

  return (
    <StPostLisWrapp>
      <StitemList>
        {postList.map((post) => (
          <MainPostCard key={post.id} post={post} />
        ))}
      </StitemList>
      {/* {detailopen && <PostDeailContainer postDetail={postDetail} setDetailopen={setDetailopen} />} */}
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
