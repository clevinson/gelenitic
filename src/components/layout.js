import React from "react"
import {Slink} from "./link"
import styled, {injectGlobal} from "styled-components"
import {Small} from "../global-variables"


injectGlobal`
  @font-face {
      font-family: 'ocr_bregular';
      src: url('/fonts/OCR-B-webfont.eot');
      src: url('/fonts/OCR-B-webfont.eot?#iefix') format('embedded-opentype'),
           url('/fonts/OCR-B-webfont.woff') format('woff'),
           url('/fonts/OCR-B-webfont.ttf') format('truetype'),
           url('/fonts/OCR-B-webfont.svg#ocr_bregular') format('svg');
      font-weight: normal;
      font-style: normal;
  }
  body, pre {
    font-family: 'ocr_bregular', Monaco, monospace;
    font-size: 10px;
    text-transform: lowercase;
    margin: 0;
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

const NavBar = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin: 0;
  background-color: #fff;
  position: fixed;
  left: 0px;
  bottom: 0px;


  img {
    width: 60px;
  }
`

const Flank = styled.span`
  width: 100%;
`

const NavLinks = styled(Flank)`

  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  width: 100%;
  max-width: 300px;
  float: right;

  @media only screen and ${Small} {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding-right: 15px;
  }

`


export default ({ children }) => (
  <div>
    {children}
    <NavBar>
        <Flank></Flank>
        <Slink to="/">
          <img alt="WIP" src="/img/waysinnerpass-logo.svg"/>
        </Slink>
        <Flank>
        <NavLinks>
          <Slink to="/about">about</Slink>
          <Slink href="//twitter.com/waysinnerpass" rel="noopener noreferrer" target="_blank">twitter</Slink>
          <Slink href="//soundcloud.com/waysinnerpass" rel="noopener noreferrer" target="_blank">soundcloud</Slink>
        </NavLinks>
        </Flank>
    </NavBar>
  </div>
)