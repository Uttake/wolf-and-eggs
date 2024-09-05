import React, { useEffect, useRef } from "react";
import { Stage, Sprite, useTick } from "@pixi/react";
import Matter from "matter-js";
// Убедитесь, что у вас есть изображение шара
import ballImage from "../assets/egg.png";

const Ball = ({ position, engine }) => {
  const ballRef = useRef();

  useEffect(() => {
    const ballBody = Matter.Bodies.circle(position.x, position.y, 25, {
      restitution: 0.8, // Коэффициент упругости
      friction: 0.1, // Коэффициент трения
    });

    Matter.World.add(engine.world, ballBody);
    ballRef.current = ballBody;

    return () => {
      Matter.World.remove(engine.world, ballBody);
    };
  }, [engine, position]);

  useTick(() => {
    if (ballRef.current) {
      const { x, y } = ballRef.current.position;
      ballRef.current.position.x = x;
      ballRef.current.position.y = y;
    }
  });

  return (
    <Sprite
      image={ballImage}
      x={ballRef.current ? ballRef.current.position.x : position.x}
      y={ballRef.current ? ballRef.current.position.y : position.y}
      anchor={0.5}
      width={50} // Убедитесь, что размеры соответствуют вашему изображению
      height={50}
    />
  );
};

const Scene = () => {
  const engine = useRef(Matter.Engine.create()).current;

  useEffect(() => {
    const { world } = engine;
    Matter.World.add(
      world,
      Matter.Bodies.rectangle(400, 580, 800, 40, { isStatic: true })
    ); // Земля

    const render = () => {
      Matter.Engine.update(engine, 1000 / 60); // Обновляем физику 60 кадров в секунду
      requestAnimationFrame(render);
    };
    render();

    return () => {
      Matter.Engine.clear(engine);
    };
  }, [engine]);

  return (
    <Stage width={800} height={600} options={{ backgroundColor: 0x1099bb }}>
      <Ball position={{ x: 400, y: 100 }} engine={engine} />
    </Stage>
  );
};

export default Scene;
