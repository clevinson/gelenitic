import React from "react";
import styled from "styled-components";
import SoundCloudAudio from "soundcloud-audio";
import { Howl } from "howler";

const Player = styled.div`
  height: 100%;

  background: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;

  .playerInfo {
    font-size: 1.3em;
    cursor: default;
  }

  @media screen and (max-width: 500px) {
    flex-direction: column-reverse;
    justify-content: center;
    padding: 0 5px 0 5px;

    .playerInfo {
      font-size: 1em;
      padding-bottom: 0.3em;
    }
  }
`;

const PlayControls = styled.div`
  .playPause,
  .next,
  .prev {
    font-size: 15pt;
    cursor: pointer;
    width: 100%;
    text-align: center;
  }

  .hidden {
    color: #999 !important;
  }

  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  user-select: none;

  @media screen and (max-width: 500px) {
    padding-bottom: 1em;
  }
`;

// TODO: Get this from audio CMS
const PLAYLIST = [
  {
    title: "Track 1",
    src: "https://cdn.sanity.io/files/k4snbik8/production/beefe4f79e46106303ff8acc73bf766ab004ec4d.mp3",
  },
  {
    title: "Track 2",
    src: "https://cdn.sanity.io/files/k4snbik8/production/0ce89d65cdd580a467bb3841503919def85a4728.mp3",
  },
];

class ScPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      trackIndex: 0,
      playlist: PLAYLIST,
      nowPlaying: false,
      playbackStarted: false,
    };
  }

  componentDidMount() {
    if (typeof document !== `undefined`) {
      const firstTrack = new Howl({
        src: [this.state.playlist[0].src],
      });

      // sound.on("play", () => {
      //   this.setState({
      //     nowPlaying: true,
      //   });
      //   this.props.onStateChange(player);
      // });
      // sound.on("pause", () => {
      //   this.setState({
      //     nowPlaying: false,
      //   });
      //   this.props.onStateChange(player);
      // });
      // sound.on("end", () => {
      //   this.nextTrack();
      // });

      // this.setState({
      //   trackTitle:
      // })

      // player.resolve(
      //   "https://soundcloud.com/keptmale/sets/ost-circadia/s-TIzMQ",
      //   (playlist) => {
      //     this.setState({
      //       player: player,
      //       trackTitle: playlist.title,
      //       tracks: playlist.tracks,
      //     });
      //   }
      // );
    }
  }

  playerInfo = () => {
    const { playbackStarted, playlist, trackIndex } = this.state;

    if (playbackStarted) {
      return playlist[trackIndex].title + ` ::: [${trackIndex + 1} of 10]`;
    } else {
      return "Gi Gi - OST Circadia";
    }
  };

  togglePlayback = () => {
    const { playlist, trackIndex } = this.state;

    if (playlist[trackIndex])
      if (this.state.nowPlaying) {
        // this.state.player.pause();
        this.setState({
          nowPlaying: false,
        });
      } else {
        this.setState({
          nowPlaying: true,
          playbackStarted: true,
        });
        // this.state.player.play();
      }
  };

  nextTrack = () => {
    const { playlist, trackIndex } = this.state;

    if (trackIndex === playlist.length - 1) {
      this.resetPlayback();
    } else {
      this.setState((prevState) => ({ trackIndex: prevState.trackIndex + 1 }));
    }
  };

  prevTrack = () => {
    if (this.state.trackIndex > 0) {
      this.setState((prevState) => ({ trackIndex: prevState.trackIndex - 1 }));
    }
  };

  resetPlayback = () => {
    this.setState((prevState) => ({
      trackIndex: 0,
      nowPlaying: false,
      playbackStarted: false,
    }));
  };

  // ADD EVENT HANLDER SO IF PLAYBACK STOPS,
  // WE RESET THE "PLAY/PAUSE" BUTTON

  getClassNames = (buttonName) => {
    const { playbackStarted, trackIndex } = this.state;

    if (!playbackStarted) {
      if (buttonName === "prev") {
        console.log("hiding prev");
      }
      return buttonName + " hidden";
    } else if (trackIndex === 0 && buttonName === "prev") {
      if (buttonName === "prev") {
        console.log("hiding prev");
      }
      return buttonName + " hidden";
    } else {
      if (buttonName === "prev") {
        console.log("should not be hiding prev");
      }

      return buttonName;
    }
  };

  render() {
    return (
      <Player>
        <PlayControls>
          <div className={this.getClassNames("prev")} onClick={this.prevTrack}>
            ⟨⟨
          </div>
          <div className="playPause" onClick={this.togglePlayback}>
            {this.state.nowPlaying ? "❘❘" : "▷"}
          </div>
          <div className={this.getClassNames("next")} onClick={this.nextTrack}>
            ⟩⟩
          </div>
        </PlayControls>
        <p className="playerInfo">{this.playerInfo()}</p>
        <p>track: {this.state.trackIndex}</p>
      </Player>
    );
  }
}

export default ScPlayer;
