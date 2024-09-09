const createGround = (scene, x, y) => {
  const ground = scene.matter.add.rectangle(x / 2, y, x, 20, {
    isStatic: true,
    // render: { visible: false },
    label: "ground",
  });
};

export default createGround;
