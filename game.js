import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { Level } from './level.js';
import { PowerUp } from './powerup.js';

export class Game {
    constructor(canvas, ctx) {
        try {
            this.canvas = canvas;
            this.ctx = ctx;
            this.paddle = new Paddle(this.canvas);
            this.balls = [new Ball(this.canvas, this.paddle)];
            this.level = new Level(this.canvas);
            this.powerUps = [];
        } catch (error) {
            console.error('Error in Game constructor:', error);
        }
    }

    start() {
        try {
            this.draw();
        } catch (error) {
            console.error('Error in Game.start:', error);
        }
    }

    draw() {
        try {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.paddle.draw(this.ctx);
            this.balls.forEach(ball => ball.draw(this.ctx));
            this.level.draw(this.ctx);
            this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));

            this.balls.forEach(ball => ball.update(this.level.bricks, this.balls, this));
            this.powerUps.forEach(powerUp => powerUp.update());

            this.checkPowerUpCollisions();

            requestAnimationFrame(() => this.draw());
        } catch (error) {
            console.error('Error in Game.draw:', error);
        }
    }

    checkPowerUpCollisions() {
        try {
            this.powerUps.forEach((powerUp, index) => {
                if (powerUp.checkCollision(this.paddle)) {
                    this.applyPowerUp(powerUp.type);
                    this.powerUps.splice(index, 1);
                }
            });
        } catch (error) {
            console.error('Error in Game.checkPowerUpCollisions:', error);
        }
    }

    applyPowerUp(type) {
        try {
            switch (type) {
                case '1':
                    this.balls.push(new Ball(this.canvas, this.paddle));
                    break;
                case '2':
                    this.paddle.expand();
                    break;
                case '3':
                    this.balls.forEach(ball => ball.activatePierce());
                    break;
            }
        } catch (error) {
            console.error('Error in Game.applyPowerUp:', error);
        }
    }

    spawnPowerUp(x, y) {
        try {
            const types = ['1', '2', '3'];
            const type = types[Math.floor(Math.random() * types.length)];
            console.log('Power-up type:', type);
            this.powerUps.push(new PowerUp(x, y, type, this.canvas));
        } catch (error) {
            console.error('Error in Game.spawnPowerUp:', error);
        }
    }
}