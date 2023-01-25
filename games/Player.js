import Organism from "./Organism.js";

class Player extends Organism {
    #left = false;
    #right = false;
    #bottom = false;
    #top = false;

    constructor(context, config) {
        super(context, config);
        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'KeyA':
                    this.#left = true;
                    break;
                case 'KeyS':
                    this.#bottom = true;
                    break;
                case 'KeyD':
                    this.#right = true;
                    break;
                case 'KeyW':
                    this.#top = true;
                    break;
                default:
                    e.preventDefault()
            }
        })
        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'KeyA':
                    this.#left = false;
                    break;
                case 'KeyS':
                    this.#bottom = false;
                    break;
                case 'KeyD':
                    this.#right = false;
                    break;
                case 'KeyW':
                    this.#top = false;
                    break;
                default:
                    e.preventDefault()
            }
        })
    }

    updateMove() {
        this.move([(this.#right - this.#left) * this.config.speed, (this.#bottom - this.#top) * this.config.speed])
    }

}

export default Player;