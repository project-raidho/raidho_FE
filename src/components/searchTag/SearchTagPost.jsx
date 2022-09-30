import React, { Fragment } from "react";
import { authInstance } from "../../shared/api";
import { useQuery } from "react-query";
// import { useInView } from "react-intersection-observer";
import MainPostCard from "../main/MainPostCard";
import styled from "styled-components";
import Loading from "../../elements/Loading";
import Error from "../../elements/Error";
import SearchAlert from "./SearchAlert";

const getSearchTagPostList = async ({ queryKey }) => {
  const res = await authInstance.get(`/api/search/${queryKey[1]}?page=0`);
  console.log(res);
  return res.data.data;
};

// 무한스크롤
// const SearchTagPost = ({ tagName }) => {
//   const { ref, inView } = useInView();
//   const { data, status, fetchNextPage, isFetchingNextPage, error } =
//     useInfiniteQuery(
//       ["tagPostList"],
//       ({ pageParam = 0 }) => getSearchTagPostList(tagName, pageParam),
//       {
//         cacheTime: 3000,
//         getNextPageParam: (lastPage) => {
//           return !lastPage.last
//             ? lastPage.nextPage
//             : console.log("====> 마지막페이지 입니다");
//         },
//       }
//     );

//   useEffect(() => {
//     if (inView) fetchNextPage();
//     // eslint-disable-next-line
//   }, [inView]);

const SearchTagPost = ({ tagName }) => {
  const { data, status, error } = useQuery(
    ["tagPostList", tagName],
    getSearchTagPostList
  );
  console.log(data);

  if (status === "loading") return <Loading />;
  if (status === "error") return <Error message={error.message} />;

  // console.log("tagPostListQuery :::", data);

  return (
    // <>
    //   {data.pages[0].content.length === 0 && <SearchAlert tagName={tagName} />}
    //   <StPostCardBox>
    //     {data?.pages.map((page, index) => (
    //       <Fragment key={index}>
    //         {page.content.map((post) => (
    //           <MainPostCard key={post.id} post={post} />
    //         ))}
    //       </Fragment>
    //     ))}
    //     {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
    //   </StPostCardBox>
    // </>

    <>
      {data.content.length === 0 && <SearchAlert tagName={tagName} />}
      <StPostCardBox>
        {data.content.map((post) => (
          <MainPostCard key={post.id} post={post} />
        ))}
      </StPostCardBox>
    </>
  );
};

export default SearchTagPost;

const StPostCardBox = styled.div`
  margin-top: 20px;
  column-width: 310px;
  column-gap: 15px;
`;
