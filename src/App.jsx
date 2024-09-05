// App.js
import { useState, useRef, useEffect } from "react";
import { Stage, Sprite, Container } from "@pixi/react";

import Wolf from "./components/Wolf";
import Egg from "./components/Egg";
import background from "./assets/background.webp";
import Scene from "./components/Scene";

const Background = ({ w, h }) => {
  return <Sprite image={background} x={0} y={0} width={w} height={h} />;
};

const App = () => {
  const containerWidth = 414;
  const containerHeight = 896;

  const [wolfPosition, setWolfPosition] = useState({
    x: containerWidth * 0.5,
    y: containerHeight * 0.85,
  });

  return (
    <Stage
      width={containerWidth}
      height={containerHeight}
      options={{ backgroundColor: 0x1099bb }}
    >
      <Background w={containerWidth} h={containerHeight} />
      <Wolf
        containerWidth={containerWidth}
        position={wolfPosition}
        setPosition={setWolfPosition}
      />
      <Scene />
      {/* {fallingCircles.map((circle, index) => (
        <Egg />
      ))} */}
    </Stage>
  );
};

export default App;
