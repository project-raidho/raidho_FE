import axios from "axios";
import { useEffect } from "react";
import { useLocation,
     useNavigate 
    } from "react-router-dom";

const KakaoLogin= ()=> {
    const location =useLocation();
    const navigate=useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];
    console.log(KAKAO_CODE)
    const URI = process.env.REACT_APP_BASE_URI;
    useEffect(()=> {
        const res= axios.get(`${URI}/ouath/kakao?code=${KAKAO_CODE}`)
        console.log(res)
        localStorage.setItem("Authorization", res.headers.authorization);
        navigate("/");
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    }
    
export default KakaoLogin;