import React, { useEffect } from "react";
import Routers from "./shared/Router";
import styled from "styled-components";

function App() {

  // // ::: Dark & Light 기능구현
  // useEffect(() => {
  //   const bgMode = window.localStorage.getItem("bgMode");
  //   if (bgMode === "dark") {
  //     document.getElementsByTagName("html")[0].classList.add("darkMode");
  //   }
  // }, []);
  // const darkOnOff = () => {
  //   if (
  //     document.getElementsByTagName("html")[0].classList.contains("darkMode")
  //   ) {
  //     document.getElementsByTagName("html")[0].classList.remove("darkMode");
  //     window.localStorage.setItem("bgMode", "light");
  //   } else {
  //     document.getElementsByTagName("html")[0].classList.add("darkMode");
  //     window.localStorage.setItem("bgMode", "dark");
  //   }
  // };
  return (
    <>

      <Routers />
    </>
  );
}

export default App;



