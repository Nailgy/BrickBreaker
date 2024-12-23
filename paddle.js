export class Paddle {
    constructor(canvas) {
        try {
            this.canvas = canvas;
            this.width = 75;
            this.height = 10;
            this.x = (canvas.width - this.width) / 2;
            this.originalWidth = this.width;
            this.setupEventListeners();
        } catch (error) {
            console.error('Error in Paddle constructor:', error);
        }
    }

    draw(ctx) {
        try {
            ctx.beginPath();
            ctx.rect(this.x, this.canvas.height - this.height - 10, this.width, this.height);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        } catch (error) {
            console.error('Error in Paddle.draw:', error);
        }
    }

    setupEventListeners() {
        try {
            document.addEventListener("mousemove", (event) => {
                const relativeX = event.clientX - this.canvas.offsetLeft;
                if (relativeX > 0 && relativeX < this.canvas.width) {
                    this.x = relativeX - this.width / 2;
                }
                if (this.x < 0) {
                    this.x = 0;
                } else if (this.x + this.width > this.canvas.width) {
                    this.x = this.canvas.width - this.width;
                }
            });

            this.canvas.addEventListener("touchstart", (event) => {
                const touch = event.touches[0];
                const relativeX = touch.clientX - this.canvas.offsetLeft;
                if (relativeX > 0 && relativeX < this.canvas.width) {
                    this.x = relativeX - this.width / 2;
                }
                if (this.x < 0) {
                    this.x = 0;
                } else if (this.x + this.width > this.canvas.width) {
                    this.x = this.canvas.width - this.width;
                }
            }, false);

            this.canvas.addEventListener("touchmove", (event) => {
                const touch = event.touches[0];
                const relativeX = touch.clientX - this.canvas.offsetLeft;
                if (relativeX > 0 && relativeX < this.canvas.width) {
                    this.x = relativeX - this.width / 2;
                }
                if (this.x < 0) {
                    this.x = 0;
                } else if (this.x + this.width > this.canvas.width) {
                    this.x = this.canvas.width - this.width;
                }
                event.preventDefault();
            }, false);
        } catch (error) {
            console.error('Error in Paddle.setupEventListeners:', error);
        }
    }

    expand() {
        try {
            this.width = this.originalWidth * 1.5;
            setTimeout(() => {
                this.width = this.originalWidth;
            }, 15000);
        } catch (error) {
            console.error('Error in Paddle.expand:', error);
        }
    }
}