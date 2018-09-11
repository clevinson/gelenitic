import React from "react"
import Link from "gatsby-link"
import Slink from "../components/slink"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import {Small} from "../global-variables"

const ReleaseList = styled.ul`
  padding: 0;
  width: 800px;
  margin: 0 auto;

  @media only screen and (max-width: 800px) {
    width: 600px;
  }

  @media only screen and ${Small} {
    width: 100%;
  }

  li.left-to-right {
    flex-direction: row;
    text-align: left;
  }

  li.right-to-left {
    flex-direction: row-reverse;
    text-align: right;
  }

`

const Release = styled.li`
  list-style-type: none;
  padding: 80px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  line-height: 1.5em;

  @media only screen and ${Small} {
    flex-direction: column;
    padding-top: 0;
  }
`

const Art = styled.div`
  width: 45%;
  position: relative;

  @media only screen and ${Small} {
    width: 100%;
  }
`

const CoverArt = styled.img`
  width: 100%;
`
const HoverArt = styled(CoverArt)`
  opacity: 0;
  position: absolute;
  left: 0;
  transition: opacity 0.7s ease-in-out;

  :hover {
    opacity: 1;
  }
`

const Info = styled.div`
  width: 45%;

  @media only screen and ${Small} {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
`

const Header = styled.h2`
  margin-top: 0;
  color: black;
`


let isEven = num => {
  if (num % 2) {
    return "right-to-left"
  } else {
    return "left-to-right"
  }
}

export default ({ data }) => {
  return (
  <Layout>
  <ReleaseList>
    {data.allMarkdownRemark.edges.map(({ node }, i) => {
      let release = node.frontmatter

      return (
      <Release key={i} className={isEven(i)}>
        <Art className={isEven(i)}>
          <Link to={ "/physical/" + release.cat_no }>
            <CoverArt src={ release.cover_art }/>
            <HoverArt src={ release.hover_art }/>
          </Link>
        </Art>
        <Info className={isEven(i)}>
          <Header>{ release.artist }</Header>
          <Header>{ release.title }</Header>
          <div>{ release.cat_no }</div>
          <div>{ release.release_date }</div>
          <div>
            <Slink to={ "/digital/" + release.cat_no }>listen</Slink>
            <span> / </span>
            <Slink to={ node.fields.slug }>{ release.format }</Slink>
          </div>
        </Info>
      </Release>
      )
    })}
  </ReleaseList>
  </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___release_date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            artist
            release_date
            cat_no
            cover_art
            hover_art
            format
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
