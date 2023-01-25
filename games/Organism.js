class Organism {
    #width = 20;
    #height = 30;
    #speed = 10;
    #color = 'red';
    #x = 0;
    #y = 0;

    constructor(context, config) {
        this.context = context;
        this.config = {
            width: this.#width,
            height: this.#height,
            speed: this.#speed,
            color: this.#color,
            x: this.#x,
            y: this.#y,
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
        } else if (this.config.x + x > (this.context.canvas.width - this.#width)) {
            this.config.x = this.context.canvas.width - this.#width;
        } else {
            this.config.x += x;
        }
        if (this.config.y + y < 0) {
            this.config.y = 0;
        } else if (this.config.y + y > (this.context.canvas.height - this.#height)) {
            this.config.y = this.context.canvas.height - this.#height;
        } else {
            this.config.y += y;
        }
    }

    moveRandom() {
        this.config.x = this.getRandomInt(this.context.canvas.width - this.#width);
        this.config.y = this.getRandomInt(this.context.canvas.height - this.#height);
    }


    getRandomInt(max, min = 0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }
}


export default Organism;