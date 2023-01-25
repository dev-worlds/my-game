import Player from "./Player.js";
import Enemy from "./Enemy.js"

class Game {
    #canvas = document.getElementById("canvas");
    #context = this.#canvas.getContext("2d");
    #bgImage = new Image();
    #players = new Set()
    #enemies = new Set()

    constructor(bgImage) {
        this.steps = 0;
        this.#bgImage.src = bgImage
        this.#bgImage.onload = () => {
            this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)
            const player = new Player(this.#context, { color: 'blue' });
            this.#players.add(player)
            this.draw()
        }
    }

    checkIntersection({ config: config1 }, { config: config2 }) {
        return config1.x + config1.width >= config2.x && config1.x <= config2.x + config2.width
            && config1.y + config1.height >= config2.y && config1.y <= config2.y + config2.height;

    }

    draw() {
        this.steps++;
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)

        // враги ходят
        if (this.steps % 120 === 0) {
            const enemy = new Enemy(this.#context, { color: 'red' })
            enemy.moveRandom();
            this.#enemies.add(enemy);
        }
        this.#enemies.forEach(enemy => {
            enemy.draw();
        })


        // игрок ходит
        this.#players.forEach(player => {
            player.draw()
            if (this.steps % 5 === 0) {
                player.updateMove()
            }
            this.#enemies.forEach(enemy => {
                if (this.checkIntersection(player, enemy)) {
                    enemy.config.health -= player.config.damage;
                    if (enemy.config.health <= 0) {
                        this.#enemies.delete(enemy);
                    }

                }
            })
        });

        requestAnimationFrame(() => {
            this.draw();
        })
    }
}

export default Game;