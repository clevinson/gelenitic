import React from 'react'
import styled from 'styled-components'
import SoundCloudAudio from 'soundcloud-audio'


const Player = styled.div`
  background: #fff;
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

  .playPause {

  }
  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`

class ScPlayer extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      player: new SoundCloudAudio('1796bdbd7f77b6ccf8654cf6fa432669'),
      trackTitle: null,
      tracks: null,
      nowPlaying: false,
      playbackStarted: false,
    }

    this.state.player.resolve("https://soundcloud.com/keptmale/sets/ost-circadia/s-TIzMQ", (playlist) => {
      console.log(playlist);
      this.setState({
        trackTitle: playlist.title,
        tracks: playlist.tracks
      })
    })

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

  playButtonText = () => {
    let icon;

    if (this.state.nowPlaying) {
      icon = "❘❘"
    } else {
      icon = "▷"
    }
    return icon

  }

  nextTrack = () => {
    this.state.player.next().then(() => {
      this.setState({trackTitle: this.state.player.track})
    })

  }

  render() {
    return (
      <Player>
        <PlayControls>
        <div className="prev" onClick={this.prevTrack}>
          ⟨⟨
        </div>
        <div className="playPause" onClick={this.togglePlayback}>
          {this.playButtonText()}
        </div>
        <div className="next" onClick={this.nextTrack}>
          ⟩⟩
        </div>
        </PlayControls>
        <p className="playerInfo">{this.playerInfo()}</p>
      </Player>
    )
  }
}

export default ScPlayer
