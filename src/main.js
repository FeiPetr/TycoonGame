/*
I use text objects, image manipulation, sprite interaction, a timer, and groups
*/


let config = {
    type: Phaser.AUTO,
    width: 1230, //1230x1231
    height:1231,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Menu,Instruction,Play,Pause],
    physics: {
        default: 'arcade',
        arcade: {
            gravity:{y:0},
            debug: false
        }
    },

}

let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyP, keyR, keyLEFT, keyRIGHT,keySPACE;
