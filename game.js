import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { Level } from './level.js';

export class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.paddle = new Paddle(this.canvas);
        this.ball = new Ball(this.canvas, this.paddle);
        this.level = new Level(this.canvas);
    }

    start() {
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.level.draw(this.ctx);
        this.ball.update(this.level.bricks);
        requestAnimationFrame(() => this.draw());
    }
}