import React from 'react'
import styled from 'styled-components'
import GlobalStyle from "../../components/global-style.js"
import Vignette from "../../components/vignette.js"
import 'url-search-params-polyfill'
import SoundcloudWidget from "soundcloud-widget"
import ScPlayer from "../../components/sc-player.js"

const PlayerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
  opacity: 30%;
`

const PageContainer = styled.div`
  .back {
      top: 0px;
      left: 0px;
      height: ${props => props.height}px;
      width: ${props => props.width}px;
      position: fixed;
  }

  .overlay {
      height: 100%;
      width: 100%;
      position: fixed;
      overflow: auto;
      top: 0px;
      left: 0px;
  }

  footer {
    background-color: rgba(0,0,0,0);
  }

  li {
    font-size: 1.5em;
    line-height: 4em;
    list-style-type: none;
    border-bottom: 2px solid black;
    margin-right: 40px;
    position: relative;
  }
  span {
    float: right;
  }
  iframe {
    position: fixed;
  }
`

const StyledForm = styled.form`
  position: absolute;
  bottom: 0;
  background: rgba(255,255,255,0.8);
  padding: 5px;
  display: none;
  flex-direction: column;

  label {
    font-size: 1.2em;
    border-bottom: black 1px solid;
    line-height: 2.5em;
  }
  input {
    width: 100px;
    float: right;
    margin: 5px 0 5px 10px;
  }
`

class CircadiaApp extends React.Component {

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  constructor (props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      imageNr: 0,
      imageUrl: "",
      distortScale: 1,
      widget: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.playTrack = this.playTrack.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidMount () {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    //this.state.widget = new SoundcloudWidget('sc-player')
  }


  playTrack() {
    this.state.widget.toggle()

  }

  getImageUrl() {
    if (this.state.imageUrl !== "") {
      return this.state.imageUrl
    }
    if (this.state.imageNr >= 1 && this.state.imageNr < 26) {
      return "/assets/WIP005/" + this.state.imageNr + ".png"
    } else {
      return "/assets/WIP005/circadia-art-full.png"
    }
  }

  render () {
    const {distortScale} = this.state;

    return (
      <PageContainer width={this.state.width} height={this.state.height}>
        <GlobalStyle/>
          <Vignette
            distortScale={distortScale}
            width={this.state.width}
            height={this.state.height}
            source={this.getImageUrl()}
          />
          <PlayerContainer>
            <ScPlayer name="yum"/>
          </PlayerContainer>
        <StyledForm>
          <label>
            image selector (0-26):
            <input
              name="imageNr"
              type="number"
              value={this.state.imageNr}
              onChange={this.handleInputChange} />
          </label>
          <label>
            custom image url:
            <input
              name="imageUrl"
              type="text"
              value={this.state.imageUrl}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Distort Amplifier:
            <input
              name="distortScale"
              type="number"
              value={this.state.distortScale}
              onChange={this.handleInputChange} />
          </label>
        </StyledForm>
      </PageContainer>
    )
  }
}



export default CircadiaApp
