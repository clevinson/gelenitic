import React from "react";
import styled from "styled-components";
import GlobalStyle from "../../components/global-style.js";
import Vignette from "../../components/vignette.js";
import "url-search-params-polyfill";
import ScPlayer from "../../components/sc-player.js";

const PageContainer = styled.div`
  body {
    overflow: hidden;
  }

  // makes Vignette wrapper the correct height (prevents otherwise
  // scrolling behavior due to display: inline-block)
  span {
    vertical-align: top;
  }
`;

const PlayerContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;

  @media screen and (max-width: 500px) {
    height: 85px;
  }
`;

class CircadiaApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      playerState: {
        paused: true,
        playlistIndex: 0,
      },
      keyCodesPressed: [],
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidMount() {
    console.log("hji");
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  handleKeyDown = (e) => {
    // download code
    var key = e.which;

    this.setState((prevState) => {
      let keyCodesPressed = [...prevState.keyCodesPressed, key];
      if (keyCodesPressed.length > 4) {
        keyCodesPressed.splice(0, 1);
      }
      // 37 = left, 38 = up, 39 = right, 40 = down
      if (
        keyCodesPressed[0] === 38 &&
        keyCodesPressed[1] === 39 &&
        keyCodesPressed[2] === 40 &&
        keyCodesPressed[3] === 37
      ) {
        window.location.href =
          "http://waysinnerpass.com/stash/wip-005/Gi%20Gi%20-%20OST%20Circadia%20%282019%29%20%5BWIP-005%5D%20MP3-320.zip";
      }
      return { keyCodesPressed: keyCodesPressed };
    });
  };

  playerStateChange = (scPlayer) => {
    // this.setState({
    //   playerState: {
    //     paused: scPlayer.audio.paused,
    //     playlistIndex: scPlayer._playlistIndex,
    //   },
    // });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  playTrack = () => {
    this.state.widget.toggle();
  };

  getImageUrl = () => {
    if (this.state.playerState.paused) {
      return "/assets/WIP005/_.png";
    } else {
      return `/assets/WIP005/_${this.state.playerState.playlistIndex}.png`;
    }
  };

  getDistortScale = () => {
    if (this.state.playerState.paused) {
      return 5.5;
    } else {
      return 5 + 4.5 * Math.sin(Math.random() * 2 * 3.14);
    }
  };

  render() {
    const { width, height } = this.state;

    return (
      <PageContainer>
        <GlobalStyle addlBodyStyle="overflow: hidden;" />
        <Vignette
          distortScale={this.getDistortScale()}
          width={width}
          height={height}
          source={this.getImageUrl()}
        />
        <PlayerContainer>
          <ScPlayer onStateChange={this.playerStateChange} />
        </PlayerContainer>
      </PageContainer>
    );
  }
}

export default CircadiaApp;
