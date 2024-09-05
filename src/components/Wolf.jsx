import { Sprite } from "@pixi/react";
import wolf from "../assets/littleWolf.png";
import { useEffect, useState, useRef } from "react";

const Wolf = ({ position, setPosition, containerWidth }) => {
  const [step, setStep] = useState("right");

  const spriteRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        setPosition((prev) => ({
          ...prev,
          x: Math.max(prev.x - 10, containerWidth * 0.35),
        }));
        setStep("left");
      } else if (event.key === "ArrowRight") {
        setStep("right");
        setPosition((prev) => ({
          ...prev,
          x: Math.min(prev.x + 10, containerWidth * 0.65),
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Sprite
      ref={spriteRef}
      image={wolf}
      x={position.x}
      y={position.y}
      anchor={0.5}
      height={100}
      width={100}
      scale={step === "right" ? { x: -0.1, y: 0.1 } : { x: 0.1, y: 0.1 }}
    />
  );
};

export default Wolf;
