import React from "react"
import Link from "gatsby-link"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import Draggable from 'react-draggable'
import {Small} from "../global-variables"

//    <!--form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" onsubmit="ga('send', 'event', 'paypal', 'add-to-cart', '{ release.cat_no }')">
//      <input type="hidden" name="business" value="waysinnerpass@gmail.com">
//      <input type="hidden" name="cmd" value="_cart">
//      <input type="hidden" name="add" value="1">
//      <input type="hidden" name="item_name" value="{ release.artist } - { release.title }">
//      <input type="hidden" name="item_number" value="{ release.cat_no }">
//      <input type="hidden" name="amount" value="9.00">
//      <input type="submit" value="ORDER" border="0" name="submit">
//    </form> -->

const space_vertical = 80;
const width_main = 800;
const width_gutter = width_main*.15;

const textbox_width = width_main/2 - width_gutter;

var release = {
  artist: "dreampeter",
  title: "snakes eating snakes",
  release_date: "2015-01-01",
  cat_no: "WIP-001",
  description: "Recorded December 2013. Dreampeter is Matt Gilles (Palatine, IL) and Peter Wiley (Saugatuck, MI).\n\nEdition of 50 C60 Cassettes.",
  tracklist: {
    a: [
      "in a tunnel (with mike and evan)",
      "head injury",
      "malakai",
      "moving treeline"
    ],
    b: [
      "local legend",
      "broken headlight / a clever boy",
      "the perfect hat"
    ]
  },
  purchase_link: "sold-out"
}

let background_images = []
//  'https://wip-static.s3.amazonaws.com/release-artwork/WIP-001/WIP001-photo-set.jpg'
//, 'https://wip-static.s3.amazonaws.com/release-artwork/WIP-001/WIP001-photo-tapes-a.jpg'
//, 'https://wip-static.s3.amazonaws.com/release-artwork/WIP-001/WIP001-scan-cassettes.jpg'
//]


const ReleaseTextBox = styled.div`
  width: ${textbox_width}px;
  padding: ${width_gutter/8}px;
  background-color: #fff;
  position: absolute;
  left: ${space_vertical}px;
  top: ${space_vertical/2}px;
  box-sizing: border-box;
  cursor: move;

  @media only screen and ${Small} {
    position: static !important;
    width: 100%;
    padding: ${width_gutter}/8;
  }
`

const ReleaseHeaderLg = styled.h2`
  margin-top: 0;
  color: black;
`

const ReleaseHeaderSm = styled.div`
  margin-top: 0px;
  margin-bottom: 10px;
  color: black;
`

const Tracklist = styled.div`
  display: flex;
  flex-direction: row;
  ul {
    width: 100%;
    margin: 20px 0;
    padding: 0;
    margin-right: 25px;
    list-style-type: none;
  }
`
const TrackListItem = styled.li`
  margin-bottom: 1em;
`

const SideName = styled.li`
  margin-bottom: 2em;
`

const Description = styled.pre`
  line-height: 1.5em
  font-size: 1em
  margin: 1em 0 2em 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const Button = styled(Link)`
  box-sizing: border-box;
  padding: 1em;
  border: 1px solid #000;
  text-align: center;
  background-color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
  width: 100%;
  margin: 0 5px;
`
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  a:first-child {
    margin-left: 0px;
  }
  a:last-child {
    margin-right: 0px;
  }
  a:hover {
    text-decoration: none;
  }

`

const SoldOutButton = styled(Button)`
  color: white !important;
  background-color: black;
  cursor: inherit;
  }
`
let renderTracklist = function(tracklist) {
  return Object.keys(tracklist).map((sideName, i) => {
      return <ul key={i}>
        <SideName >{sideName}</SideName>
        { tracklist[sideName].map((trackName, j) => {
          return (<TrackListItem key={j}>{trackName}</TrackListItem>)
        })}
      </ul>
  })
}


let renderPurchaseButton = function(purchase_link) {
  if (purchase_link === "sold-out") {
    return <SoldOutButton to="" >sold out</SoldOutButton>
  } else {
    return <Button to={purchase_link}>buy</Button>
  }
}

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
  const metadata = data.markdownRemark.frontmatter
  const description = data.markdownRemark.html
  const images = data.markdownRemark.frontmatter.background_images
  return (
  <Layout>
  <div className="container">
    <Draggable>
      <ReleaseTextBox className="info drag">
        <ReleaseHeaderLg>{ metadata.artist }</ReleaseHeaderLg>
        <ReleaseHeaderLg>{ metadata.title }</ReleaseHeaderLg>
        <ReleaseHeaderSm>{ metadata.metadata_date }</ReleaseHeaderSm>
        <ReleaseHeaderSm>{ metadata.cat_no }</ReleaseHeaderSm>
        <Tracklist>{ renderTracklist(metadata.tracklist) }</Tracklist>
        <Description>{ description }</Description>
        <ButtonContainer>
          <Button to="/about/">listen</Button>
          { renderPurchaseButton(metadata.purchase_link) }
        </ButtonContainer>
      </ReleaseTextBox>
    </Draggable>
    <BackgroundImages>
    { images.map((img_url, i) => {
      return <img alt="" key={i} src={"/img/" + img_url} />
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
        release_date
        cat_no
        tracklist {
          a
          b
        }
        background_images
        purchase_link
      }
    }
  }
`
