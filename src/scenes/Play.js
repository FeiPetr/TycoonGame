/* KNOWN BUGS
- Lag as time goes on, potentially caused by the canvas text
- Pause menu can only be triggered once. This is an issue I have also seen in phaser's own pause/resume sample code, and with other students. 
I can only assume it's a phaser bug.

*/


class Play extends Phaser.Scene{ //creating js class 'menu' that extends phaser's predef scene object
    constructor() // The constructor (a special method for creating and initializing an object) uses
    {             // the "super" keyword to call the constructor of the super class
        super("playScene");
    }

    preload() {
      // load images/tile sprites
        this.load.image('map', './assets/metro_back.png'); // background
        this.load.image('tower', './assets/tower.PNG'); // tower
        this.load.image('enemy', './assets/worker.PNG'); // worker 
        // Note: sometimes will be referred to as enemy because of early game concept that got scrapped. Refactoring runs the risk of breaking code.
        this.load.image('explode', './assets/explode.png'); // explosion/rebellion overlay
      }
      
    create(){


        // place map sprite
        this.starfield = this.add.tileSprite(0, 0, 1280, 1281, 'map').setOrigin(0, 0); // background set
        this.workers = this.physics.add.group({ key: 'enemy', frame: 0, repeat: 90, setXY: { x: 100000, y: 100000,stepY: 40} }); // Set workers


        this.workerCost = 10; // initialize worker cost
        this.workerSell = 5; // initialize sell price of worker

        // Money text
        this.moneyText = this.add.text(650, 100, "Money: " + Math.floor(this.money), { fill: '#0f0' });
        this.money = 0;

        // Click tower to get money
        this.tower = this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height/2, 'tower');
        this.tower.setInteractive();
        this.tower.on('pointerdown', () => {this.money++});


        this.prodRate = 0;
        this.towerMultiplier = 1; // Tower multiplier
        this.multiplierNeeded = 5; // Workers needed to sacrifice for multiplier to take effect
        this.multiplierProgress = 0; // Current amount of multiplier needed
        this.multiplierText = this.add.text(800, 100, 'Tower Multiplier: ' + this.explosionLvl, { fill: '#FFFFFF' });
        this.prodRateText = this.add.text(800, 150, 'Production Rate: ' + this.prodRate + ' dollars per second', { fill: '#FFFFFF' });


        this.workersOnBoard = 0; // workers on screen

        // Buy and Sell Buttons, text
        this.buyButton = this.add.text(100, 100, 'Buy Worker for ' + this.workerCost,{ fill: '#0f0' });
        this.workerNumText = this.add.text(100, 150, '# Workers: ' + this.workersOnBoard, { fill: '#0f0' });
        this.sellButton = this.add.text(350, 100, 'Sacrifice Worker for ' + this.workerSell, {fill: '#ff001d' });
        this.buyButton.setInteractive();
        this.sellButton.setInteractive(); // make buttons interactive
        this.buyButton.on('pointerdown', () => this.spawnEnemy(this.workers,Phaser.Math.Between(40, 1200),Phaser.Math.Between(40, 1200))); // has to be in create or it keeps stacking
        this.sellButton.on('pointerdown', () => this.sellAction(this.workers)); // has to be in create or it keeps stacking

        this.explosionLvl = "Low";
        this.rebelLvl = "Low";

        this.dangerExplode = this.add.text(100, 1100, 'Explosion Danger Level: ' + this.explosionLvl, { fill: '#FFFFFF' });
        this.dangerRebel = this.add.text(500, 1100, 'Rebellion Danger Level: ' + this.rebelLvl, { fill: '#FFFFFF' });

        // Defining keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);


        // add clock
        this.clock = this.time.delayedCall(60000, this.onClockEvent, null, this); 

        // GAME OVER flag
        this.gameOver = false;

        // WIN flag
        this.win = false;
        this.workersSacrificed = 0; // Keeping track of workers sacrificed for win condition

