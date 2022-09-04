import styled from "styled-components";
import PostDeailImage from "./postDetailImage";
import PostDeailLike from "./PostDetailLike";
import PostDeailUser from "./PostDetailUser";


const PostDeailContainer= ({postDetail, setDetailopen})=> {
  const closeContainer=()=> {
    setDetailopen(false)
  }
    return(
        <StDeailContainer>
     <button  className="closeButton" onClick={closeContainer}>x</button>
       <PostDeailImage images={postDetail.postImgs}/>
        <PostDeailLike postDetail={postDetail}/>
      <PostDeailUser postDetail={postDetail}/>
        <StContentBox>{postDetail.content}</StContentBox>
        </StDeailContainer>

    )
}

export default PostDeailContainer;

const StDeailContainer=styled.div`
    margin-top: 20px;
    width: 500%;
    height: 1200px;
    border: 1px solid;
    border-radius: 20px;
    padding: 20px 50px;
    box-shadow: var(--box-shadow);
  

    .closeButton {
        float: right;
        background-color: transparent;
        border:none;
        margin-top: 10px;
        margin-right: 10px;
        font-size: 18px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  
    }
   
`

const StContentBox=styled.div`
margin-top:20px;
width:100%;
`