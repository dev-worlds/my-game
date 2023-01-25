class AbstractGenericClass {
    #config = {
        width: 20,
        height: 20,
        speed: 100,
        color: 'red',
        damage: 100,
        remove: false,
        x: 0,
        y: 0
    }
    #direction = {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    }

    constructor(context, config, direction = {}) {
        this.context = context;
        this.config = {
            ...this.#config,
            ...config
        };
        this.direction = {
            ...this.#direction,
            ...direction
        }
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

    move([x, y], removeWhenReachingEdge = false) {
        let reachedEdgeMap = false;
        if (this.config.x + x < 0) {
            this.config.x = 0;
            reachedEdgeMap = true;
        } else if (this.config.x + x > (this.context.canvas.width - this.config.width)) {
            this.config.x = this.context.canvas.width - this.config.width;
            reachedEdgeMap = true;
        } else {
            this.config.x += x;
        }
        if (this.config.y + y < 0) {
            this.config.y = 0;
            reachedEdgeMap = true;
        } else if (this.config.y + y > (this.context.canvas.height - this.config.height)) {
            this.config.y = this.context.canvas.height - this.config.height;
            reachedEdgeMap = true;
        } else {
            this.config.y += y;
        }
        if (reachedEdgeMap && removeWhenReachingEdge) {
            this.config.remove = true;
        }
    }

    createRandomLocation() {
        this.config.x = this.getRandomInt(this.context.canvas.width - this.config.width);
        this.config.y = this.getRandomInt(this.context.canvas.height - this.config.height);
    }

    moveRandom(max = 2, min = -1) {
        this.direction.right = this.getRandomInt(max, min);
        this.direction.left = this.getRandomInt(max, min);
        this.direction.bottom = this.getRandomInt(max, min);
        this.direction.top = this.getRandomInt(max, min);
    }

    updateMove(removeWhenReachingEdge = false) {
        this.move([(this.direction.right - this.direction.left) * this.config.speed / 10, (this.direction.bottom - this.direction.top) * this.config.speed / 10], removeWhenReachingEdge)
    }

    checkIntersection({ config }) {
        return this.config.x + this.config.width >= config.x && this.config.x <= config.x + config.width
            && this.config.y + this.config.height >= config.y && this.config.y <= config.y + config.height;

    }

    getRandomInt(max, min = 0) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min
    }
}

export default AbstractGenericClass