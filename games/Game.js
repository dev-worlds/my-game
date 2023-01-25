import Player from "./Player.js";
import Enemy from "./Enemy.js"

class Game {
    #canvas = document.getElementById("canvas");
    #context = this.#canvas.getContext("2d");
    #bgImage = new Image();
    #players = []
    #enemies = []

    constructor(bgImage) {
        this.steps = 0;
        this.#bgImage.src = bgImage
        this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)
        const player = new Player(this.#context, { color: 'blue' });
        this.#players.push(player)
        this.draw()
    }

    draw() {
        this.steps++;
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)
        this.#players.forEach(player => {
            player.draw()
            if (this.steps % 5 === 0) {
                player.updateMove()
            }
        })
        if (this.steps % 120 === 0) {
            const enemy = new Enemy(this.#context, { color: 'red' })
            enemy.moveRandom();
            this.#enemies.push(enemy);
        }
        this.#enemies.forEach(enemy => {
            enemy.draw();
        })

        requestAnimationFrame(() => {
            this.draw();
        })
    }
}

export default Game;