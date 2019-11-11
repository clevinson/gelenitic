import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body, pre {
    font-family: 'ocr_bregular', Monaco, monospace;
    font-size: 10px;
    text-transform: lowercase;
    margin: 0;
    ${props => props.addlBodyStyle}
  }

  h2 { /* 24px / 26px + 16px / 16px */
    font-size: 1.5em;
    font-weight: normal;
    line-height: 1em;
    margin: 0.66666666666em 0;
  }
  p { /* 16px / 22px + 12px / 12px */
    font-size: 1em;
    line-height: 1.5em;
    margin: 1em 0;
  }
`

export default GlobalStyle
