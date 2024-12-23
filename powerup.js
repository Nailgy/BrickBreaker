export class PowerUp {
    constructor(x, y, type, canvas) {
        try {
            this.x = x;
            this.y = y;
            this.radius = 10;
            this.type = type;
            this.dy = 2;
            this.active = true;
            this.image = new Image();
            this.image.src = `./img/${type}.jpg`;
            this.canvas = canvas;
        } catch (error) {
            console.error('Error in PowerUp constructor:', error);
        }
    }

    draw(ctx) {
        try {
            if (this.active) {
                console.log('Drawing power-up');
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
                ctx.restore();
            }
        } catch (error) {
            console.error('Error in PowerUp.draw:', error);
        }
    }

    update() {
        try {
            this.y += this.dy;
        } catch (error) {
            console.error('Error in PowerUp.update:', error);
        }
    }

    checkCollision(paddle) {
        try {
            const paddleTop = this.canvas.height - paddle.height - 10;
            if (this.y + this.radius > paddleTop && this.x > paddle.x && this.x < paddle.x + paddle.width) {
                this.active = false;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error in PowerUp.checkCollision:', error);
            return false;
        }
    }
}