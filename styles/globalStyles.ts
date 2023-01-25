import {createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle<{ theme: any }>`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Open Sans, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${props => props.theme.colors.text};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyle;