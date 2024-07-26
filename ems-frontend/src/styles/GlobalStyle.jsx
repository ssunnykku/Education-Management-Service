import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';
import Palette from './Palette.jsx';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Pretendard Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    /* font-size: 14px; */
    font-size: 15px;
    color: ${Palette.TextPrimary};
    overflow-x: hidden;
    font-family: sans-serif;
  }

  p {
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  h1, h2, h3{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  a {
    color: ${Palette.TextPrimary};
    text-decoration: none;
  }
  pre{
    margin: 0;
    padding: 0;
    white-space: pre-wrap;
  }

  textarea {
    border: none;
    outline: none;
    resize: none;
  }
`;
export default GlobalStyle;
