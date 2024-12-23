import { PowerUp } from './powerup.js';

export class Ball {
    constructor(canvas, paddle, x, y, dx, dy) {
        try {
            this.canvas = canvas;
            this.paddle = paddle;
            this.radius = 5;
            this.x = x || canvas.width / 2;
            this.y = y || canvas.height - paddle.height - this.radius - 20;
            this.dx = dx || 2;
            this.dy = dy || -2;
            this.speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy); // Initial speed
            this.pierce = false;
        } catch (error) {
            console.error('Error in Ball constructor:', error);
        }
    }

    draw(ctx) {
        try {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.pierce ? "#FF0000" : "#FFFFFF"; // Red if pierce is active
            ctx.fill();
            ctx.closePath();
        } catch (error) {
            console.error('Error in Ball.draw:', error);
        }
    }

    update(bricks, balls, game) {
        try {
            this.x += this.dx;
            this.y += this.dy;

            // Normalize ball velocity to maintain constant speed
            const currentSpeed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            this.dx = (this.dx / currentSpeed) * this.speed;
            this.dy = (this.dy / currentSpeed) * this.speed;

            if (this.x + this.dx > this.canvas.width - this.radius || this.x + this.dx < this.radius) {
                this.dx = -this.dx;
            }
            if (this.y + this.dy < this.radius) {
                this.dy = -this.dy;
            } else if (this.y + this.dy > this.canvas.height - this.paddle.height - this.radius - 10) {
                if (this.x > this.paddle.x && this.x < this.paddle.x + this.paddle.width) {
                    // Calculate the relative position of the ball on the paddle
                    const relativeHitPosition = (this.x - this.paddle.x) / this.paddle.width;
                    // Adjust ballDX based on where the ball hits the paddle
                    this.dx = (relativeHitPosition - 0.5) * 4; // Adjust the multiplier as needed
                    this.dy = -this.dy;
                } else if (this.y + this.dy > this.canvas.height - this.radius) {
                    balls.splice(balls.indexOf(this), 1); // Remove ball from array
                    if (balls.length === 0) {
                        document.location.reload(); // End game if no balls left
                    }
                }
            }

            this.collisionDetection(bricks, game);
        } catch (error) {
            console.error('Error in Ball.update:', error);
        }
    }

    collisionDetection(bricks, game) {
        try {
            for (let c = 0; c < bricks.length; c++) {
                for (let r = 0; r < bricks[c].length; r++) {
                    const b = bricks[c][r];
                    if (b.status > 0) {
                        if (this.x + this.radius > b.x && this.x - this.radius < b.x + b.width && this.y + this.radius > b.y && this.y - this.radius < b.y + b.height) {
                            if (!this.pierce) {
                                this.dy = -this.dy;
                            }
                            b.status--;

                            // Check if the brick is destroyed
                            if (b.status === 0) {
                                // Chance to spawn a power-up
                                const dropChance = 0.3; // 20% chance
                                if (Math.random() < dropChance) {
                                    console.log('Spawning power-up at:', b.x + b.width / 2, b.y + b.height / 2);
                                    game.spawnPowerUp(b.x + b.width / 2, b.y + b.height / 2);
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error in Ball.collisionDetection:', error);
        }
    }

    activatePierce() {
        try {
            this.pierce = true;
            setTimeout(() => {
                this.pierce = false;
            }, 6000);
        } catch (error) {
            console.error('Error in Ball.activatePierce:', error);
        }
    }
}