import React from 'react';
import styled from 'styled-components';

interface Props {
  isMore: boolean;
}

function MyPostList({ isMore }: Props) {
  // ::: 내 글 목록 데이터 샘플
  const myPosts = [
    {
      id: 1,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsYeU_xa0PN9zgmYzlkTMVGKJ4ulAGevTa9A&usqp=CAU',
    },
    {
      id: 2,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUyJZAKnMKvY9z06Qm1jUAK3THBjrHqwaww&usqp=CAU',
    },
    {
      id: 3,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnq-U57cbWEIFs5g7iIf1t6CzLXQC1JL2s3g&usqp=CAU',
    },
    {
      id: 4,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInE9w_wk9gHxSLJ44RL2NoVHnIDjXNPEgbw&usqp=CAU',
    },
    {
      id: 5,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC2knmb8t5SUvbiz2Y0hVD1aqSXzcqeb1Y0g&usqp=CAU',
    },
  ];

  return (
    <StMyPostListWrap isMore={isMore}>
      {myPosts.map((post) => (
        <StPostCard key={post.id}>
          <img src={post.imageUrl} alt="내글리스트" />
        </StPostCard>
      ))}
    </StMyPostListWrap>
  );
}

export default MyPostList;

const StMyPostListWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  height: ${(props: any) => (props.isMore === true ? 'auto' : '400px')};
  background-color: var(--bg-color);
  overflow: hidden;
`;

const StPostCard = styled.div`
  width: 300px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
