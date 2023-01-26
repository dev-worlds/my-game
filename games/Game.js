import Player from "./Player.js";
import Projectile from "./Projectile.js";
import Enemy from "./Enemy.js";

class Game {
    #canvas = document.getElementById("canvas");
    #context = this.#canvas.getContext("2d");
    #bgImage = new Image();
    #players = new Set()
    #enemies = new Set()
    #projectile = new Set()
    #directions = ['left', 'right', 'top', 'bottom']
    // скорость игры
    #gameSpeed = 5
    // скорострельность
    #rateFire = 50
    #bulletSpeed = 10
    // появление мобов
    #respawnEnemy = 120


    constructor(bgImage) {
        this.steps = 0;
        this.#bgImage.src = bgImage
        this.#bgImage.onload = () => {
            this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)
            const player = new Player(this.#context, { color: 'blue', speed: 80 });
            this.#players.add(player)
            this.draw()
        }
    }

    draw() {
        this.steps++;
        this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#context.drawImage(this.#bgImage, 0, 0, this.#canvas.width, this.#canvas.height)

        // враги ходят
        if (this.steps % this.#respawnEnemy === 0) {
            const enemy = new Enemy(this.#context, { color: 'red', speed: 30 })
            enemy.createRandomLocation();
            enemy.moveRandom();
            this.#enemies.add(enemy);
        }
        this.#enemies.forEach(enemy => {
            enemy.draw();
            if (this.steps % this.#gameSpeed === 0) {
                enemy.updateMove();
            }
        })

        // игрок ходит
        this.#players.forEach(player => {
            player.draw()
            if (this.steps % this.#gameSpeed === 0) {
                player.updateMove()
            }
            // this.#enemies.forEach(enemy => {
            //     if (player.checkIntersection(enemy)) {
            //         enemy.config.health -= player.config.damage;
            //         if (enemy.config.health <= 0) {
            //             this.#enemies.delete(enemy);
            //         }
            //
            //     }
            // })
            // создаём новые выстрелы
            if (this.steps % this.#rateFire === 0) {
                const projectileConfig = {
                    color: 'black',
                    width: 5,
                    height: 5,
                    x: player.config.x + (player.config.width / 2),
                    y: player.config.y + (player.config.height / 2),
                    speed: 50
                };
                this.#directions.forEach(direction => {
                    const projectile = new Projectile(this.#context, projectileConfig, { [direction]: 1 });
                    this.#projectile.add(projectile);
                })
            }
        });

        // двигаем выстрелы
        this.#projectile.forEach(projectile => {
            projectile.draw();
            if (this.steps % this.#bulletSpeed === 0) {
                projectile.updateMove(true);
                if (projectile.config.remove) {
                    this.#projectile.delete(projectile);
                }
            }
            this.#enemies.forEach(enemy => {
                if (projectile.checkIntersection(enemy)) {
                    enemy.config.health -= projectile.config.damage;
                    projectile.config.remove = true;
                    if (enemy.config.health <= 0) {
                        this.#enemies.delete(enemy);
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