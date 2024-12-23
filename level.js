import { Brick } from './brick.js';

export class Level {
    constructor(canvas, level) {
        try {
            this.canvas = canvas;
            this.level = level;
            this.brickRowCount = level === 1 ? 2 : level === 2 ? 3 : 4;
            this.brickColumnCount = 8;
            this.brickHeight = 15;
            this.brickPadding = 10;
            this.brickOffsetTop = 40;
            this.brickOffsetLeft = 10;
            this.bricks = this.createBricks();
        } catch (error) {
            console.error('Error in Level constructor:', error);
        }
    }

    createBricks() {
        try {
            const bricks = [];
            const totalBrickWidth = this.canvas.width - (this.brickOffsetLeft * 2) - (this.brickPadding * (this.brickColumnCount - 1));
            const brickWidth = totalBrickWidth / this.brickColumnCount;

            for (let c = 0; c < this.brickColumnCount; c++) {
                bricks[c] = [];
                for (let r = 0; r < this.brickRowCount; r++) {
                    const brickX = (c * (brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                    const status = this.level === 1 ? 1 : this.level === 2 ? Math.floor(Math.random() * 3) + 1 : Math.floor(Math.random() * 5) + 1;
                    bricks[c][r] = new Brick(brickX, brickY, brickWidth, this.brickHeight, status);
                }
            }
            return bricks;
        } catch (error) {
            console.error('Error in Level.createBricks:', error);
        }
    }

    draw(ctx) {
        try {
            for (let c = 0; c < this.bricks.length; c++) {
                for (let r = 0; r < this.bricks[c].length; r++) {
                    this.bricks[c][r].draw(ctx);
                }
            }
        } catch (error) {
            console.error('Error in Level.draw:', error);
        }
    }
}