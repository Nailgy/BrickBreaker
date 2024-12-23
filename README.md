# Bricks Breaker Game

## Overview
Bricks Breaker is a classic arcade game where the player controls a paddle to bounce a ball and break bricks. The game features multiple levels, power-ups, and a scoring system. The objective is to clear all the bricks on the screen without letting the ball fall off the bottom edge.

## Running the Project Locally
To run the project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd BricksBreaker
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Start the HTTP server:
    ```sh
    npm run start
    ```
5. Open your web browser and go to `http://localhost:8080` to play the game.

## How to play
1. Open the game in a web browser.
2. Select a level from the level selector.
3. Move the paddle using the mouse to bounce the ball and break bricks.
4. Collect power-ups to gain advantages.
5. Try to achieve the highest score by breaking all the bricks.
6. If the ball falls off the bottom edge, the game is over. Click the restart button to try again.

Enjoy playing Bricks Breaker!

## Game Mechanics

### Power-Ups
- Power-ups appear randomly (30% on block breaking) and fall from broken bricks.
- Types of power-ups include +1 ball, piercing ball and paddle extension. Piercing balls break any blocks immidiately
- Power-ups have a duration and are displayed with progress bars.

### Paddle
- The paddle is controlled by moving the mouse.
- The paddle's width can be expanded through power-ups.
- The paddle is positioned at the bottom of the canvas and follows the mouse cursor.

### Ball
- The ball bounces off the paddle, walls, and bricks.
- The ball's speed and direction change upon collision with bricks and the paddle.
- The ball can gain a piercing ability through power-ups, allowing it to pass through multiple bricks.

### Bricks
- Bricks are arranged in rows and columns at the top of the canvas.
- Each brick has a status indicating whether it is active or broken.
- Bricks are broken when hit by the ball (or damaged by 1, if they have capacity number displayed on them).

### Levels
- The game features multiple levels, each with an increasing number of brick rows.
- Players can select the level from the UI.
- The game starts at level 1 by default.



### Scoring
- Player earn points by breaking bricks.
- The score is displayed on the UI.
- The game tracks the high score, and a message is displayed when a new high score is reached.

### Game States
- The game can be paused and restarted.
- When the game is over or a level is finished, a message is displayed, and the canvas is dimmed.
- The restart button allows players to restart the game from the current level.

## Controls
- Mouse: Move the paddle left and right.

## UI Elements
- **Level Selector**: Buttons to select the game level.
- **Score Board**: Displays the current score and high score.
- **Power-Up Bars**: Shows the progress of active power-ups.
- **Game Messages**: Displays messages such as "Game Over!" and "Level Finished!".
- **Restart Button**: Allows players to restart the game.


## Enjoy!