import React, { useState} from "react";
import styled from "styled-components";
import HeartButton from "../HeartButton"
import axios from "axios";

const PostDeailLike= ({postDetail})=> {
    const initial=postDetail.heartCount
    const [heartCount, setHeartCount]=useState(initial)
    console.log(heartCount)
    const [like, setLike] = useState(false)

    console.log(like)
    const URI = process.env.REACT_APP_BASE_URI;
  
    let config = {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        },
      };

    const toggleLike = async () => {
        
         
          if(like===false){
            setHeartCount(heartCount+1)
             await axios.post(`${URI}/detail/like`, {like:true}, config)
          }else{
            setHeartCount(heartCount-1)
            await axios.post(`${URI}/detail/like`, {like:false}, config)
          }
          setLike(!like)
      
            
          
           // [POST] 사용자가 좋아요를 누름 -> DB 갱신
         
        }
    return(
        <StlikeWrapper>
        <StHeartCountBox>{heartCount}</StHeartCountBox>
        <HeartButton like={like} onClick={toggleLike}/>
        </StlikeWrapper>
    )
}

export default PostDeailLike;

const StlikeWrapper=styled.div`
    display:flex;
    float:right;
`
const StHeartCountBox=styled.div`
    margin-right: 10px;
`