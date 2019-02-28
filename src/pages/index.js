import React from "react"
import {Sa, Slink, Link} from "../components/link"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import {SmallMediaQuery, MediumMediaQuery} from "../global-variables"

const LogoImg = styled.img`
  width: 320px;
  position: fixed;
  top: calc(50% - 110px);
  left: calc(50% - 160px);
  transition: opacity 5s;

  opacity: ${props => props.visible ? 1 : 0};
`

class Splash extends React.Component {

  constructor(props) {
    super(props)
    this.state = { showLogo: false }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ showLogo: true })
    }, 500)
  }

  render() {
    return (
      <Link to="/home">
        <LogoImg visible={this.state.showLogo} src="/assets/WIP-logo.png" alt="W I P"/>
      </Link>
    )
  }

}

export default Splash
