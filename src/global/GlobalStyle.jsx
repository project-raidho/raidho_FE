import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  // ::: 웹폰트 임시 적용(nexon폰트 경우 weight 300, 400, 700)
  @font-face {
    font-family: 'NEXON Lv2 Gothic';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv2 Gothic.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  :root {
    --bg-color: #ffffff;
    --bgSub-color: #ffffff;
    --main-color: #7188FF;
    --sub-color:#CFCFCF;
    --red-color: #FF4040;
    --gray-color: #CFCFCF;
    --title-color: #1E1E1E;
    --text-color: #1E1E1E;
    --font-style: 'NEXON Lv2 Gothic';
    --box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.25);
  }
  .darkMode {
    --bg-color: #343434;
    --bgSub-color: #1E1E1E;
    --title-color: #ffffff;
    --text-color: #ffffff;
    --box-shadow: 4px 0px 5px rgba(255, 255, 255, 0.2);
  }
  * {
    font-family: var(--font-style);
    font-weight: 400;
    line-height: 1.2;
    font-size: 13px;
    color: var(--text-color);
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
  ul li, ol li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
