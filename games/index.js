import Game from "./Game.js";

const init = () => {
    const canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener('resize', init)

const startGame = () => {

    const newGame = new Game('assets/bgImage.png')
}


startGame();