const spawnEggs = (scene, eggCount, house) => {
  let minDelay = 2000;
  let maxDelay = 3000;
  const delayReduction = 100; // Насколько уменьшать интервал появления яиц
  let currentEggCount = 0;

  // Создаем невидимую землю, на которую будут падать яйца
  const spawnEgg = () => {
    if (currentEggCount >= eggCount) {
      clearInterval(eggInterval); // Останавливаем интервал после создания нужного количества яиц
      return;
    }

    // Выбираем случайный домик
    const houseIndex = Phaser.Math.Between(0, house.length - 1);
    const selectedHouse = house[houseIndex];

    // Позиции для яйца
    let x = selectedHouse.reverse ? selectedHouse.x + 20 : selectedHouse.x - 20;
    let y = selectedHouse.reverse ? selectedHouse.y + 20 : selectedHouse.y - 20;

    // Создаем физическое тело в виде эллипса (предполагая, что яйцо овальное)
    let egg = scene.matter.add.image(x, y, "egg", null, {
      shape: "circle",
      restitution: 0.1,
      friction: 0,
      frictionAir: 0.1,
      density: 0.001,
      label: "egg", // Отскок
    });

    // Масштабируем изображение яйца
    egg.setScale(0.1);

    egg.setData("label", "egg");

    // Добавляем яйцо в массив
    egg.setAngularVelocity(0.1);
    egg.setOrigin(0.5, 0.5);
    scene.eggs.push(egg);

    currentEggCount++;

    // Уменьшаем интервал появления яиц
    minDelay = Math.max(500, minDelay - delayReduction);
    maxDelay = Math.max(1000, maxDelay - delayReduction);

    // Обновляем интервал появления следующего яйца
    clearInterval(eggInterval);
    eggInterval = setInterval(
      spawnEgg,
      Phaser.Math.Between(minDelay, maxDelay)
    );
  };

  // Устанавливаем начальный интервал появления яиц
  let eggInterval = setInterval(
    spawnEgg,
    Phaser.Math.Between(minDelay, maxDelay)
  );
};

export default spawnEggs;
