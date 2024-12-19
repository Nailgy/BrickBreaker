import { Brick } from './brick.js';

export class Level {
    constructor(canvas) {
        this.canvas = canvas;
        this.brickRowCount = 2;
        this.brickColumnCount = 8;
        this.brickHeight = 15;
        this.brickPadding = 10;
        this.brickOffsetTop = 40;
        this.brickOffsetLeft = 10;
        this.bricks = this.createBricks();
    }

    createBricks() {
        const bricks = [];
        const totalBrickWidth = this.canvas.width - (this.brickOffsetLeft * 2) - (this.brickPadding * (this.brickColumnCount - 1));
        const brickWidth = totalBrickWidth / this.brickColumnCount;

        for (let c = 0; c < this.brickColumnCount; c++) {
            bricks[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                const brickX = (c * (brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                bricks[c][r] = new Brick(brickX, brickY, brickWidth, this.brickHeight, 1);
            }
        }
        return bricks;
    }

    draw(ctx) {
        for (let c = 0; c < this.bricks.length; c++) {
            for (let r = 0; r < this.bricks[c].length; r++) {
                this.bricks[c][r].draw(ctx);
            }
        }
    }
}