// script.js

// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 400;
canvas.height = 500;

// Paddle properties
const paddleWidth = 75;
const paddleHeight = 10;
const paddleX = (canvas.width - paddleWidth) / 2;

// Brick properties
const brickRowCount = 2;
const brickColumnCount = 8;

const brickHeight = 15;
const brickPadding = 10;
const brickOffsetTop = 40;
const brickOffsetLeft = 10;
// Adjust brick properties based on canvas width
const totalBrickWidth = canvas.width - (brickOffsetLeft * 2) - (brickPadding * (brickColumnCount - 1));
const brickWidth = totalBrickWidth / brickColumnCount;

// Create bricks array
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Draw bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
}

// Call draw function to render everything
draw();