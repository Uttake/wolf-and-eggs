import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import egg from "../assets/egg.png";
import Matter from "matter-js";
import house from "../assets/chickenHouse.png";
import brokenEgg from "../assets/brokenEgg.png";
import wolf from "../assets/littleWolf.png";
import { useState } from "react";
import arrow from "../assets/arrow.png";
import createWolf from "../lib/createWolf";
import createBackground from "../lib/createBackground";
import createGround from "../lib/createGround";
import createArrow from "../lib/createArrow";
import setupCollisionHandler from "../lib/collisionHandler";
import spawnEggs from "../lib/eggsSpawner";
import ladder from "../assets/ladder.png";

let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

const MIN_X = screenWidth * 0.385;
const MAX_X = screenWidth * 0.615;
const MIN_Y = screenHeight * 0.4;
const MAX_Y = screenHeight * 0.73;

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

const AirFrictionExample = ({ setScore, score }) => {
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
    this.load.image("arrow", arrow);
    this.load.image("ladder", ladder);
  };

  const create = function () {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;

    const background = createBackground(this, 0, 0);
    background.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);

    const wolf = createWolf(this, screenWidth / 2, screenHeight * 0.73);
    wolf.setDepth(1);

    this.wolf = wolf;

    const ground = createGround(
      this,
      screenWidth,
      screenHeight * 0.8,
      screenWidth
    );

    const ladder = this.matter.add.image(
      screenWidth / 2,
      screenHeight * 0.56,
      "ladder",
      null,
      {
        isStatic: true,
        collisionFilter: {
          category: 0x0001,
          mask: 0x0000, // Маска, указывающая, что объект не будет сталкиваться с другими объектами
        },
      }
    );

    ladder.setScale(0.04, 0.05);
    ladder.setDepth(0);

    const rightArrow = createArrow(
      this,
      screenWidth * 0.63,
      screenHeight * 0.88,
      0.03,
      0.03,
      0,
      "right"
    );

    const leftArrow = createArrow(
      this,
      screenWidth * 0.37,
      screenHeight * 0.88,
      -0.03,
      0.03,
      0,
      "left"
    );

    const topArrow = createArrow(
      this,
      screenWidth * 0.5,
      screenHeight * 0.83,
      0.03,
      -0.03,
      270,
      "top"
    );

    const bottomArrow = createArrow(
      this,
      screenWidth * 0.5,
      screenHeight * 0.93,
      0.03,
      -0.03,
      90,
      "bottom"
    );

    let house = [
      {
        x: screenWidth * 0.85,
        y: screenHeight * 0.4,
        points: [
          { x: -30, y: 10 }, // Верхняя точка
          { x: 30, y: 10 }, // Правая верхняя
          { x: 30, y: -10 }, // Правая нижняя
          { x: -30, y: -10 }, // Нижняя точка
        ],
      },
      {
        x: screenWidth * 0.85,
        y: screenHeight * 0.55,
        points: [
          { x: -30, y: 10 }, // Верхняя точка
          { x: 30, y: 10 }, // Правая верхняя
          { x: 30, y: -10 }, // Правая нижняя
          { x: -30, y: -10 }, // Нижняя точка
        ],
      },
      {
        x: screenWidth * 0.15,
        y: screenHeight * 0.4,
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
        y: screenHeight * 0.55,
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

    setupCollisionHandler(this, setScore, score);
    spawnEggs(this, 50, house);
  };

  const CreateEggs = () => {
    console.log(this.eggs);
  };

  const update = function () {
    const wolf = this.wolf;

    if (wolf) {
      // Проверка границ
      wolf.x = Phaser.Math.Clamp(wolf.x, MIN_X, MAX_X);
      wolf.y = Phaser.Math.Clamp(wolf.y, MIN_Y, MAX_Y);
      wolf.body.angularVelocity = 0;
    }
  };

  return <div id="phaser-game"></div>;
};

export default AirFrictionExample;
