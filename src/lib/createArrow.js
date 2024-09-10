const createArrow = (
  scene,
  x,
  y,
  scaleX,
  scaleY,
  angle,
  targetX,
  targetY,
  offsetX,
  offsetY,
  rad,
  color
) => {
  const arrow = scene.add.image(x, y, "arrow", null, { isStatic: true });
  arrow.setScale(scaleX, scaleY);
  arrow.setInteractive();
  arrow.setAngle(angle);

  const circleX = x + offsetX;
  const circleY = y + offsetY;

  const circle = scene.add.graphics({ fillStyle: { color: color } });
  circle.fillCircle(circleX, circleY, rad);

  circle.setInteractive(
    new Phaser.Geom.Circle(circleX, circleY, rad),
    Phaser.Geom.Circle.Contains
  );

  circle.on("pointerdown", () => {
    moveWolf(scene.wolf, targetX, targetY + 40);
  });

  return arrow;
};

function moveWolf(wolf, targetX, targetY) {
  if (!wolf) {
    console.log("Wolf is not defined");
    return;
  }

  const speed = 200;
  const distanceX = targetX - wolf.x;
  const distanceY = targetY - wolf.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  const duration = (distance / speed) * 1000;

  const tween = wolf.scene.tweens.add({
    targets: wolf,
    x: targetX,
    y: targetY,
    duration: duration,
    ease: "Power2",
  });

  if (distanceX < 0) {
    wolf.setScale(0.1, 0.1);
  } else {
    wolf.setScale(-0.1, 0.1);
  }
}

export default createArrow;
