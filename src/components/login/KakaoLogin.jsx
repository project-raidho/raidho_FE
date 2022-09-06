import axios from "axios";
import { useEffect } from "react";
import { useLocation,
     useNavigate 
    } from "react-router-dom";

const KakaoLogin =  () => {
    const location =useLocation();
    const navigate=useNavigate();
    
    
    useEffect(()=> {

        const KAKAO_CODE = location.search.split('=')[1];
        console.log(KAKAO_CODE)
        //const URI = process.env.REACT_APP_BASE_URI;
        const res= axios.get(`http://3.34.194.84/login/oauth2/code/kakao?code=${KAKAO_CODE}`);
        console.log(res);
        localStorage.setItem("Authorization", res.headers.authorization);
        navigate("/");
        
    }, [])
    }
    
export default KakaoLogin;