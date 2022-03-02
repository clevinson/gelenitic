import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "../../components/global-style.js";
import { SVG } from "@svgdotjs/svg.js";
import ScPlayer from "../../components/sc-player";
import "@svgdotjs/svg.filter.js";

const Container = styled.div`
  width: 100%;
  height: 100vh;

  background-color: snow;

  display: flex;
  justify-content: center;
  align-items: center;
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

const BgImage = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

function Codas(props) {
  const mount = useRef(null);

  const [playerState, setPlayerState] = useState({
    paused: true,
    trackIndex: 0,
  });

  const [pressedKeys, setPressedKeys] = useState([]);
  const ALLOWED_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      console.log("Found key", key);
      if (ALLOWED_KEYS.includes(key) && !pressedKeys.includes(key)) {
        setPressedKeys((previousPressedKeys) => {
          const pressedKeys = [...previousPressedKeys, key];
          if (pressedKeys.length > 4) {
            pressedKeys.splice(0, 1);
          }
          if (
            pressedKeys[0] === "ArrowUp" &&
            pressedKeys[1] === "ArrowRight" &&
            pressedKeys[2] === "ArrowDown" &&
            pressedKeys[3] === "ArrowLeft"
          ) {
            window.location.href =
              "https://wip-static.s3.amazonaws.com/releases/Codas+-+Codas+(WIP006).zip";
          }
          return pressedKeys;
        });
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const draw = SVG().addTo(mount.current).size("100%", "100%");
    const image = draw.image("/assets/WIP006/teahouse.jpeg");
    image.viewbox(0, 0, 100, 100).size("100%", "100%");

    let bw;
    image.filterWith((add) => {
      bw = add.colorMatrix("saturate", 1);
    });
    bw.animate(10000).loop(true, true).attr("values", 0.4);

    return () => {
      draw.clear();
      image.clear();

      mount.current = null;
    };
  }, []);

  const playerStateChange = (playerState) => {
    setPlayerState(playerState);
  };

  return (
    <Container>
      <GlobalStyle />
      <BgImage ref={mount} />
      <PlayerContainer>
        <ScPlayer
          onStateChange={function () {}}
          playlistDir={"wip-006"}
          playlistName="Codas - Codas"
        />
      </PlayerContainer>
    </Container>
  );
}

export default Codas;
