import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import MainPostCard from './MainPostCard';
import PostDeailContainer from './postDetail/PostDetailContainer';

type BestProps = {
  best: boolean;
};

function MainPostList({ best }: BestProps) {
  const initial = [
    {
      id: 1,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    },
    {
      id: 2,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU',
    },
    {
      id: 3,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU',
    },
    {
      id: 4,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU',
    },
    {
      id: 5,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU',
    },
    {
      id: 6,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    },
    {
      id: 7,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU',
    },
    {
      id: 8,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU',
    },
    {
      id: 9,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU',
    },
    {
      id: 10,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU',
    },
    {
      id: 11,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    },
    {
      id: 12,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU',
    },
    {
      id: 13,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU',
    },
    {
      id: 14,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU',
    },
    {
      id: 15,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU',
    },
    {
      id: 16,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    },
    {
      id: 17,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU',
    },
    {
      id: 18,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU',
    },
    {
      id: 19,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU',
    },
    {
      id: 20,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU',
    },
    {
      id: 21,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    },
    {
      id: 22,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU',
    },
    {
      id: 23,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU',
    },
    {
      id: 24,
      imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU',
    },
  ];
  useEffect(() => {
    if (best) {
      getbestimages();
    } else {
      getbestimages();
    }

    // eslint-disable-next-line
  }, []);
  const [postList, setPostList] = useState(initial);
  const URI = process.env.REACT_APP_BASE_URI;
  const getbestimages = async () => {
    const res = await axios.get(`${URI}/bestPostList`);
    return setPostList(res.data);
  };
  // const [postDetail, setPostDetail] = useState(
  //   {
  //     id: 1,
  //     content: "너무 멋져요~~",
  //     postImgs: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU"],
  //     tags: ["#등산", "#한라산"],
  //     locationTags: ["#경기", "#안양"],
  //     heartCount: 100,
  //     memberId: 1,
  //     memberImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU",
  //     memberName: "김경문",
  //   }
  // );

  const postDetail = {
    id: 1,
    content: '너무 멋져요~~',
    postImgs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU'],
    tags: ['#등산', '#한라산'],
    locationTags: ['#경기', '#안양'],
    heartCount: 100,
    memberId: 1,
    memberImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU',
    memberName: '김경문',
  };

  // ::: 상세보기 가져오는 axios
  const getpostdetail = async (id: number) => {
    const res = await axios.get(`${URI}/detail/${id}`);
    return res;
    // setPostDetail(res.data);
  };
  // ::: 상세보기 열고 닫는 state
  const [detailopen, setDetailopen] = useState(false);
  const detailhandler = (id: number) => {
    getpostdetail(id);
    setDetailopen(true);
    return id;
  };

  return (
    <StPostLisWrapp>
      <StitemList>
        {postList.map((post) => (
          <MainPostCard key={post.id} image={post.imgurl} onClickhandler={() => detailhandler(post.id)} />
        ))}
      </StitemList>
      {detailopen && <PostDeailContainer postDetail={postDetail} setDetailopen={setDetailopen} />}
    </StPostLisWrapp>
  );
}

export default MainPostList;

const StPostLisWrapp = styled.div`
  display: flex;
`;

const StitemList = styled.div`
  margin-top: 20px;
  column-width: 300px;
  column-gap: 15px;
`;
