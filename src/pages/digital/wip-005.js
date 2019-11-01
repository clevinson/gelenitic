import React from 'react'
import styled from 'styled-components'
import GlobalStyle from "../../components/global-style.js"
import Vignette from "../../components/vignette.js"
import 'url-search-params-polyfill'
import ScPlayer from "../../components/sc-player.js"

const PageContainer = styled.div``

const PlayerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 50px;
  bottom: 0;
`

const StyledForm = styled.form`
  position: absolute;
  top: 0;
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

  constructor (props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      imageNr: 0,
      imageUrl: "",
      distortScale: 1,
      widget: null,
      playerState: {
        paused: true,
        playlistIndex: 0,
      },
    };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidMount () {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  playerStateChange = (scPlayer) => {
    this.setState({
      playerState: {
        paused: scPlayer.audio.paused,
        playlistIndex: scPlayer._playlistIndex,
      }
    })
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  playTrack = () => {
    this.state.widget.toggle()
  }

  getImageUrl = () => {
    if (this.state.playerState.paused) {
      return "/assets/WIP005/_.png"
    } else {
      return `/assets/WIP005/_${this.state.playerState.playlistIndex}.png`
    }
  }

  getDistortScale = () => {
    if (this.state.playerState.paused) {
      return 0.5
    } else {
      return 5 + 4.5*Math.sin(Math.random()*3.14)
    }
  }

  render () {
    const {distortScale, width, height, imageNr, imageUrl} = this.state;

    return (
      <PageContainer>
        <GlobalStyle/>
        <Vignette
          distortScale={this.getDistortScale()}
          width={width}
          height={height}
          source={this.getImageUrl()}
        />
        <PlayerContainer>
          <ScPlayer onStateChange={this.playerStateChange} />
        </PlayerContainer>
        <StyledForm>
          <label>
            image selector (0-26):
            <input
              name="imageNr"
              type="number"
              value={imageNr}
              onChange={this.handleInputChange} />
          </label>
          <label>
            custom image url:
            <input
              name="imageUrl"
              type="text"
              value={imageUrl}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Distort Amplifier:
            <input
              name="distortScale"
              type="number"
              value={distortScale}
              onChange={this.handleInputChange} />
          </label>
        </StyledForm>
      </PageContainer>
    )
  }
}

export default CircadiaApp
