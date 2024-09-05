import { Sprite } from "@pixi/react";
import egg from "../assets/egg.png";

const Egg = ({ position }) => {
  return (
    <Sprite
      image={egg}
      x={position.x}
      y={position.y}
      anchor={0.5}
      width={25}
      height={25}
    />
  );
};

export default Egg;
