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
      currentTrack: null,
    };
  }

  play = (index) => {
    const { playlist, trackIndex, playbackStarted } = this.state;

    let sound;

    if (playlist[index].howl) {
      sound = playlist[index].howl;
    } else {
      sound = new Howl({
        src: [this.state.playlist[index].src],
      });

      sound.on("play", () => {
        this.setState({
          nowPlaying: true,
        });
        this.props.onStateChange({ paused: false, trackIndex: index });
      });

      sound.on("pause", () => {
        this.setState({
          nowPlaying: false,
        });
        this.props.onStateChange({ paused: true, trackIndex: index });
      });

      sound.on("stop", () => {
        this.setState({ nowPlaying: false });
        this.props.onStateChange({ paused: true, trackIndex: index });
      });

      sound.on("end", () => {
        this.nextTrack();
      });

      // Update playlist
      const newPlaylist = [...playlist];
      newPlaylist[index] = { ...playlist[index], howl: sound };

      this.setState({
        playlist: newPlaylist,
      });
    }

    sound.play();

    this.setState(() => ({
      trackIndex: index,
      playbackStarted: true,
    }));
  };

  playerInfo = (title, index) => {
    const { playbackStarted } = this.state;

    if (playbackStarted) {
      return title + ` ::: [${index + 1} of 10]`;
    } else {
      return "Gi Gi - OST Circadia";
    }
  };

  togglePlayback = () => {
    const { playlist, trackIndex } = this.state;

    const sound = playlist[trackIndex].howl;

    if (sound?.playing()) {
      sound.pause();
    } else {
      this.play(trackIndex);
      this.setState({
        playbackStarted: true,
      });
    }
  };

  stop = () => {
    const { playlist, trackIndex } = this.state;

    const sound = playlist[trackIndex].howl;
    if (sound) {
      sound.stop();
    }
  };

  skipTo = (index) => {
    this.stop();
    this.play(index);
  };

  nextTrack = () => {
    const { playlist, trackIndex, playbackStarted } = this.state;

    if (!playbackStarted) return;

    if (trackIndex === playlist.length - 1) {
      this.resetPlayback();
    } else {
      const index = trackIndex + 1;
      this.skipTo(index);
    }
  };

  prevTrack = () => {
    if (this.state.trackIndex > 0) {
      const index = this.state.trackIndex - 1;
      this.skipTo(index);
    }
  };

  resetPlayback = () => {
    this.stop();

    this.setState((prevState) => ({
      trackIndex: 0,
      nowPlaying: false,
      playbackStarted: false,
      currentTrack: null,
    }));
  };

  // ADD EVENT HANLDER SO IF PLAYBACK STOPS,
  // WE RESET THE "PLAY/PAUSE" BUTTON

  getClassNames = (buttonName) => {
    const { playbackStarted, trackIndex, playlist } = this.state;

    return !playbackStarted || (trackIndex === 0 && buttonName === "prev")
      ? buttonName + " hidden"
      : buttonName;
  };

  render() {
    const { trackIndex, playlist } = this.state;

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
        <p className="playerInfo">
          {this.playerInfo(playlist[trackIndex].title, trackIndex)}
        </p>
      </Player>
    );
  }
}

export default ScPlayer;
