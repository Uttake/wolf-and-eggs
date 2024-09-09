const createWolf = (scene, x = 400, y = 550) => {
  const wolf = scene.matter.add.image(x, y, "wolf", null, {
    isStatic: true,
    label: "wolf",
  });

  wolf.setScale(0.1, 0.1);
  wolf.setData("label", "wolf");
  wolf.setStatic(true);
  //   wolf.setCircle(45);
  //  wolf.body.inertia = Infinity;
  return wolf;
};

export default createWolf;
