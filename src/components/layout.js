import React from "react"
import {Slink} from "./link"
import styled from "styled-components"
import {SmallMediaQuery} from "../global-variables"
import GlobalStyle from "./global-style"



const NavBar = styled.footer`

  opacity: 1;
  transition: opacity 0.5s linear;
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

  ${props => props.hidden && `
    pointer-events: none;
    opacity: 0;
  `}

  img {
    width: 60px;
  }
`

const Flank = styled.span`
  width: 100%;
`

const Cart = styled(Slink)`
    padding-left: 7%;

  @media only screen and ${SmallMediaQuery} {
    padding-left: 15px;
  }
`

const NavLinks = styled(Flank)`

  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  width: 100%;
  max-width: 300px;
  float: right;

  @media only screen and ${SmallMediaQuery} {
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding-right: 15px;
  }

`


export default ({ hideFooter, children }) => (
  <div>
    <GlobalStyle/>
    {children}
    <NavBar hidden={hideFooter}>
        <Flank>
          <Cart to="https://www.paypal.com/cgi-bin/webscr?cmd=_cart&business=J9EYATKXH2A52&display=1&shopping_url=https://waysinnerpass.com/home" rel="noopener noreferrer" target="_blank">view cart</Cart>
        </Flank>
        <Slink to="/home">
          <img alt="WIP" src="/assets/waysinnerpass-logo.svg"/>
        </Slink>
        <Flank>
        <NavLinks>
          <Slink to="/about">about</Slink>
          <Slink href="//waysinnerpass.bandcamp.com/" rel="noopener noreferrer" target="_blank">bandcamp</Slink>
          <Slink href="//soundcloud.com/waysinnerpass" rel="noopener noreferrer" target="_blank">soundcloud</Slink>
        </NavLinks>
        </Flank>
    </NavBar>
  </div>
)
