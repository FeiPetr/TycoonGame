class Instruction extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("instructScene");
    }

    preload() {
        this.load.image('instructions', './assets/instructions.png');
    }

    create(){
         // menu text configuration
         this.instructions = new Image(this, game.config.width/2, game.config.width/2, 'instructions');
         this.add.image(0, 0, 'instructions').setOrigin(0);
         keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }    
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) { // Press P to unpause
          this.scene.start("playScene");
        }
      }


}