let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

export let houseData = [
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
