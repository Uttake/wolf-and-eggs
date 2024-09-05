import { Sprite } from "@pixi/react";
import egg from "../assets/egg.png";

const Egg = ({ position, visible }) => {
  return (
    <Sprite
      image={egg}
      x={0}
      y={0}
      anchor={0.5}
      width={25}
      height={25}
      visible={visible}
    />
  );
};

export default Egg;
