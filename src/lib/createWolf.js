const createWolf = (scene, x = 400, y = 550) => {
  const wolf = scene.matter.add.image(x, y, "wolf", null, {
    isStatic: true,
    label: "wolf",
  });

  wolf.setScale(0.1, 0.1);
  wolf.setData("label", "wolf");
  wolf.setStatic(true);

  const scaledWidth = wolf.width * wolf.scaleX;
  const scaledHeight = wolf.height * wolf.scaleY;

  const customHitboxWidth = scaledWidth * 0.73;
  const customHitboxHeight = scaledHeight * 0.9;

  wolf.setBody({
    type: "rectangle",
    width: customHitboxWidth,
    height: customHitboxHeight,
  });

  wolf.setStatic(true);
  wolf.setFixedRotation();

  return wolf;
};

export default createWolf;
