const setupCollisionHandler = (scene, setScore, score) => {
  scene.matter.world.on("collisionstart", (event) => {
    event.pairs.forEach((pair) => {
      const { bodyA, bodyB } = pair;
      const labelA = bodyA.gameObject?.getData("label");
      const labelB = bodyB.gameObject?.getData("label");

      if (
        (bodyA.label === "egg" && bodyB.label === "ground") ||
        (bodyB.label === "egg" && bodyA.label === "ground")
      ) {
        const egg = labelA === "egg" ? bodyA.gameObject : bodyB.gameObject;
        egg.setTexture("cracked_egg");

        scene.time.delayedCall(500, () => {
          egg.destroy();
        });
      }

      if (
        (labelA === "egg" && labelB === "wolf") ||
        (labelB === "egg" && labelA === "wolf")
      ) {
        const egg = labelA === "egg" ? bodyA.gameObject : bodyB.gameObject;
        setScore(score++);
        egg.destroy();
      }
    });
  });
};

export default setupCollisionHandler;
