import { Game } from './game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 500;

let game;

window.selectLevel = function(level) {
    if (game) {
        game.stop();
    }
    game = new Game(canvas, ctx, level);
    game.start();
};

// Start with level 1 by default
selectLevel(1);