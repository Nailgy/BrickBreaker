import { Game } from './game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 500;

let game;
let highScore = 0;

window.selectLevel = function(level) {
    if (game) {
        game.stop();
    }
    resetPowerUpBars();
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('gameContainer').classList.remove('dimmed');
    game = new Game(canvas, ctx, level, updateScore, updateHighScore, showPowerUpProgress, showGameMessage);
    game.start();
};

window.restartGame = function() {
    document.getElementById('restartButton').style.display = 'none';
    document.getElementById('gameMessages').innerText = '';
    document.getElementById('gameContainer').classList.remove('dimmed');
    resetPowerUpBars();
    selectLevel(game.level.level);
};

function updateScore(score) {
    document.getElementById('score').innerText = score;
}

function updateHighScore(score) {
    if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').innerText = highScore;
        document.getElementById('newHighScoreMessage').innerText = 'New High Score!';
    } else {
        document.getElementById('newHighScoreMessage').innerText = '';
    }
}

function showPowerUpProgress(type, duration) {
    const bar = document.getElementById(type === 'pierce' ? 'pierceBar' : 'expandBar').querySelector('.progress');
    bar.style.transition = 'none';
    bar.style.width = '100%';
    setTimeout(() => {
        bar.style.transition = `width ${duration}ms linear`;
        bar.style.width = '0%';
    }, 50);
}

function resetPowerUpBars() {
    const bars = document.querySelectorAll('.progress');
    bars.forEach(bar => {
        bar.style.transition = 'none';
        bar.style.width = '0%';
    });
}

function showGameMessage(message) {
    const gameMessages = document.getElementById('gameMessages');
    gameMessages.innerText = message;
    document.getElementById('restartButton').style.display = 'block';
    document.getElementById('gameContainer').classList.add('dimmed');
}

selectLevel(1);