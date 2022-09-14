import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { authInstance } from "../../shared/api";

import MainPostList from "./MainPostList";
import Button from "../../elements/Button";

const MainMenu = () => {
  const [best, setBest] = useState(true);
  const [postList, setPostList] = useState([
    {
      id: 1,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
      isImages: true,
    },
    {
      id: 2,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
      isImages: false,
    },
    // {
    //   id: 3,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 4,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 5,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 6,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 7,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 8,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 9,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 10,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 11,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 12,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 13,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 14,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 15,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 16,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 17,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 18,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 19,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 20,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 21,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 22,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 23,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
    // {
    //   id: 24,
    //   imgurl:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberImage:
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
    //   memberName: "김경문",
    // },
  ]);
  const getBestPosts = async () => {
    const res = await authInstance.get(`/api/post/likelist`);
    return setPostList(res.data);
  };
  const getLatestPosts = async () => {
    const res = await authInstance.get(`/api/post/latest`);
    return setPostList(res.data);
  };
  useEffect(() => {
    getBestPosts();
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
          variant={best ? "primary" : "gray"}
          onClick={besthandler}
        >
          BEST
        </Button>
        <Button
          size="medium"
          variant={best ? "gray" : "primary"}
          onClick={latesthandler}
        >
          실시간
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
