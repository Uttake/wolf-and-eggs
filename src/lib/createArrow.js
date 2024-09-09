const createArrow = (scene, x, y, scaleX, scaleY, angle, moveDirection) => {
  const arrow = scene.add.image(x, y, "arrow", null, { isStatic: true });
  arrow.setScale(scaleX, scaleY);
  arrow.setInteractive(); // Делает объект интерактивным

  arrow.setAngle(angle);

  // let isPointerDown = false;

  arrow.on("pointerdown", () => {
    moveWolf(scene.wolf, moveDirection);
  });

  // arrow.on("pointerup", () => {
  //   isPointerDown = false;
  // });

  // arrow.on("pointerout", () => {
  //   isPointerDown = false;
  // });

  return arrow;
};

function moveWolf(wolf, direction) {
  if (!wolf) {
    console.log("Wolf is not defined");
    return;
  }

  const moveDistance = 15; // Расстояние, на которое перемещается волк

  switch (direction) {
    case "left":
      wolf.setScale(0.1, 0.1);
      wolf.x -= moveDistance;
      break;
    case "right":
      wolf.setScale(-0.1, 0.1);
      wolf.x += moveDistance;
      break;
    case "top":
      wolf.y -= moveDistance;
      break;
    case "bottom":
      wolf.y += moveDistance;
    default:
      break;
  }

  // if (isPointerDown) {
  //   setTimeout(() => moveWolf(wolf, direction), 100);
  // }
}

export default createArrow;
