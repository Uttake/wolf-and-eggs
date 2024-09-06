import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import egg from "../assets/egg.png";
import Matter from "matter-js";
import house from "../assets/chickenHouse.png";

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
  };

  const create = function () {
    const background = this.add.image(0, 0, "background");
    background.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
    background.setOrigin(0, 0);
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    let house = [
      {
        x: screenWidth * 0.8,
        y: screenHeight * 0.5,
        points: [
          { x: -30, y: 10 }, // Верхняя точка
          { x: 30, y: 10 }, // Правая верхняя
          { x: 30, y: -10 }, // Правая нижняя
          { x: -30, y: -10 }, // Нижняя точка
        ],
      },
      {
        x: screenWidth * 0.8,
        y: screenHeight * 0.7,
        points: [
          { x: -30, y: 10 }, // Верхняя точка
          { x: 30, y: 10 }, // Правая верхняя
          { x: 30, y: -10 }, // Правая нижняя
          { x: -30, y: -10 }, // Нижняя точка
        ],
      },
      {
        x: screenWidth * 0.2,
        y: screenHeight * 0.5,
        reverse: true,
        points: [
          { x: 30, y: -10 }, // Верхняя точка
          { x: -30, y: -10 }, // Правая верхняя
          { x: -30, y: 10 }, // Правая нижняя
          { x: 30, y: 10 }, // Нижняя точка
        ],
      },

      {
        x: screenWidth * 0.2,
        y: screenHeight * 0.7,
        reverse: true,
        points: [
          { x: 30, y: -10 }, // Верхняя точка
          { x: -30, y: -10 }, // Правая верхняя
          { x: -30, y: 10 }, // Правая нижняя
          { x: 30, y: 10 }, // Нижняя точка
        ],
      },
    ];

    let housesCord = [];

    house.map((item) => {
      let house = this.matter.add.image(item.x, item.y, "house", {});

      housesCord.push([house.xm]);

      house.setStatic(true);
      house.setBody(null);

      house.setSensor(true);

      const rect1 = this.matter.add.rectangle(
        item.reverse ? house.x + 40 : house.x - 40,
        house.y + 46,
        75,
        10,
        {
          isStatic: true,
          angle: Phaser.Math.DegToRad(151),
        }
      );

      const rect2 = this.matter.add.rectangle(
        item.reverse ? house.x - 25 : house.x + 25,

        house.y + 28,
        70,
        10,
        {
          isStatic: true,
        }
      );
      if (item.reverse) {
        house.setScale(-0.3, 0.3);
        Matter.Body.scale(rect1, -1, 1);
      } else {
        house.setScale(0.3, 0.3);
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

    const eggCount = 4;
    const minDelay = 500;
    const maxDelay = 1500;

    for (let i = 0; i < 4; i++) {
      // Создаем физическое тело в виде эллипса (предполагая, что яйцо овальное)
      const delay = Phaser.Math.Between(minDelay, maxDelay);
      setTimeout(() => {
        // Позиции для яйца
        let x = house[i].reverse ? house[i].x + 20 : house[i].x - 20;
        let y = house[i].reverse ? house[i].y + 20 : house[i].y - 20;

        // Создаем физическое тело в виде эллипса (предполагая, что яйцо овальное)
        let egg = this.matter.add.image(x, y, "egg", null, {
          shape: "circle",
          restitution: 0.6,
          friction: 0,
          frictionAir: 0.1,
          density: 0.001, // Отскок
        });

        // Масштабируем изображение яйца
        egg.setScale(0.1);

        // Добавляем яйцо в массив
        egg.setAngularVelocity(0.1);
        egg.setOrigin(0.5, 0.5);
        this.eggs.push(egg);
      }, delay);
    }

    this.matter.world.setBounds(true);
  };

  const CreateEggs = () => {
    console.log(this.eggs);
  };

  const update = function () {};

  return <div id="phaser-game"></div>;
};

export default AirFrictionExample;
