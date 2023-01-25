import Organism from "./Organism.js";

class Player extends Organism {
    constructor(context, config) {
        super(context, config);
        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'KeyA':
                    this.direction.left = 1;
                    this.direction.right = 0;
                    break;
                case 'KeyS':
                    this.direction.bottom = 1;
                    this.direction.top = 0;
                    break;
                case 'KeyD':
                    this.direction.right = 1;
                    this.direction.left = 0;
                    break;
                case 'KeyW':
                    this.direction.top = 1;
                    this.direction.bottom = 0;
                    break;
                default:
                    e.preventDefault()
            }
        })
        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'KeyA':
                    this.direction.left = 0;
                    break;
                case 'KeyS':
                    this.direction.bottom = 0;
                    break;
                case 'KeyD':
                    this.direction.right = 0;
                    break;
                case 'KeyW':
                    this.direction.top = 0;
                    break;
                default:
                    e.preventDefault()
            }
        })
    }
}

export default Player;