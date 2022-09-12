// import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import MainPostCard from "./MainPostCard";

const MainPostList = ({ best }) => {
  //const [postList, setPostList] = useState(initial);
  const postList = [
    {
      id: 1,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 2,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 3,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 4,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 5,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 6,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 7,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 8,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 9,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 10,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 11,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 12,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 13,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 14,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 15,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 16,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 17,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 18,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 19,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 20,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 21,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 22,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 23,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
    {
      id: 24,
      imgurl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
      memberName: "김경문",
    },
  ];
  useEffect(() => {
    // getbestimages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const URI = process.env.REACT_APP_BASE_URI;
  // const getbestimages = async () => {
  //   const res = await axios.get(`${URI}/bestPostList`);
  //   return setPostList(res.data);
  // }

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
  column-width: 300px;
  column-gap: 15px;
`;
