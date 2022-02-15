import Ball from "./model/Ball.js";
import Paddle from "./model/Paddle.js";
import Sprite from "./model/Sprite.js";
import Brick from "./model/Brick.js";

import "./style.css";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const ball = new Ball(
  canvas.width / 2,
  canvas.height - 30,
  10,
  10,
  "#0095DD",
  2,
  -2
);

// creating a paddle object
const paddle = new Paddle(
  (canvas.width - 10) / 2,
  canvas.height - 10,
  75,
  10,
  "#0095DD"
);

// bricks
const brickRowCount = 3;
const brickColumnCount = 5;
const bricks = [];
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

for (let c = 0; c < brickColumnCount; c++) {
  for (let r = 0; r < brickRowCount; r++) {
    let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    bricks.push(new Brick(brickX, brickY, brickWidth, brickHeight, "#0095DD"));
  }
}


// keeps track of game over or not
let isGameOver = false;

// score
let score = 0;

function draw() {
  // background
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw
  ball.draw(ctx);
  ball.move();

  // calling Ball methods in OOP
  // bounce, and also, check whether ball bounced off
  // the bottom edge or not
  isGameOver = !ball.bounce(canvas.width, canvas.height);

  // paddle methods (animations, doing things)
  paddle.draw(ctx);
  paddle.move(canvas.width);

  // checking if ball collides with paddle
  ball.collides(paddle);

  // brick drawing
  bricks.forEach((brick) => {
    brick.draw(ctx);
    if (brick.collides(ball)) {
      score++;
    }
  });
  
  // score
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);


  // game over?
  if (!isGameOver) {
    // check game won
    if (score == brickColumnCount * brickRowCount) {
      window.alert("You won!");
    } else {
      // keep animating
      window.requestAnimationFrame(draw);
    }
  } else {
    // game over message
    window.alert("Game over!");
  }

}

draw();
