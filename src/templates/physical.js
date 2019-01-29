import React from "react"
import ReleaseTextBox from "../components/release-textbox"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import {Small} from "../global-variables"

const BackgroundImages = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: scroll;
  z-index: -1;
  img {
    width: 100%;
    height: auto;
    display: block;
  }

  @media only screen and ${Small} {
    width: 100%;
    position: static;
    display: block;
  }
`

export default ({ data }) => {
  let release = data.markdownRemark.frontmatter
  release.description = data.markdownRemark.html

  const images = data.markdownRemark.frontmatter.background_images
  return (
  <Layout>
  <div className="container">
    <ReleaseTextBox data={release}/>
    <BackgroundImages>
    { images.map((img_url, i) => {
      return <img alt="" key={i} src={img_url} />
      })
    }
    </BackgroundImages>
  </div>
  </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        artist
        cat_no
        release_date
        format
        in_stock
        purchase_link
        cover_art
        hover_art
        description
        release_box_styling {
          width
          x
          y
        }
        background_images
        tracklist {
          side_name
          tracks
        }
      }
    }
  }
`
