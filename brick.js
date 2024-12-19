export class Brick {
    constructor(x, y, width, height, status) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.status = status;
    }

    draw(ctx) {
        if (this.status > 0) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}