import React from "react"
import {Link} from "./link"
import styled from "styled-components"

const ReleaseTextBox = styled.div`
  padding: 11px;
  background-color: #fff;
  box-sizing: border-box;
`

const LineHeader = styled.h2`
  margin-top: 0;
`

const LineText = styled.div`
  margin-top: 0px;
  margin-bottom: 10px;
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

const Description = styled.div`
  line-height: 1.5em
  font-size: 1em
  margin: 1em 0 2em 0;
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
  div:last-child {
    margin-right: 0px;
  }
`

const SoldOutButton = styled.div`
  box-sizing: border-box;
  padding: 1em;
  border: 1px solid #000;
  text-align: center;
  width: 100%;
  margin: 0 5px;

  color: white;
  background-color: black;
  text-transform: uppercase;
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
    return <SoldOutButton>sold out</SoldOutButton>
  } else {
    return <Button to={purchase_link}>buy</Button>
  }
}

export default ({data, ...other }) => (
  <ReleaseTextBox {...other}>
    <LineHeader>{ data.artist }</LineHeader>
    <LineHeader>{ data.title }</LineHeader>
    <LineText>{ data.metadata_date }</LineText>
    <LineText>{ data.cat_no }</LineText>
    <Tracklist>{ renderTracklist(data.tracklist) }</Tracklist>
    <Description dangerouslySetInnerHTML={{ __html: data.description }}/>
    <ButtonContainer>
      <Button to="/about/">listen</Button>
      { renderPurchaseButton(data.purchase_link) }
    </ButtonContainer>
  </ReleaseTextBox>
)