        this.explosionImg = this.add.image(0, 0, 'explode').setOrigin(0);
        this.alpha = 0; // alpha gradually gets deeper as danger gets higher
        this.explosionImg.setAlpha(this.alpha);
        

     }

     update() {

      if (Phaser.Input.Keyboard.JustDown(keyP)) { // Pause menu
        this.scene.launch("pauseScene");
        this.scene.pause();
      }
        
        this.elapsed = parseInt(this.clock.getRemainingSeconds()); // how much time has passed.
        this.moneyText.text =  "Money: " + Math.floor(this.money);
        this.buyButton.text = "Buy Worker for " + this.workerCost;
        this.sellButton.text = "Sacrifice Worker for " + this.workerSell;
        this.workerNumText.text = '# Workers: ' + this.workersOnBoard;
        this.dangerExplode.text ='Explosion Danger Level: ' + this.explosionLvl;
        this.dangerRebel.text = 'Rebellion Danger Level: ' + this.rebelLvl;
        this.multiplierText.text = 'Tower Multiplier: ' + this.towerMultiplier;
        this.prodRateText.text = 'Production Rate: ' + this.prodRate + ' dollars per second';

        this.tower.x = this.sys.game.config.width / 2; // trying to get tower to appear on screeen
        this.tower.y = this.sys.game.config.height / 2;

        this.explosionImg.setAlpha(this.alpha);
        

        if(this.workersOnBoard <= 10) // Handling Explosion Levels
        {
          this.explosionLvl = "Low";
          if(this.rebelLvl != "High")
          {
            this.alpha = 0; // Resetting warning graphics
          }
          
        }
        else if (this.workersOnBoard <= 20)
        {
          this.explosionLvl = "Medium";
        }
        else
        {
          this.explosionLvl = "High";
          this.alpha += 0.001; //if danger is high, overlay red
        }

        if(this.elapsed > 45) // Handling rebellion levels
        {
          this.rebelLvl = "Low";
          if(this.explosionLvl != "High")
          {
            this.alpha = 0;
          }
        }
        else if (this.elapsed <= 45 && this.elapsed >= 20)
        {
          this.rebelLvl = "Medium";
        }
        else
        {
          this.rebelLvl = "High";
          this.alpha += 0.001;
        }


        if(this.workersOnBoard > 30 || this.elapsed <= 0) // Handling Game over
        {
          this.gameOver = true;
        }
        if(this.gameOver)
        {
          this.gameOverTxt = this.add.text(this.sys.game.config.width / 2 - 50, this.sys.game.config.height / 2, "Game Over", { fill: '#0f0' });
          this.gameOverTxt = this.add.text(this.sys.game.config.width / 2 - 50, this.sys.game.config.height / 2 + 50, "Press R to restart", { fill: '#FFFFFF' });

          this.money = 0;
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR) || this.win && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.scene.restart();

        }

        if(this.workersSacrificed == 20)
        {
          this.win = true;
        }

        if(this.win) // Handling win condition
        {
          this.gameOverTxt = this.add.text(this.sys.game.config.width / 2 - 50, this.sys.game.config.height / 2, "You Win !", { fill: '#0f0' });
          this.gameOverTxt = this.add.text(this.sys.game.config.width / 2 - 50, this.sys.game.config.height / 2 + 50, "Press R to restart", { fill: '#FFFFFF' });

          this.money = 0;

        }

        if(this.multiplierProgress >= this.multiplierNeeded) // Handling Tower multiplier
        {
          this.multiplierProgress = 0; // Reset progress
          this.towerMultiplier += 0.5; // Increase the tower multiplier
          this.multiplierNeeded += 5; // Up the next level needed
        }


        // for every member of the group
        this.onScreen = 0;
        for(var i = 0; i < this.workers.getLength();i++)
        {
          //console.log(this.workers.getChildren()[i].y);
          if(this.workers.getChildren()[i].y <= 1200 && this.workers.getChildren()[i].x <= 1200) // figure out how to stop using hardcoded magic numbers
          {
              this.money+=0.02 * this.towerMultiplier;
              //console.log(Math.floor(this.money));
              this.onScreen+=1;
          }
        }
        this.prodRate = this.towerMultiplier*this.onScreen; //calculating production rate
          // if the enemy is on the map
            // generate money every five seconds

      }


      // Spawns enemy group; Input the velocity
      spawnEnemy(group,x,y){

        for(var i = 0; i < this.workers.getLength();i++)
        {
          //OHHH SPAWN EBEMY IS DELETING THE THING FROM THE ARRAY
          //console.log(this.workers.getChildren()[i].y);
          this.clock.reset({
            delay: 60000                // ms
        })

          if(group.getChildren()[i].y >= 1200 && group.getChildren()[i].x >= 1200 && this.money >= this.workerCost) // figure out how to stop using hardcoded magic numbers dude
          {
            group.getChildren()[i].y = y;
            group.getChildren()[i].x = x;
            this.money-=this.workerCost;
            this.workersOnBoard += 1;
            this.workerCost+=10;
            this.workerSell+=5; //find a formula for these later maybe, i want it to scale
            break;
          }
        }


        //this.getEnemy = Phaser.Utils.Array.RemoveRandomElement(group.getChildren());
        //this.getEnemy.y = y;
        //console.log(this.getEnemy.y);
        //this.getEnemy.x = x;
      }

      sellAction(group)
      {
        if(this.workersOnBoard > 0){

        this.clock.reset({
          delay: 60000                // ms
      })
        
        for(var i = 0; i < this.workers.getLength();i++)
        {
          //OHHH SPAWN EBEMY IS DELETING THE THING FROM THE ARRAY
          //console.log(this.workers.getChildren()[i].y);
          if(group.getChildren()[i].y <= 1200 && group.getChildren()[i].x <= 1200 ) // figure out how to stop using hardcoded magic numbers
          { //&& this.workersOnBoard > 0
            group.getChildren()[i].y = 10000;
            group.getChildren()[i].x = 10000;
            break;
          }
        }
        
          this.multiplierProgress += 1; // Increase sacrifice for multiplier
          this.workersSacrificed += 1;
          this.money+= this.workerSell;
          this.workersOnBoard -= 1;
      }
        

      }


      
}