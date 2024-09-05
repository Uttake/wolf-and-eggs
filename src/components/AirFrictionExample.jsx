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
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
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

    const graphics = this.add.graphics({ fillStyle: { color: 0x00ff00 } });

    // Добавляем этот графический объект как физическое тело
    const rectSprite = this.add.sprite(100, 100, null);
    rectSprite.setDisplaySize(75, 20); // Задаем размеры
    rectSprite.setAngle(45); // Поворачиваем на 45 градусов

    // Если нужно сделать его физическим телом
    this.physics.add.existing(rectSprite, true);

    // Пример перемещения с коллайдером

    // Добавляем коллайдер для объекта и линии

    // Создаем группу яиц
    this.eggs = this.physics.add.group({
      key: "egg",
      repeat: 4,
      setXY: { x: 5, y: 50, stepX: 100 },
      setScale: { x: 0.1, y: 0.1 },
      restitution: 0.8, // Масштабируем яйца, чтобы они выглядели как эллипсы
    });

    this.eggs.children.iterate((egg) => {
      egg.setBounce(0.2); // Устанавливаем упругость
      egg.setCollideWorldBounds(true);
    });

    // Добавляем столкновение яиц с прямоугольником

    this.physics.add.collider(this.eggs, rectSprite);
    // Добавляем столкновение яиц с миром
    this.physics.world.setBoundsCollision(true, true, true, true);
  };

  const update = function () {
    // Логика обновления игры
  };

  return <div id="phaser-game"></div>;
};

export default AirFrictionExample;
