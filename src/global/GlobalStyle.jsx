import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --bg-color: #ffffff;
    --main-color: #7188FF;
    --sub-color:#CFCFCF;
    --red-color: #FF4040;
    --text-color: #1E1E1E;
  }
  * {
    font-weight: 400;
    line-height: 1.2;
    font-size: 13px;
    color: var(--text-color);
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  ul li, ol li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
