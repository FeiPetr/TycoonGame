class Menu extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('bgm', './assets/engine.wav');
        this.load.image('menuscreen', './assets/metromenu.png');
    }
      
    create(){
        // menu configuration
        this.newmenu = new Image(this, game.config.width/2, game.config.width/2, 'menuscreen');
        this.add.image(0, 0, 'menuscreen').setOrigin(0);
      
        this.backgroundMusic = this.sound.add('bgm',
        {
            volume: 0.3,
            loop: true
        });

        this.backgroundMusic.play();

        // define keys for pausing, etc
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
          this.scene.start("instructScene");
        }
      }
}
