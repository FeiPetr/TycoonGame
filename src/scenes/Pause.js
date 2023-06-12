class Pause extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("pauseScene");
    }

    preload() {
        // load audio
        this.load.image('pausescreen', './assets/metromenu.png'); // pause and credits
        // replace all this but it's not high priority
    }

    create(){
        // this.add.text(20,20,"Rocket Patrol Menu");
         // menu text configuration
         this.pausescreen = new Image(this, game.config.width/2, game.config.width/2, 'pausescreen');
         this.add.image(0, 0, 'pausescreen').setOrigin(0);
    }    
    
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
          this.scene.start("playScene");
        }
      }


}