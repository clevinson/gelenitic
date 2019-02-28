import React from "react"
import {Link, Slink, Sa} from "./link"
import styled from "styled-components"
import {SmallMediaQuery} from "../global-variables"
import Draggable from "../components/draggable"

const ReleaseTextBox = styled.div`
  padding: 11px;
  background-color: #fff;
  box-sizing: border-box;

  width: ${props => props.width};
  position: absolute;
  left: ${props => props.x};
  top: ${props => props.y};

  transition: opacity 0.5s linear;

  ${props => props.hideContent && `
    opacity: 0;
    pointer-events: none;
  `}

  @media only screen and ${SmallMediaQuery} {
    position: static;
    width: 100%;
  }
`

const LineHeader = styled.h2`
  margin-top: 0;
`

const LineText = styled.div`
  margin-top: 0px;
  margin-bottom: 10px;
`

const TracklistContainer = styled.div`
  display: flex;
  flex-direction: row;
  ul {
    width: 100%;
    margin: 10px 0 0 0;
    padding: 0;
    margin-right: 25px;
    list-style-type: none;
  }
`
const TrackListItem = styled.li`
  margin-bottom: 0.75em;
`

const SideName = styled.li`
  margin-bottom: 1.5em;
  font-weight: bold;
`

const Description = styled.div`
  line-height: 1em
  font-size: 1em
  margin: 1em 0 2em 0;
  word-wrap: break-word;
  p {
    margin: 1em 0 ;
  }

  code {
    font-family: 'ocr_bregular',Monaco,monospace;
    text-transform: uppercase;
  }
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

const SingleButton = styled(Sa)`
  :hover {
    text-decoration: none;
  }

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
  position: relative;
`

const MultiButton = styled.div`

  :not(:hover) {
    transition: all 0.3s;
  }

  .clicked, .clicked:hover { /* for 'buy from retailers' button */
    opacity: 1;
    color: #fff;
    background-color: #000;
    border-color: #000;
    transition: all 0.3s;
  }

  position: relative;
  width: 100%;


  a {
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: black;
  }

  a.options-selector {
    padding: 1em;
    position: absolute;
    width: 100%;
    border: 1px solid #000;
    box-sizing: border-box;
  }
  a.options-selector:hover {
    text-decoration: none;
  }

  ul {

    transition: all 0.5s;
    opacity: ${props => props.showPurchaseOptions ? 1 : 0};
    margin: 0;
    top: 100%;
    position: absolute;
    width: 100%;
    list-style-type: none;
    padding: 0;
    background-color: #fff;

    li {
      text-align: center;

      border: 1px solid #000;
      border-top: 0;
      padding: 1em;
      cursor: pointer;
    }
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

function Tracklist(props) {
  return (
    <TracklistContainer>
      {Object.keys(props.tracklist).map((sideName, i) => {
        return <ul key={i}>
          <SideName >{sideName}</SideName>
          { props.tracklist[sideName].map((trackName, j) => {
            return (<TrackListItem key={j}>{trackName}</TrackListItem>)
          })}
        </ul>
      })}
    </TracklistContainer>
  )
}


class PurchaseButton extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPurchaseOptions: false,
      selectorClass: ""
    };
  }

  handleClick = (e) => {
    e.preventDefault()

    this.setState(prevState => ({
      showPurchaseOptions: !prevState.showPurchaseOptions,
      selectorClass: (prevState.selectorClass == "clicked" ? "" : "clicked")
    }))

  }

  render() {
    if (this.props.soldOut) {
      return <SoldOutButton>sold out</SoldOutButton>
    } else if (this.props.purchaseLinks.length == 1) {
      let link = this.props.purchaseLinks[0]

      return <SingleButton href={link.url} target="_blank">{link.label}</SingleButton>
    } else {
      return (
        <MultiButton showPurchaseOptions={this.state.showPurchaseOptions} >
          <Slink as="a" className={"options-selector " + this.state.selectorClass} href="#" onClick={this.handleClick} >Buy</Slink>
            <ul>
              { this.props.purchaseLinks.map((link, i) => (
                <li key={i}><Slink as="a" target="_blank" href={link.url}>{link.label}</Slink></li>
              ))}
            </ul>
        </MultiButton>
      )
    }
  }
}

export default ({data, ...other }) => (
  <Draggable>
    <ReleaseTextBox width={ data.width } x={ data.position.x } y={ data.position.y } {...other}>
      <LineHeader>{ data.artist }</LineHeader>
      <LineHeader>{ data.title }</LineHeader>
      <LineText>{ data.metadata_date }</LineText>
      <LineText>{ data.cat_no }</LineText>
      <Tracklist tracklist={data.tracklist}/>
      <Description dangerouslySetInnerHTML={{ __html: data.description }}/>
      <ButtonContainer>
        <SingleButton target="_blank" href={"/digital/" + data.cat_no + "/"}>listen</SingleButton>
        <PurchaseButton soldOut={data.sold_out} purchaseLinks={data.purchase_links}/>
      </ButtonContainer>
    </ReleaseTextBox>
  </Draggable>
)
