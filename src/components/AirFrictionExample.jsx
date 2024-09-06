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
          debug: {
            showAxes: true, // Показывать оси тел
            showAngleIndicator: true, // Показывать углы
            showVelocity: true, // Показывать векторы скорости
            showCollisions: true, // Показывать области столкновений
            showBounds: true, // Показывать границы тел
          },
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
        invis: true,
      },
      {
        x: screenWidth * 0.2,
        y: screenHeight * 0.5,
        reverse: true,
        invis: true,
      },

      {
        x: screenWidth * 0.2,
        y: screenHeight * 0.7,
        reverse: true,
        invis: true,
      },
    ];

    house.map((item) => {
      let house = this.matter.add.image(item.x, item.y, "house", {});

      house.setStatic(true);
      house.setBody(null);
      item.reverse ? house.setScale(-0.3, 0.3) : house.setScale(0.3, 0.3);

      if (item.points) {
        house.setSensor(true);
        var rect1 = this.matter.add.rectangle(
          house.x - 40,
          house.y + 46,
          75,
          10,
          {
            isStatic: true,
            angle: Phaser.Math.DegToRad(151),
          }
        );

        // Верхний прямоугольник

        // Создание второго прямоугольного тела (ниже)
        var rect2 = this.matter.add.rectangle(
          house.x + 25,
          house.y + 28,
          70,
          10,
          {
            isStatic: true,
          }
        ); // Нижний прямоугольник

        // Соединение прямоугольников с изображением курятника
        this.matter.add.constraint(house, rect1, 0, 0.9, {
          pointA: { x: 0, y: -30 },
          pointB: { x: 0, y: 0 },
        });
        this.matter.add.constraint(house, rect2, 0, 0.9, {
          pointA: { x: 0, y: 30 },
          pointB: { x: 0, y: 0 },
        });
        // Соединяем порог и основной объект в составное тело
      }

      if (item.invis) {
        house.setSensor(true);
      }
    });

    this.eggs = [];

    for (let i = 0; i < 5; i++) {
      // Создаем физическое тело в виде эллипса (предполагая, что яйцо овальное)
      let egg = this.matter.add.image(50 + i * 100, 50, "egg", null, {
        shape: "circle", // Matter.js не поддерживает эллипсы напрямую, поэтому используем круг
        restitution: 0.8, // Отскок
      });

      // Масштабируем изображение яйца
      egg.setScale(0.1);

      // Добавляем яйцо в массив
      this.eggs.push(egg);
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
