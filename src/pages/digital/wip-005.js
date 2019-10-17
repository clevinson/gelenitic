import React from 'react'
import styled from 'styled-components'
import { Shaders, Node, GLSL } from "gl-react"
import { Surface } from "gl-react-dom"; // for React DOM
import GlobalStyle from "../../components/global-style.js"
import Vignette from "../../components/vignette.js"


const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
}`
  }
});

class HelloBlue extends React.Component {
  render() {
    const { blue } = this.props;
    return <Node shader={shaders.helloBlue} uniforms={{ blue }} />;
  }
}



const PageContainer = styled.div`
  .back {
      background-image: url('${props => props.source}');
      background-size: ${props => props.width}px ${props => props.height}px;
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


class AdvancedEffects extends React.Component {

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  constructor (props) {
    super(props);
    let picNr = parseInt(props.location.search.slice(1));
    let imageSrc;

    if (picNr >= 1 && picNr < 26) {
      imageSrc = "/assets/WIP005/" + picNr + ".png"
    } else {
      imageSrc = "/assets/WIP005/circadia-art-full.png"
    }

    this.state = {
      time: 0.02,
      frames: 1,
      imageSrc: imageSrc,
      width: 0,
      height: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }


  componentDidMount () {
    let startTime;
    const loop = t => {
      requestAnimationFrame(loop);
      if (!startTime) startTime = t;
      const time = (t - startTime) / 1000;
      this.setState({ time: time, frames: this.state.frames+1 });
    };
    requestAnimationFrame(loop);

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  render () {
    const {time, frames, imageSrc} = this.state;

    return (
      <PageContainer width={this.state.width} height={this.state.height} source={imageSrc}>
        <GlobalStyle/>
        <div className="back">
        </div>
        <div className="overlay">
        </div>
          <Vignette
            time={time}
            width={this.state.width}
            height={this.state.height}
            source={imageSrc}
          />
      </PageContainer>
    )
  }
}

export default AdvancedEffects
