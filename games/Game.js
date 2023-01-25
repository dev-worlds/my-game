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
        this.#bgImage.onload = () => {
            this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)
            const player = new Player(this.#context, { color: 'blue' });
            this.#players.push(player)
            this.draw()
        }
    }

    draw() {
        this.steps++;
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)

        // враги ходят
        if (this.steps % 120 === 0) {
            const enemy = new Enemy(this.#context, { color: 'red' })
            enemy.moveRandom();
            this.#enemies.push(enemy);
        }
        this.#enemies.filter(enemy => {
            if (!enemy.config.alive) return false;
            enemy.draw();
            return true;
        })

        // игрок ходит
        this.#players.forEach(player => {
            player.draw()
            if (this.steps % 5 === 0) {
                player.updateMove()
            }
            this.#enemies.forEach(enemy => {
                if ((player.config.x + player.config.width >= enemy.config.x && player.config.x <= enemy.config.x + enemy.config.width)
                    && player.config.y + player.config.height >= enemy.config.y && player.config.y <= enemy.config.y + enemy.config.height) {
                    enemy.config.health -= 100;
                    if (enemy.config.health <= 0) {
                        enemy.config.alive = false;
                    }
                }
            })
        })

        requestAnimationFrame(() => {
            this.draw();
        })
    }
}

export default Game;