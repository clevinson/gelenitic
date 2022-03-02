import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import GlobalStyle from "../../components/global-style.js";
import { SVG } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.filter.js";

const Container = styled.div`
  width: 100%;
  height: 100vh;

  background-color: snow;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BgImage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

function Codas(props) {
  const mount = useRef(null);

  useEffect(() => {
    const draw = SVG().addTo(mount.current).size("100%", "100%");
    const image = draw.image("/assets/WIP006/teahouse.jpeg");
    image.viewbox(0, 0, 100, 100).size("100%", "100%");

    // let blur;
    let hueRotate;
    image.filterWith((add) => {
      // blur = add.gaussianBlur(0.5);
      hueRotate = add.colorMatrix("hueRotate", 0);
    });
    hueRotate.animate(1000000).loop(true, true).attr("values", 360);

    return () => {
      draw.clear();
      image.clear();

      mount.current = null;
    };
  }, []);

  return (
    <Container>
      <GlobalStyle />

      <BgImage ref={mount} />
    </Container>
  );
}

export default Codas;
