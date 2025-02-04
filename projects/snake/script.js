let secondsPassed;
let oldTimeStamp = 0;
let fps;

//Snake shii

let snakex = 0;
let snakey = 0;
let applex;
let appley;
let score = 0;

let snakedir = "right";
let snakeNextDir = "right";

let snakeBody = [];
let gameover = false;

const makeTitle = () => {
  const elem = document.createElement("h1");
  const title = document.createTextNode("Snake JS");
  elem.appendChild(title);

  const board = document.getElementById("game-container");
  document.body.insertBefore(elem, board);
};
const clearBoard = () => {
  const canvas = document.getElementById("game-board");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 500, 500);
  }
};
const makeBoard = () => {
  const canvas = document.getElementById("game-board");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    for (let i = 1; i < 50; i++) {
      ctx.moveTo(i * 10, 0);
      ctx.lineTo(i * 10, 500);
      ctx.stroke();
    }

    for (let i = 1; i < 50; i++) {
      ctx.moveTo(0, i * 10);
      ctx.lineTo(500, i * 10);
      ctx.stroke();
    }
  }
  setScore(score);
};
const drawPlayer = (x, y) => {
  const canvas = document.getElementById("game-board");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(0, 0, 255)";
    for (let i = 0; i < snakeBody.length; i++) {
      const x_ = snakeBody.at(i).x;
      const y_ = snakeBody.at(i).y;
      ctx.fillRect(x_, y_, 10, 10);
    }

    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(x, y, 10, 10);
  }
};
const drawApple = (x, y) => {
  const canvas = document.getElementById("game-board");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(x, y, 10, 10);
  }
};
const setScore = (s) => {
  const scoreText = document.getElementById("score-text");
  scoreText.innerHTML = s;
};
const draw = () => {
  clearBoard();
  //makeBoard();
  drawPlayer(snakex, snakey);
  drawApple(applex, appley);
};

const touching = (obj1, obj2) => {
  if (
    obj1.x < obj2.x + obj2.w &&
    obj1.x + obj1.w > obj2.x &&
    obj1.y < obj2.y + obj2.h &&
    obj1.y + obj1.h > obj2.y
  ) {
    return true;
  }
  return false;
};

const update = (delta) => {
  for (let i = snakeBody.length; i > 1; i--) {
    snakeBody.at(i - 1).x = snakeBody.at(i - 2).x;
    snakeBody.at(i - 1).y = snakeBody.at(i - 2).y;
  }

  if (snakeBody.length > 0) {
    snakeBody.at(0).x = snakex;
    snakeBody.at(0).y = snakey;
  }

  if (snakedir === "up") {
    snakey -= 100 * delta;
  } else if (snakedir === "down") {
    snakey += 100 * delta;
  } else if (snakedir === "left") {
    snakex -= 100 * delta;
  } else {
    snakex += 100 * delta;
  }

  snakedir = snakeNextDir;
  /*
	if(Math.floor(snakex) % 10 === 0)// && Math.floor(snakey) % 10 === 0)
	{
		snakedir = snakeNextDir;
	}
	*/

  /*	collisions	*/
  for (let i = 10; i < snakeBody.length; i++) {
    if (
      Math.floor(snakex) === Math.floor(snakeBody.at(i).x) &&
      Math.floor(snakey) === Math.floor(snakeBody.at(i).y)
    ) {
      gameover = true;
    }
  }

  if (
    Math.floor(snakex) < 0 ||
    Math.floor(snakex) > 500 ||
    Math.floor(snakey) < 0 ||
    Math.floor(snakey) > 500
  ) {
    gameover = true;
  }

  if (
    touching(
      { x: snakex, y: snakey, w: 10, h: 10 },
      { x: applex, y: appley, w: 10, h: 10 },
    )
  ) {
    score += 1;
    applex = Math.floor(Math.random() * 501);
    appley = Math.floor(Math.random() * 501);
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });
    snakeBody.push({ x: -50, y: -10 });

    setScore(score);
  }
};

window.addEventListener(
  "keydown",
  (event) => {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "w":
        if (snakedir !== "down") snakeNextDir = "up";
        break;
      case "s":
        if (snakedir !== "up") snakeNextDir = "down";
        break;
      case "a":
        if (snakedir !== "right") snakeNextDir = "left";
        break;
      case "d":
        if (snakedir !== "left") snakeNextDir = "right";
        break;
      case "r":
        if (gameover) {
          score = 0;
          setScore(score);
          snakex = 10;
          snakey = 10;
          snakeDir = "right";
          snakeNextDir = "right";
          while (snakeBody.length > 0) {
            snakeBody.pop();
          }
          applex = Math.floor((Math.random() * 501) / 10);
          appley = Math.floor((Math.random() * 501) / 10);
          gameover = false;
        }
      default:
        return;
    }

    event.preventDefault();
  },
  true,
);

const gameloop = (timeStamp) => {
  secondsPassed = (timeStamp - oldTimeStamp) / 1000;
  oldTimeStamp = timeStamp;

  fps = Math.round(1 / secondsPassed);

  if (!gameover) {
    update(secondsPassed);
    draw();
  }

  window.requestAnimationFrame(gameloop);
};

const run = () => {
  makeTitle();
  makeBoard();

  applex = Math.floor((Math.random() * 501) / 10);
  appley = Math.floor((Math.random() * 501) / 10);

  window.requestAnimationFrame(gameloop);
};

window.addEventListener("load", run);
