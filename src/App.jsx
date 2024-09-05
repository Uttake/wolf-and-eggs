// App.js
import { useState, useRef, useEffect } from "react";
import { Stage, Sprite } from "@pixi/react";

import Wolf from "./components/Wolf";
import Egg from "./components/Egg";
import background from "./assets/background.webp";
import Matter from "matter-js";
import AirFrictionExample from "./components/AirFrictionExample";

const Background = ({ w, h }) => {
  return <Sprite image={background} x={0} y={0} width={w} height={h} />;
};

const App = () => {
  // const containerWidth = window.innerWidth;
  // const containerHeight = window.innerHeight;

  // const [wolfPosition, setWolfPosition] = useState({
  //   x: containerWidth * 0.5,
  //   y: containerHeight * 0.85,
  // });

  // const [eggPositions, setEggPositions] = useState([]);

  // const engineRef = useRef(null);
  // const worldRef = useRef(null);
  // const ballRef = useRef(null);
  // const requestRef = useRef(null);

  // useEffect(() => {
  //   // Создаем движок и мир Matter.js
  //   const engine = Matter.Engine.create();
  //   const world = engine.world;
  //   engineRef.current = engine;
  //   worldRef.current = world;

  //   // Создаем землю
  //   const ground = Matter.Bodies.rectangle(
  //     window.innerWidth / 2,
  //     window.innerHeight - 50,
  //     window.innerWidth,
  //     10,
  //     {
  //       isStatic: true,
  //     }
  //   );
  //   Matter.World.add(world, ground);

  //   // Создаем шар
  //   const ball = Matter.Bodies.circle(window.innerWidth / 2, 0, 30, {
  //     restitution: 0.8, // Коэффициент упругости
  //   });
  //   Matter.World.add(world, ball);
  //   ballRef.current = ball;

  //   // Запуск движка
  //   Matter.Runner.run(engine);

  //   // Обновление позиций
  //   const updatePositions = () => {
  //     setEggPositions({ x: ball.position.x, y: ball.position.y });
  //     requestRef.current = requestAnimationFrame(updatePositions);
  //   };

  //   requestRef.current = requestAnimationFrame(updatePositions);

  //   return () => {
  //     cancelAnimationFrame(requestRef.current);
  //     Matter.Engine.clear(engine);
  //   };
  // }, []);

  return (
    // <>
    //   <AirFrictionExample />
    //   <Stage
    //     width={containerWidth}
    //     height={containerHeight}
    //     options={{ backgroundColor: 0x1099bb }}
    //   >
    //     <Background w={containerWidth} h={containerHeight} />
    //     <Wolf
    //       containerWidth={containerWidth}
    //       position={wolfPosition}
    //       setPosition={setWolfPosition}
    //     />
    //     {/* <Egg position={eggPositions} /> */}
    //   </Stage>
    // </>
    <AirFrictionExample />
  );
};

export default App;
