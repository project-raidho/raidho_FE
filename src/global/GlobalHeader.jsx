import React, { useState } from "react";
import Potal from "../global/globalModal/Potal";
import LoginModal from "../components/login/LoginContainer";

const GlobalHeader= ()=> {
    const [ modalOn, setModalOn ] = useState(false);
    const handleModal = () => {
      setModalOn(!modalOn);
    }
    return(
        <>
        <button onClick={handleModal}>로그인</button>
        <Potal>
          {modalOn && <LoginModal onClose={handleModal} /> }
        </Potal>
        </>
        
    )
}
export default GlobalHeader