import React from 'react'
import styled from 'styled-components'
import SoundCloudAudio from 'soundcloud-audio'


const Player = styled.div`
  background: rgba(255,255,255,0.85);
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;

  .playerInfo {
    font-size: 1.3em;
  }

`

const PlayControls = styled.div`
  .playPause, .next, .prev {
    font-size: 15pt;
    cursor: pointer;
    width: 100%;
    text-align: center;
  }

  .hidden {
    color: #999;
    pointer-events: none;
  }

  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  user-select: none;
`

class ScPlayer extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      player: null,
      tracks: null,
      nowPlaying: false,
      playbackStarted: false,
    }
  }

  componentDidMount() {
    if (typeof document !== `undefined`) {
      let player = new SoundCloudAudio('1796bdbd7f77b6ccf8654cf6fa432669')

      player.on('play', () => { 
        this.setState({
          nowPlayeing: true
        })
        this.props.onStateChange(player)
      })
      player.on('pause', () => {
        this.props.onStateChange(player)
        this.setState({
          nowPlayeing: false
        })
      })
      player.on('ended', () => { this.nextTrack() })

      player.resolve("https://soundcloud.com/keptmale/sets/ost-circadia/s-TIzMQ", (playlist) => {
        this.setState({
          player: player,
          trackTitle: playlist.title,
          tracks: playlist.tracks
        })
        console.log(player)
      })
    }
  }

  playerInfo = () => {
    if (this.state.playbackStarted) {
      let playlistIndex = this.state.player._playlistIndex
      return (
        this.state.tracks[playlistIndex].title + `   ::: [${playlistIndex+1} of 10]`
      )
    } else {
      return "Gi Gi - OST Circadia"
    }
  }

  togglePlayback = () => {
    if (this.state.nowPlaying) {
      this.state.player.pause()
        this.setState({
          nowPlaying: false
        })
    } else {
      this.setState({
        nowPlaying: true,
        playbackStarted: true
      })
      this.state.player.play()
    }
  }

  nextTrack = () => {
    if (this.state.player._playlistIndex == this.state.player._playlist.tracks.length - 1) {
      this.resetPlayback()
    } else if (!this.state.nowPlaying) {
      this.state.player._playlistIndex += 1
      this.setState({player: this.state.player})
    } else {
      this.state.player.next().then(() => {
        this.setState({player: this.state.player})
      })
    }
  }

  prevTrack = () => {
    if (this.state.player.audio.paused) {
      this.state.player._playlistIndex -= 1
      this.setState({player: this.state.player})
    } else {
      this.state.player.previous().then(() => {
        this.setState({player: this.state.player})
      })
    }
  }

  resetPlayback = () => {
    this.state.player._playlistIndex = 0
    this.state.player.stop()
    this.setState({
      player: this.state.player,
      nowPlaying: false,
      playbackStarted: false
    })
  }

  // ADD EVENT HANLDER SO IF PLAYBACK STOPS,
  // WE RESET THE "PLAY/PAUSE" BUTTON

  getPlaylistIndex = () => {
    if (this.state.player) {
      return this.state.player._playlistIndex
    } else {
      return 0
    }
  }

  getClassNames = (buttonName) => {
    if (!this.state.playbackStarted) {
      return buttonName + " hidden"
    } else if (this.getPlaylistIndex() === 0 && buttonName === "prev") {
      return buttonName + " hidden"
    } else {
      return buttonName
    }
  }

  render() {
    return (
      <Player>
        <PlayControls playlistIndex={this.getPlaylistIndex()} playbackStarted={this.state.playbackStarted} >
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
    )
  }
}

export default ScPlayer
