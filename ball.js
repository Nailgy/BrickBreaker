export class Ball {
    constructor(canvas, paddle) {
        this.canvas = canvas;
        this.paddle = paddle;
        this.radius = 5;
        this.x = canvas.width / 2;
        this.y = canvas.height - paddle.height - this.radius - 20;
        this.dx = 2;
        this.dy = -2;
        this.speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy); // Initial speed
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();
    }

    update(bricks) {
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
                document.location.reload();
            }
        }

        this.collisionDetection(bricks);
    }

    collisionDetection(bricks) {
        for (let c = 0; c < bricks.length; c++) {
            for (let r = 0; r < bricks[c].length; r++) {
                const b = bricks[c][r];
                if (b.status > 0) {
                    if (this.x + this.radius > b.x && this.x - this.radius < b.x + b.width && this.y + this.radius > b.y && this.y - this.radius < b.y + b.height) {
                        this.dy = -this.dy;
                        b.status--;
                    }
                }
            }
        }
    }
}