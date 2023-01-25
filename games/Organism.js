class Organism {

    left = 0;
    right = 0;
    bottom = 0;
    top = 0;
    #config = {
        alive: true,
        width: 20,
        height: 30,
        speed: 10,
        health: 100,
        damage: 100,
        color: 'red',
        x: 0,
        y: 0
    }

    constructor(context, config) {
        this.context = context;
        this.config = {
            ...this.#config,
            ...config
        };
    }

    draw() {
        this.context.beginPath();
        this.context.rect(this.config.x, this.config.y, this.config.width, this.config.height);
        this.context.closePath();
        this.context.strokeStyle = this.config.color;
        this.context.fillStyle = this.config.color;
        this.context.fill();
        this.context.stroke();
    }

    move([x, y]) {
        if (this.config.x + x < 0) {
            this.config.x = 0;
        } else if (this.config.x + x > (this.context.canvas.width - this.config.width)) {
            this.config.x = this.context.canvas.width - this.config.width;
        } else {
            this.config.x += x;
        }
        if (this.config.y + y < 0) {
            this.config.y = 0;
        } else if (this.config.y + y > (this.context.canvas.height - this.config.height)) {
            this.config.y = this.context.canvas.height - this.config.height;
        } else {
            this.config.y += y;
        }
    }

    moveRandom() {
        this.config.x = this.getRandomInt(this.context.canvas.width - this.config.width);
        this.config.y = this.getRandomInt(this.context.canvas.height - this.config.height);
    }

    updateMove() {
        this.move([(this.right - this.left) * this.config.speed, (this.bottom - this.top) * this.config.speed])
    }

    getRandomInt(max, min = 0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}


export default Organism;