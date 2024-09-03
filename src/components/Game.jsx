import React, { useState, useEffect } from "react";
import { Stage, Sprite, useTick } from "@pixi/react";
import * as PIXI from "pixi.js";
import egg from "../assets/egg.png";
import wolf from "../assets/littleWolf.png";
import background from "../assets/background.webp";
import { useRef } from "react";

const Wolf = ({ position, step }) => {
  return (
    <Sprite
      image={wolf}
      x={position.x}
      y={position.y}
      anchor={0.5}
      height={100}
      width={100}
      scale={step ? { x: -0.1, y: 0.1 } : { x: 0.1, y: 0.1 }}
    />
  );
};

const Egg = ({ position, visible }) => {
  return (
    <Sprite
      image={egg}
      x={position.x}
      y={position.y}
      anchor={0.5}
      width={25}
      height={25}
      visible={visible}
    />
  );
};

const Background = () => {
  return <Sprite image={background} x={0} y={0} width={350} height={500} />;
};

const Game = () => {
  const [wolfPosition, setWolfPosition] = useState({ x: 175, y: 400 });

  const [stepRight, setStepRight] = useState(false);
  const [score, setScore] = useState(0);
  // Логика перемещения волка
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setWolfPosition((prev) => ({ ...prev, x: Math.max(prev.x - 20, 120) }));
        setStepRight(false);
      } else if (event.key === "ArrowRight") {
        setStepRight(true);
        setWolfPosition((prev) => ({ ...prev, x: Math.min(prev.x + 20, 240) }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [eggPositions, setEggPositions] = useState([]);

  const requestRef = useRef();
  const locketIndex = useRef(0);
  const locketPositions = [
    { x: 70, y: 300, angle: 30 }, // Левый верхний лоток с углом 30 градусов
    { x: 250, y: 300, angle: -120 }, // Правый верхний лоток с углом -30 градусов
    { x: 70, y: 350, angle: 45 }, // Левый верхний лоток с углом 45 градусов
    { x: 250, y: 350, angle: -120 }, // Правый верхний лоток с углом -45 градусов
  ];

  const toRadians = (angle) => (angle * Math.PI) / 180;

  const animate = () => {
    setEggPositions((prevEggPositions) =>
      prevEggPositions.map((egg) => {
        const newX = egg.x + egg.speed * Math.cos(toRadians(egg.angle));
        const newY = egg.y + egg.speed * Math.sin(toRadians(90)); // Движение вниз

        const isCaught =
          newX > wolfPosition.x - 20 &&
          newX < wolfPosition.x + 20 &&
          newY > wolfPosition.y - 20 &&
          newY < wolfPosition.y + 20;

        const isOffScreen = newY > 500;

        return {
          ...egg,
          x: isOffScreen ? egg.x : newX,
          y: isOffScreen ? egg.y : newY,
          visible: isCaught ? false : egg.visible,
        };
      })
    );

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  useEffect(() => {
    const eggInterval = setInterval(() => {
      // Выбираем лоток по текущему индексу
      const locket = locketPositions[locketIndex.current];

      // Добавляем новое яйцо с выбранного лотка
      setEggPositions((prevEggPositions) => [
        ...prevEggPositions,
        {
          x: locket.x,
          y: locket.y,
          speed: 1,
          angle: locket.angle,
          visible: true,
        },
      ]);

      // Переходим к следующему лотку
      locketIndex.current = (locketIndex.current + 1) % locketPositions.length;
    }, 1000); // Каждую секунду новое яйцо

    return () => clearInterval(eggInterval);
  }, []);

  useEffect(() => {
    eggPositions.forEach((egg) => {
      if (!egg.visible) {
        setScore((prev) => prev + 1);
      }
    });
  }, [eggPositions]);
  return (
    <div>
      <h1>Ну, погоди! Score: {score}</h1>
      <Stage width={350} height={500} options={{ background: "blue" }}>
        <Background />
        <Wolf position={wolfPosition} step={stepRight} />
        {eggPositions.map((egg, index) => (
          <Egg
            key={index}
            position={{ x: egg.x, y: egg.y }}
            visible={egg.visible}
          />
        ))}
      </Stage>
    </div>
  );
};

export default Game;
