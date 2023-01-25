import Organism from "./Organism.js";

class Player extends Organism {
    constructor(context, config) {
        super(context, config);
        window.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'KeyA':
                    this.left = 1;
                    this.right = 0;
                    break;
                case 'KeyS':
                    this.bottom = 1;
                    this.top = 0;
                    break;
                case 'KeyD':
                    this.right = 1;
                    this.left = 0;
                    break;
                case 'KeyW':
                    this.top = 1;
                    this.bottom = 0;
                    break;
                default:
                    e.preventDefault()
            }
        })
        window.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'KeyA':
                    this.left = 0;
                    break;
                case 'KeyS':
                    this.bottom = 0;
                    break;
                case 'KeyD':
                    this.right = 0;
                    break;
                case 'KeyW':
                    this.top = 0;
                    break;
                default:
                    e.preventDefault()
            }
        })
    }
}

export default Player;