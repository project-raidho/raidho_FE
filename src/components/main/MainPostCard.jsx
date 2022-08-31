import styled from "styled-components";
// import axios from "axios";
import HeartButton from "./HeartButton";
import React, { useState, useEffect } from "react";

const MainPostCard= ({image})=> {

    const [like, setLike] = useState(false)
    
    useEffect( () => {
    //   const fetchData = async () => {
    //     const URI = process.env.REACT_APP_BASE_URI
    //     const res = await axios.get(`${URI}/post`)
    //     if (res.data.type === 'liked') setLike(true)
    //   }
    //   fetchData()
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    const toggleLike = async (e) => {
    //   const res = await axios.post(...) // [POST] 사용자가 좋아요를 누름 -> DB 갱신
      setLike(!like)
    }

  
    return(
        
        <Stfigure>
        <img className="img" src={image} alt="img"/>
        <HeartButton className="likebutton" like={like} onClick={toggleLike}/>
        </Stfigure>
       
    )
}

export default MainPostCard;

const Stfigure=styled.figure`
    display:inline-block;
    position: relative;
    
    margin:0;
    width:300px;
    margin-bottom: 15px;
    .img{
        width:100%;
        position: relative;
    }
    .likebutton{
        position:absolute;
        top: 20px;
         left : 10px;
    }

`
