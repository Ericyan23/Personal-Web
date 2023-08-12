let moveMent = 280
let rightPress = false
let leftPress = false
let game = true
let dx = 6
let dy = 6
let score = 0
let lives = 3
let livesRestart = false
const bricks = []
const brickColors = ["#f3bebe", "#f4d6c6", "#d0f3cd", "#c9e5ff", "#c9e5ff", "#c9e5ff", "#c9e5ff", "#c9e5ff"];

const circle = {
  x: moveMent + 50,
  y: 380,
  radius: 20
}

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.style('display', 'block');
  canvas.style('padding-top', '6vh');
  canvas.style('padding-bottom', '10vh');
  canvas.style('margin-left', '25%');
  canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
  createBricks()
}

function paddle() {
  stroke('purple')
  fill('#FF6961')
  rect(moveMent, 385, 100, 15, 20)
  if (rightPress && moveMent < 500) {
    moveMent += 10
  }
  if (leftPress && moveMent > 0) {
    moveMent += -10
  }
}

function ball() {
  noStroke()
  fill('#FBD8F8')
  ellipse(circle.x, circle.y, circle.radius, circle.radius)
  if (circle.y <= 0) {
    dy = -dy
    score++
  }
  if (circle.y >= height - 15 && circle.x > moveMent && circle.x <= moveMent + 50) {
    dy = -dy
    if (dx > 0) dx = -dx
    if (dx < 0) dx = dx
  }
  if (circle.y >= height - 15 && circle.x > moveMent + 50 && circle.x <= moveMent + 100) {
    dy = -dy
    if (dx > 0) dx = dx
    if (dx < 0) dx = -dx
  }
  if (circle.x >= width - 10 || circle.x <= 0) dx = -dx

  bricks.forEach((item, index) => {
    if (checkCollisionBottom(circle, item)) {
      dy = -dy
      score++
      bricks.splice(index, 1)
    }
  })

  if (circle.y > height) {
    lives--
    livesRestart = true
    if (lives === 0) game = false
  }
  circle.x += dx
  circle.y += dy
}

function createBricks() {
  const rows = 8
  const cols = 10
  const brickWidth = width / cols
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let brick = {
        x: i * 58 + 10,
        y: j * 12 + 30,
        w: 57,
        h: 10,
        color: brickColors[j]
      }
      bricks.push(brick)
    }
  }
}

function drawBricks() {
  bricks.forEach(brick => {
    fill(brick.color)
    rect(brick.x, brick.y, brick.w, brick.h)
  })
}

function keyPressed(value) {
  if (value.key === 'ArrowRight') {
    rightPress = true
  }
  if (value.key === 'ArrowLeft') {
    leftPress = true
  }
  if (value.keyCode === 32 && livesRestart) {
    livesRestart = false
    circle.x = moveMent + 50
    circle.y = 380
  }
  if (value.keyCode === 32 && !game) {
    game = true
    circle.x = moveMent + 50
    circle.y = 380
    score = 0
    lives = 3
    dy = -6
    moveMent = 250
    createBricks()
  }
}

function keyReleased(value) {
  if (value.key === 'ArrowRight') {
    rightPress = false
  }
  if (value.key === 'ArrowLeft') {
    leftPress = false
  }
}

function restartGame() {
  fill('#FFEEEE')
  textAlign(CENTER);
  noStroke()
  textStyle(BOLD);
  textFont('Arial');
  textSize(38)
  text('GAME OVER', 300, 170)
  textFont('Arial');
  textSize(28);
  text('Final score: ' + score, 300, 200);
  textSize(18);
  text('Press SpaceBar to restart game', 300, 225);
}

function lostLifeText() {
  fill('#FFEEEE')
  textAlign(CENTER);
  noStroke()
  textStyle(BOLD);
  textFont('Arial');
  textSize(36)
  text('Life Lost', 300, 170)
  textFont('Arial');
  textSize(24);
  text('You now have ' + lives + ' lives remaining', 300, 200);
  textSize(18);
  text('Press SpaceBar to restart', 300, 225);
}

function scoreText() {
  fill('#FFEEEE')
  textStyle(BOLD);
  textAlign(CENTER);
  noStroke()
  textFont('Arial');
  textSize(18);
  text('Score: ' + score, 555, 20);
}

function livesText() {
  textStyle(BOLD);
  textAlign(CENTER);
  noStroke()
  textFont('Arial');
  textSize(18);
  text('Lives: ' + lives, 40, 20);
}

function checkCollisionBottom(ball, brick) {
  if (ball.y - 20 < brick.y && ball.x > brick.x && ball.x <= brick.x + 58) {
    return true
  }
}

function draw() {
  clear()
  if (game && !livesRestart) ball()
  if (livesRestart && game) lostLifeText()
  if (!game && livesRestart) restartGame()
  if (game) {
    scoreText()
    livesText()
    drawBricks()
    paddle()
  }
}