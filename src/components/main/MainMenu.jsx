import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { authInstance } from "../../shared/api";

import MainPostList from "./MainPostList";
import Button from "../../elements/Button";

const MainMenu = () => {
  const [best, setBest] = useState(false);
  const [postList, setPostList] = useState([
    {
      id: 0,
      imgurl: "",
      memberImage: "",
      memberName: "",
      isImages: true,
      multipartFiles: [],
      heartCount: 100,
      isHeartMine: true,
    },
  ]);
  const getBestPosts = async () => {
    const res = await authInstance.get(`/api/post/likelist`);
    console.log(res);
    return setPostList(res.data.data.content);
  };
  const getLatestPosts = async () => {
    const res = await authInstance.get(`/api/post/latest`);

    console.log(res);
    return setPostList(res.data.data.content);
  };
  useEffect(() => {
    getLatestPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const besthandler = () => {
    getBestPosts();
    setBest(true);
  };
  const latesthandler = () => {
    getLatestPosts();
    setBest(false);
  };
  return (
    <>
      <StMenuset>
        <Button
          size="medium"
          variant={best ? "gray" : "primary"}
          onClick={latesthandler}
        >
          실시간
        </Button>
        <Button
          size="medium"
          variant={best ? "primary" : "gray"}
          onClick={besthandler}
        >
          추천순
        </Button>
      </StMenuset>
      <MainPostList postList={postList} />
    </>
  );
};

export default MainMenu;
const StMenuset = styled.div`
  display: flex;
  button {
    margin-right: 1.5rem;
  }
`;
