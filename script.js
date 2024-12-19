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
let paddleX = (canvas.width - paddleWidth) / 2;

// Ball properties
const ballRadius = 5; // Reduced to one-third of the original size
let ballX = canvas.width / 2;
let ballY = canvas.height - paddleHeight - ballRadius - 20; // Adjusted to spawn above the paddle
let ballDX = 2;
let ballDY = -2; // Ensure the ball moves upwards initially
const ballSpeed = Math.sqrt(ballDX * ballDX + ballDY * ballDY); // Calculate initial speed

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

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF"; // White color
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

// Collision detection
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                if (ballX + ballRadius > b.x && ballX - ballRadius < b.x + brickWidth && ballY + ballRadius > b.y && ballY - ballRadius < b.y + brickHeight) {
                    ballDY = -ballDY;
                    b.status = 0;
                }
            }
        }
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawPaddle();
    drawBall();
    collisionDetection();

    // Ball movement
    ballX += ballDX;
    ballY += ballDY;

    // Normalize ball velocity to maintain constant speed
    const currentSpeed = Math.sqrt(ballDX * ballDX + ballDY * ballDY);
    ballDX = (ballDX / currentSpeed) * ballSpeed;
    ballDY = (ballDY / currentSpeed) * ballSpeed;

    // Ball collision with walls
    if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > canvas.height - paddleHeight - ballRadius - 10) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            // Calculate the relative position of the ball on the paddle
            const relativeHitPosition = (ballX - paddleX) / paddleWidth;
            // Adjust ballDX based on where the ball hits the paddle
            ballDX = (relativeHitPosition - 0.5) * 4; // Adjust the multiplier as needed
            ballDY = -ballDY;
        } else if (ballY + ballDY > canvas.height - ballRadius) {
            document.location.reload();
        }
    }

    requestAnimationFrame(draw);
}

// Event listener for paddle movement with mouse
document.addEventListener("mousemove", function(event) {
    const relativeX = event.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
    // Prevent paddle from going out of bounds
    if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
});

// Event listeners for paddle movement with touch
canvas.addEventListener("touchstart", function(event) {
    const touch = event.touches[0];
    const relativeX = touch.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
    // Prevent paddle from going out of bounds
    if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
}, false);

canvas.addEventListener("touchmove", function(event) {
    const touch = event.touches[0];
    const relativeX = touch.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
    // Prevent paddle from going out of bounds
    if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
    event.preventDefault();
}, false);

// Call draw function to render everything
draw();