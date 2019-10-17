import React from 'react'
import styled from 'styled-components'
import { Shaders, Node, GLSL } from "gl-react";
import { Surface } from "gl-react-dom"; // for React DOM


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
    background-image: url('/assets/WIP006/art-1.jpeg');
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      position: fixed;
  }

  .overlay {
      height: 100%;
      width: 100%;
      position: fixed;
      overflow: auto;
      top: 0px;
      left: 0px;
      background: rgba(255, 255, 255, 0.7); /*can be anything, of course*/
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

export default () => (
  <PageContainer>
    <div className="back">
    </div>
    <div className="overlay">
    </div>
    <Surface>
      <HelloBlue/>
    </Surface>
  </PageContainer>
)

