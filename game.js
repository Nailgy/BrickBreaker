import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { Level } from './level.js';
import { PowerUp } from './powerup.js';

export class Game {
    constructor(canvas, ctx, level, updateScore, updateHighScore, showPowerUpProgress, showGameMessage) {
        try {
            this.canvas = canvas;
            this.ctx = ctx;
            this.paddle = new Paddle(this.canvas);
            this.balls = [new Ball(this.canvas, this.paddle)];
            this.level = new Level(this.canvas, level);
            this.powerUps = [];
            this.score = 0;
            this.updateScore = updateScore;
            this.updateHighScore = updateHighScore;
            this.showPowerUpProgress = showPowerUpProgress;
            this.showGameMessage = showGameMessage;
            this.isGameOver = false;
        } catch (error) {
            console.error('Error in Game constructor:', error);
        }
    }

    resetPowerUpBars() {
        const bars = document.querySelectorAll('.progress');
        bars.forEach(bar => {
            bar.style.transition = 'none';
            bar.style.width = '0%';
        });
        console.log('Power-up bars reset');
    }

    start() {
        try {
            this.draw();
        } catch (error) {
            console.error('Error in Game.start:', error);
        }
    }

    stop() {
        cancelAnimationFrame(this.animationFrameId);
        this.updateHighScore(this.score);
        this.isGameOver = true;
        this.resetPowerUpBars();
    }

    draw() {
        try {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.paddle.draw(this.ctx);
            this.balls.forEach(ball => ball.draw(this.ctx));
            this.level.draw(this.ctx);
            this.powerUps.forEach(powerUp => powerUp.draw(this.ctx)); 

            if (!this.isGameOver) {
                this.balls.forEach(ball => ball.update(this.level.bricks, this.balls, this));
                this.powerUps.forEach(powerUp => powerUp.update());
                this.checkPowerUpCollisions();

                if (this.level.isCleared()) {
                    
                    setTimeout(() => {
                        this.stop();
                        this.showGameMessage('Level cleared!');
                    }, 100); 
                    return;
                }

                this.animationFrameId = requestAnimationFrame(() => this.draw());
            }
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
                    this.showPowerUpProgress('expand', 15000);
                    break;
                case '3':
                    this.balls.forEach(ball => ball.activatePierce());
                    this.showPowerUpProgress('pierce', 6000);
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
            console.log('Spawning power-up at:', x, y);
            this.powerUps.push(new PowerUp(x, y, type, this.canvas));
        } catch (error) {
            console.error('Error in Game.spawnPowerUp:', error);
        }
    }

    increaseScore() {
        this.score += 52;
        this.updateScore(this.score);
    }
}