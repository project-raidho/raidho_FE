import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  :root {
    --bg-color: #F5ECE9;
    --red-color: #E8674D;
    --green-color: #62B273;
    --yellow-color: #E8A13A;
    --blue-color: #CEEADD;
    --text-color: #000000;
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
