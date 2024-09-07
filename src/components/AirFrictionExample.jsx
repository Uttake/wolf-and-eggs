import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import egg from "../assets/egg.png";
import Matter from "matter-js";
import house from "../assets/chickenHouse.png";
import brokenEgg from "../assets/brokenEgg.png";
import wolf from "../assets/littleWolf.png";
import { useState } from "react";

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

let lines = [
  {
    x: 150,
    y: screenHeight + 50,
  },
  {
    x: 50,
    y: 250,
  },
  {
    x: 20,
    y: 100,
  },
  {
    x: 50,
    y: 200,
  },
];

const AirFrictionExample = () => {
  const [nWolf, setNWolf] = useState(true);
  const gameRef = useRef(null);

  useEffect(() => {
    // Конфигурация игры
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      physics: {
        default: "matter",
        matter: {
          gravity: { y: 0.8 },
          // debug: {
          //   showAxes: true, // Показывать оси тел
          //   showAngleIndicator: true, // Показывать углы
          //   showVelocity: true, // Показывать векторы скорости
          //   showCollisions: true, // Показывать области столкновений
          //   showBounds: true, // Показывать границы тел
          // },
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    // Инициализация игры
    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      game.destroy(true);
    };
  }, []);

  const preload = function () {
    this.load.image("background", "/background.png");
    this.load.image("egg", egg);
    this.load.image("house", house);
    this.load.image("cracked_egg", brokenEgg);
    this.load.image("wolf", wolf);
  };

  const create = function () {
    const background = this.add.image(0, 0, "background");
    background.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
    background.setOrigin(0, 0);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    const wolf = this.matter.add.image(
      screenWidth / 2,
      screenHeight - 200,
      "wolf",
      {
        isStatic: true,
      }
    );

    wolf.setDisplaySize(100, 100);
    wolf.setData("label", "wolf");

    this.input.on("pointermove", (pointer) => {
      if (wolf) {
        // Получаем новую позицию по X
        const newX = Phaser.Math.Clamp(pointer.x, 0, this.game.config.width);
        Matter.Body.setPosition(wolf.body, { x: newX, y: wolf.y });
      }
    });

    const ground = this.matter.add.rectangle(
      this.scale.width / 2,
      this.scale.height - 50,
      this.scale.width,
      20,
      {
        isStatic: true,
        render: { visible: false },
        label: "ground",
      }
    );

    let house = [
      {
        x: screenWidth * 0.85,
        y: screenHeight * 0.6,
        points: [
          { x: -30, y: 10 }, // Верхняя точка
          { x: 30, y: 10 }, // Правая верхняя
          { x: 30, y: -10 }, // Правая нижняя
          { x: -30, y: -10 }, // Нижняя точка
        ],
      },
      {
        x: screenWidth * 0.85,
        y: screenHeight * 0.75,
        points: [
          { x: -30, y: 10 }, // Верхняя точка
          { x: 30, y: 10 }, // Правая верхняя
          { x: 30, y: -10 }, // Правая нижняя
          { x: -30, y: -10 }, // Нижняя точка
        ],
      },
      {
        x: screenWidth * 0.15,
        y: screenHeight * 0.6,
        reverse: true,
        points: [
          { x: 30, y: -10 }, // Верхняя точка
          { x: -30, y: -10 }, // Правая верхняя
          { x: -30, y: 10 }, // Правая нижняя
          { x: 30, y: 10 }, // Нижняя точка
        ],
      },

      {
        x: screenWidth * 0.15,
        y: screenHeight * 0.75,
        reverse: true,
        points: [
          { x: 30, y: -10 }, // Верхняя точка
          { x: -30, y: -10 }, // Правая верхняя
          { x: -30, y: 10 }, // Правая нижняя
          { x: 30, y: 10 }, // Нижняя точка
        ],
      },
    ];

    house.map((item) => {
      let house = this.matter.add.image(item.x, item.y, "house", 0);
      house.setStatic(true);
      house.setBody(null);
      house.setSensor(true);

      const rect1 = this.matter.add.rectangle(
        item.reverse ? house.x + 30 : house.x - 30,
        house.y + 30,
        45,
        5,
        {
          isStatic: true,
          angle: Phaser.Math.DegToRad(151),
        }
      );

      const rect2 = this.matter.add.rectangle(
        item.reverse ? house.x - 25 : house.x + 25,

        house.y + 20,
        45,
        5,
        {
          isStatic: true,
        }
      );
      if (item.reverse) {
        house.setScale(-0.2, 0.2);
        Matter.Body.scale(rect1, -1, 1);
      } else {
        house.setScale(0.2, 0.2);
      }

      // Соединение прямоугольников с изображением курятника
      this.matter.add.constraint(house, rect1, 0, 0.9, {
        pointA: { x: 0, y: -30 },
        pointB: { x: 0, y: 0 },
      });
      this.matter.add.constraint(house, rect2, 0, 0.9, {
        pointA: { x: 0, y: 30 },
        pointB: { x: 0, y: 0 },
      });

      if (item.invis) {
        house.setSensor(true);
      }
    });

    this.eggs = [];

    const spawnEggs = (scene, eggCount) => {
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
        let x = selectedHouse.reverse
          ? selectedHouse.x + 20
          : selectedHouse.x - 20;
        let y = selectedHouse.reverse
          ? selectedHouse.y + 20
          : selectedHouse.y - 20;

        // Создаем физическое тело в виде эллипса (предполагая, что яйцо овальное)
        let egg = scene.matter.add.image(x, y, "egg", null, {
          shape: "circle",
          restitution: 0.6,
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

        setupCollisionHandler(scene);

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

    function setupCollisionHandler(scene) {
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

            scene.time.delayedCall(1000, () => {
              egg.destroy();
            });
          }

          if (
            (labelA === "egg" && labelB === "wolf") ||
            (labelB === "egg" && labelA === "wolf")
          ) {
            const egg = labelA === "egg" ? bodyA.gameObject : bodyB.gameObject;
            egg.destroy();
          }
        });
      });
    }

    spawnEggs(this, 50);
  };

  const CreateEggs = () => {
    console.log(this.eggs);
  };

  const update = function () {};

  return <div id="phaser-game"></div>;
};

export default AirFrictionExample;
