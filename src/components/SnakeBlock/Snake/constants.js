const CANVAS_SIZE = [800, 710];
const SNAKE_START = [
  [7, 5],
  [6, 5],
  [5, 5]
];
const SNAKE_EYES = [[7.4, 5.4], []]
const APPLE_START = [15.5, 5.5];
const SCALE = 40;
const SPEED = 120;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export {
  SNAKE_EYES,
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
};