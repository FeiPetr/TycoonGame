class Pause extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("pauseScene");
    }

    preload() {
        // load audio
        this.load.image('pausescreen', './assets/pausescreen.png'); // pause
    }

    create(){
         // menu text configuration
         this.pausescreen = new Image(this, game.config.width/2, game.config.width/2, 'pausescreen');
         this.add.image(0, 0, 'pausescreen').setOrigin(0);
         keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    }    
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) { // Press P to unpause
          this.scene.resume("playScene");
          this.scene.stop();
        }
      }


}