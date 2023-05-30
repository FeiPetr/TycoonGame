/*
Thesis Defense
Hours:

*/


let config = {
    type: Phaser.AUTO,
    width: 1230, //1230x1231
    height:1231,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Play,Menu],
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{y:0},
            debug: true
        }
    },

}
// create function in config

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
game.config.highScore = 0;
let keyF, keyR, keyLEFT, keyRIGHT;

//Track a high score that persists across scenes and display it in the UI (5)
//global variable
