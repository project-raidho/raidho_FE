import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  // ::: 웹폰트 적용
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}
  
  :root {
    --bg-color: #ffffff;
    --bgSub-color: #ffffff;
    --main-color: #7188FF;
    --sub-color:#CFCFCF;
    --line-color: #666666;
    --red-color: #FF4040;
    --green-color: #11CA48;
    --blue-color: #4862E8;
    --lightBlue-color: #4888F4;
    --gray-color: #a0a0a0;
    --lightGray-color: #D9D9D9;
    --title-color: #1E1E1E;
    --text-color: #1E1E1E;
    --font-style: 'Pretendard-Regular';
    --box-shadow: 4px 0px 5px rgba(0, 0, 0, 0.25);
    --button-shadow : 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
  .darkMode {
    --bg-color: #343434;
    --bgSub-color: #1E1E1E;
    --title-color: #ffffff;
    --text-color: #ffffff;
    --box-shadow: 4px 0px 5px rgba(255, 255, 255, 0.2);
  }
  body {
    background-color: var(--bg-color);
  }
  * {
    font-family: var(--font-style);
    font-weight: 400;
    line-height: 1.2;
    font-size: 1rem;
    color: var(--text-color);
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    font-size: 1.3rem;
  }
  ul li, ol li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
