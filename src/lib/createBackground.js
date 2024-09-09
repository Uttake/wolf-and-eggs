const createBackground = (scene, x, y) => {
  const background = scene.add.image(x, y, "background");
  background.setOrigin(0, 0);
  return background;
};

export default createBackground;
