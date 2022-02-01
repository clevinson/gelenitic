import React from "react";
import styled from "styled-components";
import { Howl } from "howler";
import AWS from "aws-sdk";
import YAML from "yaml";

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

const s3PlaylistTracks = async (playlistDir) => {
  const bucketName = "wip-static";
  // Initialize the Amazon Cognito credentials provider
  AWS.config.region = "us-east-1"; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.GATSBY_AWS_POOL_ID,
  });

  // Create a new service object
  let s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: bucketName },
  });

  var playlistKey = "stream/" + encodeURIComponent(playlistDir) + "/";

  console.log("Listing items for: " + playlistKey);
  try {
    let s3Objects = await s3
      .listObjectsV2({ Delimiter: "/", Prefix: playlistKey })
      .promise();

    let bucketUrl = `https://${bucketName}.s3.amazonaws.com/`;

    let metadataKey = playlistKey + "metadata.yml";
    let response = await fetch(bucketUrl + metadataKey);
    let metadataRaw = await response.text();

    console.log(metadataRaw);
    let metadata = YAML.parse(metadataRaw);

    let trackUrls = [];
    s3Objects.Contents.forEach(function (object) {
      var objectUrl = bucketUrl + encodeURIComponent(object.Key);
      if (object.Key != playlistKey && object.Key != metadataKey) {
        trackUrls.push(objectUrl);
      }
    });

    let tracks = trackUrls.map((url, i) => {
      return {
        src: url,
        title: metadata.tracklist[i],
      };
    });

    console.log(metadata);
    console.log(tracks);

    return tracks;
  } catch (err) {
    console.error(err);
  }
};

class ScPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: null,
      trackIndex: 0,
      playlist: null,
      nowPlaying: false,
      playbackStarted: false,
    };
  }

  play = (index) => {
    const { playlist } = this.state;

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

  playerInfo = () => {
    const { playbackStarted, trackIndex, playlist } = this.state;

    if (playbackStarted && playlist) {
      return (
        playlist[trackIndex].title +
        ` ::: [${trackIndex + 1} of ${playlist.length}]`
      );
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

    this.setState({
      trackIndex: 0,
      nowPlaying: false,
      playbackStarted: false,
    });
  };

  // ADD EVENT HANLDER SO IF PLAYBACK STOPS,
  // WE RESET THE "PLAY/PAUSE" BUTTON

  getClassNames = (buttonName) => {
    const { playbackStarted, trackIndex } = this.state;

    return !playbackStarted || (trackIndex === 0 && buttonName === "prev")
      ? buttonName + " hidden"
      : buttonName;
  };

  async componentDidMount() {
    let playlist = await s3PlaylistTracks(this.props.playlistDir);

    this.setState({
      playlist: playlist,
    });
  }

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
        <p className="playerInfo">{this.playerInfo()}</p>
      </Player>
    );
  }
}

export default ScPlayer;
