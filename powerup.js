export class PowerUp {
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.dy = 2;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#FF0000"; // Example color
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.dy;
    }

    checkCollision(paddle) {
        if (this.y + this.height > paddle.y && this.x > paddle.x && this.x < paddle.x + paddle.width) {
            return true;
        }
        return false;
    }
}