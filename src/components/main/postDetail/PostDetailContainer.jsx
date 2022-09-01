import styled from "styled-components";
import PostDeailLike from "./PostDetailLike";
import PostDeailUser from "./PostDetailUser";


const PostDeailContainer= ({postDetail, setDetailopen})=> {
  const closeContainer=()=> {
    setDetailopen(false)
  }
    return(
        <StDeailContainer>
       <button  className="closeButton" onClick={closeContainer}>x</button>
        <img className="postImg" src={postDetail.postImgs[0]} alt="img"/>
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

    .closeButton {
        float: right;
        background-color: #fff;
        border:none;
        margin-top: 20px;
        margin-right: 20px;
        font-size: 18px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    }
    .postImg{
        margin-top: 20px;   
        width:100%;
    } 
`

const StContentBox=styled.div`
margin-top:20px;
width:100%;
`