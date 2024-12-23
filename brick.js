export class Brick {
    constructor(x, y, width, height, status) {
        try {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.status = status;
        } catch (error) {
            console.error('Error in Brick constructor:', error);
        }
    }

    draw(ctx) {
        try {
            if (this.status > 0) {
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
                if (this.status > 1) {
                    ctx.fillStyle = "#FFFFFF";
                    ctx.font = "12px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText(this.status, this.x + this.width / 2, this.y + this.height / 2);
                }
            }
        } catch (error) {
            console.error('Error in Brick.draw:', error);
        }
    }
}