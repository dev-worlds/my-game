import AbstractGenericClass from "./AbstractGenericClass.js";

class Organism extends AbstractGenericClass {
    constructor(context, config) {
        super(context, config)
        this.config = {
            ...this.config,
            alive: true,
            health: 100,
            ...config
        };
    }
}


export default Organism;