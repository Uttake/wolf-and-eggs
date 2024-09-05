import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import egg from "../assets/egg.png";
import Matter from "matter-js";

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
        arcade: {
          gravity: { y: 1 },
          debug: true,
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
    this.load.image("background", "/background.webp");
    this.load.image("egg", egg);
  };

  const create = function () {
    // Создаем прямоугольник, по которому будут скатываться яйца
    const background = this.add.image(0, 0, "background");
    background.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);
    background.setOrigin(0, 0);

    //asdadsasd

    // Создаем графический объект для рисования прямоугольника
    const graphics = this.add.graphics();

    // Задаем цвет прямоугольника
    graphics.fillStyle(0x00ff00, 1); // Зеленый цвет

    // Рисуем прямоугольник с заданными координатами, шириной и высотой
    graphics.fillRect(0, 0, 100, 5); // Рисуем относительно (0, 0)

    // Создаем физическое тело (прямоугольник) с Matter.js
    const rectBody = this.matter.add.rectangle(0, 200, 100, 5, {
      isStatic: true,
    });

    // Поворачиваем физическое тело на 45 градусов
    this.matter.body.setAngle(rectBody, Phaser.Math.DegToRad(30));

    // Привязываем графику к физическому телу
    const rectSprite = this.add.container(
      rectBody.position.x,
      rectBody.position.y,
      [graphics]
    );

    // Устанавливаем привязку контейнера к физическому телу
    rectSprite.setSize(200, 100);
    this.matter.add.gameObject(rectSprite, rectBody);

    //asdasdasd
    // Создаем группу яиц
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
