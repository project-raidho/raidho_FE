import React, { useState} from "react";

import HeartButton from "../HeartButton"


const PostDeailLike= ({postDetail})=> {
    const [like, setLike] = useState(false)
    const toggleLike = async (e) => {
        //   const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
          setLike(!like)
        }
    return(
        <>
        <div>{postDetail.heartcount}</div>
        <HeartButton className="likebutton" like={like} onClick={toggleLike}/>

        </>
    )
}

export default PostDeailLike;