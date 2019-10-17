const React = require("react");
const ReactDOM = require("react-dom");
const GL = require("gl-react");
const { Surface } = require("gl-react-dom");

const shaders = GL.Shaders.create({
  imageVignette: {
    frag: `
precision highp float;
varying vec2 uv;
uniform float time;
uniform float amp;
uniform float freq;
uniform sampler2D texture;
uniform float moving;
uniform vec2 finger;
vec2 lookup (vec2 offset, float amp2) { // lookup must return a position coordinate 
  return mod(
    uv + amp2 * amp * vec2(cos(freq*(uv.x+offset.x)+time),sin(freq*(uv.y+offset.x)+time)) + vec2(moving * time/10.0, 0.0),
    vec2(1.0)); // actual bloopy work 
}

vec3 coloredLookup (float colorSeparation, vec2 orientation, float amp2) { // lookup must return a position coordinate 
  vec2 tvDims = vec2(300.0,350.0);
  vec2 warpedPos = lookup(vec2(0), amp2);

  if (tvDims.x*mod(mix(uv.x,warpedPos.x,0.5), 1.0/tvDims.x) < 0.2 ) {
    float darken = 0.4;
    return vec3(
      darken*texture2D(texture, lookup(colorSeparation * vec2(0.0,1.0), amp2)).r,
      darken*texture2D(texture, lookup(-colorSeparation * vec2(0.0,1.0), amp2)).g,
      darken*texture2D(texture, lookup(vec2(0.0), amp2)).b);
  } else if (tvDims.y*mod(warpedPos.y, 1.0/tvDims.y) < 0.33334 ) {
    vec2 warpedPos = lookup(colorSeparation * orientation, amp2);
    vec2 loc = warpedPos - mod(warpedPos,1.0/tvDims);
    return vec3(texture2D(texture, loc).r, 0.0, 0.0);
  } else if (tvDims.y*mod(warpedPos.y, 1.0/tvDims.y) < 0.66667 ) {
    vec2 warpedPos = lookup(-colorSeparation * orientation, amp2);
    vec2 loc = warpedPos - mod(warpedPos,1.0/tvDims);
    return vec3(0.0, texture2D(texture, loc).g, 0.0);
  } else {
    vec2 warpedPos = lookup(vec2(0), amp2);
    vec2 loc = warpedPos - mod(warpedPos,1.0/tvDims);
    return vec3(0.0, 0.0, texture2D(texture, loc).b);
  }
}

void main() {
  float dist = distance(uv, finger);
  float amp2 = pow(1.0 - dist, 0.1); // this is what magnifies the picture
  float colorSeparation = 0.02 * mix(amp2, 1.0, 0.5); // what does the rgb separation
  vec2 orientation = vec2(1.0, 0.0);
  gl_FragColor = vec4(
    coloredLookup(colorSeparation, orientation, amp2),
    //texture2D(texture, lookup(colorSeparation * orientation, amp2)).r,
    //texture2D(texture, lookup(-colorSeparation * orientation, amp2)).g,
    //texture2D(texture, lookup(vec2(0.0), amp2)).b),
    1.);
}
`
  }
});


class Vignette extends React.Component {
  constructor (props) {
    super(props);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.state = {
      finger: [0.5, 0.5]
    };
  }
  onMouseMove (evt) {
    const { width, height } = this.props;
    const { clientX, clientY } = evt;
    const { left, top } = ReactDOM.findDOMNode(this.refs.view).getBoundingClientRect();
    const [x, y] = [
      clientX - left,
      clientY - top
    ];
    this.setState({ finger: [x/width, 1-y/height] });
  }

  render () {
    const { width, height, time, source, distortScale } = this.props;
    const { finger } = this.state;
    let ampScale = distortScale || 1;
    return <Surface
      ref="view"
      width={width}
      height={height}
      backgroundcolor="transparent"
      onMouseMove={this.onMouseMove}
      onLoad={() => console.log("Vignette onLoad")}
      onProgress={p => console.log("Vignette onProgress", p)}
      >
      <GL.Node
        shader={shaders.imageVignette}
        uniforms={{
          time: time,
          freq: 10 + 1 * Math.sin(0.7*time),
          texture: source,
          amp: ampScale*(0.001 + Math.max(0, 0.0005 + 0.0005*Math.cos(time))),
          moving: 0,
          finger: finger
        }}
      />
    </Surface>;
  }
}

module.exports = Vignette;
