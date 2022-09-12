import styled from "styled-components";

const PostDeailUser= ({postDetail})=> {
  
    return(
        <StUserWrapper>
          <div className="profileBox"><img className="profileImg"  src={postDetail.memberImage} alt="프로필이미지"/></div>
          <StProfileRightBox>
          <h2>{postDetail.memberName}</h2>
          <div>2022년 9월 1일 게시</div>
           <div className="tagList">{postDetail.tags.map((tag, i)=> (
            <div key={i}>{tag}</div>
        ))}</div>
         <div className="tagList">{postDetail.locationTags.map((tag, i)=> (
            <div key={i}>{tag}</div>
        ))}</div>
          </StProfileRightBox>
        
       
        </StUserWrapper>
    )
}

export default PostDeailUser;

const StUserWrapper = styled.div`
display:flex;
margin-top: 10px;
.profileBox{ 
     width: 60px;
    height: 60px; 
    border-radius: 70%;
    overflow: hidden;
    }
    .profileImg {
        width: 100%;
    height: 100%;
    object-fit: cover;
    }
    .tagList {
        display:flex;
         gap:10px
    }
`


const StProfileRightBox = styled.div`
 display: grid;
margin-left: 20px;
grid-row-gap: 10px;

`
