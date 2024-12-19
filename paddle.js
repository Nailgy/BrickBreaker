export class Paddle {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 75;
        this.height = 10;
        this.x = (canvas.width - this.width) / 2;
        this.setupEventListeners();
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.canvas.height - this.height - 10, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    setupEventListeners() {
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
    }
}