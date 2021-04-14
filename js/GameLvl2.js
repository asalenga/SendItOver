"use strict";

// NOTE: As of 2/23/21 (and since CS 325), this is currently Phaser 2, not Phaser 3!!!

// class NewGame {

//     constructor(p1, p2) {
//         this._p1 = p1;
//         this._p2 = p2;
//     }

// }


// Create Game class that extends Phaser.State

// class GameState extends Phaser.State {
//     init() {

//     }

//     // start(stateName) {
//     //     super(stateName);
//     // }

//     create() {

//     }

//     update() {

//     }

// }

// Override the game.state.start method

var GameLvl2 = {};
GameLvl2.playerMap = {};
GameLvl2.enemyMap = {};

this.player1_Lvl2 = null;

this.playerXPos_Lvl2 = null;
this.playerYPos_Lvl2 = null;
this.playerSide_Lvl2 = null;
this.playerID_Lvl2 = null;

this.player2XPos_Lvl2 = null;
this.player2YPos_Lvl2 = null;
this.player2Side_Lvl2 = null;
this.player2ID_Lvl2 = null;

this.hintsText_Lvl2 = null;
this.otherPlayerHintsText_Lvl2 = null;
this.hintsTimer_Lvl2 = null;
this.otherPlayerHintsTimer_Lvl2 = null;

this.rayGuns_Lvl2 = null;

this.p1Red_pieces_Lvl2 = null;
this.p1Yellow_pieces_Lvl2 = null;
this.p1Green_pieces_Lvl2 = null;
this.p1Blue_pieces_Lvl2 = null;
this.p2Red_pieces_Lvl2 = null;
this.p2Yellow_pieces_Lvl2 = null;
this.p2Green_pieces_Lvl2 = null;
this.p2Blue_pieces_Lvl2 = null;

this.enemies_Lvl2 = null;

BasicGame.GameLvl2 = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    // this.stage.disableVisibilityChange = true;
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.planetSurfaceData = null;
    this.planetSurfaceSprite = null;
    
    this.wall = null;
    this.wall2 = null;
    this.leftWall = null;
    this.rightWall = null;

    this.redGate = null;
    this.yellowGate = null;
    this.greenGate = null;
    this.blueGate = null;
    // this.player1_Lvl2 = null;
    // this.player2 = null;

    // this.enemies_Lvl2 = null;
    this.p1Possess = null; // Check if Player 1 has possession of something
    this.p1currItem = null; // Check what item Player 1 is in possession of

    this.isCurrItemOverlapping = null;
    this.itemThrowIsInitiated = null;

    // this.p2Possess = null; // Check if Player 2 has possession of something
    // this.p2currItem = null; // Check what item Player 2 is in possession of
//    this.itemInitVelocity = null; // The initial velocity of an item when thrown by a player
    // this.slowDownValue1 = null; // The decrement value of the velocity over time (how quickly it slows down) for Player 1's current item
    // this.slowDownValue2 = null; // The decrement value of the velocity over time (how quickly it slows down) for Player 2's current item
    // this.done = null;
    // this.p2currItemTemp = null;
    this.throwTimer1 = null;
    this.throwTimer2 = null;
    this.p1prevItem = null;
    // this.p2prevItem = null;
    // this.bulletTime1 = null;
    // this.bulletTime2 = null;
    this.redBulletTime = null;
    this.yellowBulletTime = null;
    this.greenBulletTime = null;
    this.blueBulletTime = null;

    this.enemySpawnCooldown = null;

    this.gameClock = null;
    this.playersWin = null; // Check if the players have won or lost

    this.tutorialModeTitle = null;
    this.TutorialInstructions = null;
    this.TutorialInstructions2 = null;
    // this.hintsText_Lvl2 = null;
    this.hintsText_Lvl22 = null;

    this.chatButton = null;

    this.mousePointer = null;
    this.mouseText = null;

    // Track the distance to the mouse pointer, including in both x and y directions
    this.xDistToMousePointer = null;
    this.yDistToMousePointer = null;
    this.distToMousePointer = null;
    // Normalized vectors going from player to mouse pointer
    this.xDistToMousePointer_norm = null;
    this.yDistToMousePointer_norm = null;
    // The item x and y offset values in relation to the player 
    this.itemXPos = null;
    this.itemYPos = null;
    // The bullet x and y offset values in relation to the player 
    this.bulletXPos = null;
    this.bulletYPos = null;
    // The x and y velocity values for the bullet
    this.bulletXVel = null;
    this.bulletYVel = null;

    this.baseVelocityVal = 200;
};

/*
class ShipPiece {
    // var player;
    // var color;
    // preload() {
    //     this.load.image( 'BlueP1', 'assets/BlueP1.png' );
    // }
    constructor (p, c, img) {
        this.player = p;
        this.color = c;
        this.add.sprite( 100, 100, img );
    }
}
*/

BasicGame.GameLvl2.prototype = {

    // class Tile extends Phaser.GameObjects.Sprite {
    //   constructor(scene, x, y, key) {
    //     super(scene, x, y, key);
    //     this.scene = scene;
    //     this.scene.add.existing(this);
    //     this.setOrigin(0);
    //   }
    // };

    // init: function () {

    //     //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
    //     this.game.stage.disableVisibilityChange = true;

    // },

    init: function(data) {
        this.playerID_Lvl2 = data['id'];
        this.playerSide_Lvl2 = data['playerSide'];
        this.player2ID_Lvl2 = data['player2ID'];
    },

    create: function () {

        // The tutorial at https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/
        // says that "Game.playerMap = {}" is an "empty object [that] will be useful later on to keep track of players"
        // Game.hintsMap = {};


        // NOTE: noise and perlin stuff is usable here only if the necessary files are loaded;
        // If you check index.html, you'll see the js/noisejs/perlin.js script loaded right before Game.js (which is this file).
        // That script includes all the values, variables, and functions necessary for the calculations below.

/*
        var slimeBitmap = this.game.make.bitmapData(1200,600);
        slimeBitmap.draw('moonSurface', 0, 0);
        slimeBitmap.update();
        slimeBitmap.addToWorld();
        var moonBitmap = this.game.make.bitmapData(1200,600);
        moonBitmap.draw('moonSurface', 0, 0);
        moonBitmap.update();
        moonBitmap.addToWorld();

        var color1 = slimeBitmap.getPixelRGB(100, 70);
        var color2 = moonBitmap.getPixelRGB(100, 70);
*/
/*        var canvas = document.createElement('canvas');
        canvas.width = this.game.world.width;
        canvas.height = this.game.world.height;
        var bitmap;

        var ctx = canvas.getContext('2d');

        var image = ctx.createImageData(canvas.width, canvas.height);
        this.planetSurfaceData = image.data;

        for (var x = 0; x < canvas.width; x++) {
          //if (x % 100 == 0) {
          //  noise.seed(Math.random());
          //}
          for (var y = 0; y < canvas.height; y++) {
            var value = Math.abs(noise.perlin2(x / 100, y / 100));
            value *= 256;

            var cell = (x + y * canvas.width) * 4;

            // var currSlimePixel = slimeBitmap.getPixelRGB(x,y);
            // var currMoonPixel = moonBitmap.getPixelRGB(x,y);

            // var blendVal = ((value/256.0) * currMoonPixel) + ((1 - value/256.0) * currSlimePixel);

            this.planetSurfaceData[cell] = this.planetSurfaceData[cell + 1] = this.planetSurfaceData[cell + 2] = value;
            this.planetSurfaceData[cell + 1] += Math.max(0, (25 - value) * 8);
            this.planetSurfaceData[cell + 3] = 255; // alpha.
          }
        }

        ctx.fillColor = 'black';
        ctx.fillRect(0, 0, 100, 100);
        ctx.putImageData(image, 0, 0);


        // make a bitmap, and draw the canvas to its canvas
        bitmap = new Phaser.BitmapData(game, '', canvas.width, canvas.height);
        bitmap.context.drawImage(canvas, 0, 0);

        // use that bitmap as the texture for the sprite
        this.planetSurfaceSprite = this.game.add.sprite(0, 0, bitmap);
        this.planetSurfaceSprite.name = 'bx';
        this.planetSurfaceSprite.x = this.game.world.centerX - this.planetSurfaceSprite.width / 2;
        this.planetSurfaceSprite.y = this.game.world.centerY - this.planetSurfaceSprite.height / 2;
*/

// Create the central walls

        // Create a sprite using the 'wall' image.
        this.wall = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/10)*0, 'wall' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.wall.anchor.setTo( 0.5, 0.5 );

        this.wall.width = 50;
        this.wall.height = this.game.world.height/10;

        // Create a sprite using the 'wall' image.
        this.wall2 = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/10)*10, 'wall' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.wall2.anchor.setTo( 0.5, 0.5 );

        this.wall2.width = 50;
        this.wall2.height = this.game.world.height/10;

// Left-side wall

        // Create a sprite using the 'wall' image.
        this.leftWall = this.game.add.sprite( 300, 300, 'wall' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.leftWall.anchor.setTo( 0.5, 0.5 );

        this.leftWall.width = 50;
        this.leftWall.height = this.game.world.height/4;

// Right-side wall

        // Create a sprite using the 'wall' image.
        this.rightWall = this.game.add.sprite( 900, 300, 'wall' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.rightWall.anchor.setTo( 0.5, 0.5 );

        this.rightWall.width = 50;
        this.rightWall.height = this.game.world.height/4;

    // Create the gates

        this.redGate = this.game.add.sprite( this.game.world.centerX, this.game.world.height/5, 'RedGate');
        this.redGate.anchor.setTo(0.5,0.5);
        this.redGate.width = this.wall.width+8;
        this.redGate.height = this.game.world.height/5;

        this.yellowGate = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/5)*2, 'YellowGate');
        this.yellowGate.anchor.setTo(0.5,0.5);
        this.yellowGate.width = this.wall.width+8;
        this.yellowGate.height = this.game.world.height/5;

        this.greenGate = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/5)*3, 'GreenGate');
        this.greenGate.anchor.setTo(0.5,0.5);
        this.greenGate.width = this.wall.width+8;
        this.greenGate.height = this.game.world.height/5;

        this.blueGate = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/5)*4, 'BlueGate');
        this.blueGate.anchor.setTo(0.5,0.5);
        this.blueGate.width = this.wall.width+8;
        this.blueGate.height = this.game.world.height/5;


        this.p1Ship = this.game.add.sprite( 35, this.game.world.height/2, 'P1Ship');
        this.p1Ship.anchor.setTo(0.5,0.5);
        this.p1Ship.width = 70;
        this.p1Ship.height = 70;
        this.p1Ship.player = "p1";

        this.p2Ship = this.game.add.sprite( this.game.world.width-35, this.game.world.height/2, 'P2Ship');
        this.p2Ship.anchor.setTo(0.5,0.5);
        this.p2Ship.width = 70;
        this.p2Ship.height = 70;
        this.p2Ship.player = "p2";

        this.game.physics.enable( [this.p1Ship,this.p2Ship], Phaser.Physics.ARCADE );
        this.p1Ship.body.immovable = true;
        this.p2Ship.body.immovable = true;


        // this.player1_Lvl2 = this.game.add.sprite( (this.game.world.width/4), this.game.world.centerY, 'player1' );
        // this.player1_Lvl2.anchor.setTo( 0.5, 0.5 );
        // this.player1_Lvl2.width = 75;
        // this.player1_Lvl2.height = 75;

        // this.player1_Lvl2.spawnBeginning = 0;
        // this.player2 = this.game.add.sprite( (this.game.world.width/4)*3, this.game.world.centerY, 'player2' );
        // this.player2.anchor.setTo( 0.5, 0.5 );
        // this.player2.width = 75;
        // this.player2.height = 75;
        // this.player2.spawnBeginning = 0;

        this.game.physics.enable( [/*this.player1_Lvl2,*//*this.player2,*/this.wall,this.wall2,this.leftWall,this.rightWall], Phaser.Physics.ARCADE );
        
        // this.player1_Lvl2.body.isCircle = true;
    //  this.player1_Lvl2.body.setCircle(this.player1_Lvl2.width/2.0); // Note: the argument is for the radius size of the circle, not the diameter

        // this.game.debug.renderPhysicsBody(this.player1_Lvl2.body);
        // this.player1_Lvl2.setDebug(true, true, 255);
        // this.player1_Lvl2.debugShowBody = true;
        // this.player1_Lvl2.body.drawDebug(this.game.world);

        // this.player1_Lvl2.body.setSize(55, 55, 10, 10);
        // this.player2.body.setSize(55, 55, 10, 10);
        //this.game.physics.enable( this.player2, Phaser.Physics.ARCADE );
        //this.game.physics.enable( this.wall, Phaser.Physics.ARCADE );
        this.wall.body.collideWorldBounds = true;
        this.wall.body.immovable = true;
        this.wall2.body.collideWorldBounds = true;
        this.wall2.body.immovable = true;

        this.leftWall.body.immovable = true;
        this.rightWall.body.immovable = true;

        this.game.physics.enable( [this.redGate,this.yellowGate,this.greenGate,this.blueGate], Phaser.Physics.ARCADE );
        this.redGate.body.immovable = true;
        this.yellowGate.body.immovable = true;
        this.greenGate.body.immovable = true;
        this.blueGate.body.immovable = true;
        
    //    this.p1Blue = new ShipPiece("p1", "blue", 'BlueP1');

        // this.redBullet = this.game.add.sprite( -50, -50, 'RedBullet' );
        // this.redBullet.anchor.setTo(0.5,0.5);
     //    this.redBullet.width = 10;
     //     this.redBullet.height = 10;
     // //      this.redBullet.enableBody = true;
        // // this.redBullet.physicsBodyType = Phaser.Physics.ARCADE;
        // this.game.physics.enable( this.redBullet, Phaser.Physics.ARCADE );
        // this.redBullet.body.velocity.x = 0;

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
        var subtitleTextStyle = { font: "18px Verdana", fill: "#FFFFFF", align: "center" };
        // var text = this.game.add.text( this.game.world.centerX, 15, "Get your ship up and running!", style );
        // text.anchor.setTo( 0.5, 0.0 );

        this.gameClock = this.game.add.text( 50, 15, 'Elapsed seconds: '+this.game.time.totalElapsedSeconds(), style );
        // this.gameClock.anchor.setTo( 0.0, 0.0 );

        this.timeSoFar = this.game.time.totalElapsedSeconds();

        var bigTextStyle = { font: "30px Verdana", fill: "#FFFFFF", align: "center" };
        this.levelTitle = this.game.add.text( this.game.world.width/2.0, this.game.world.height/2.0, 'Level 2', bigTextStyle);
        this.levelTitle.anchor.setTo(0.5,0.5);
        this.levelTitle.alpha = 1;

        // Clear the text after some time. Note: I defined the callback function right here. Of course
        // I could simply define a separate function entirely and call that, but this works too
        this.levelTitleTimer = game.time.events.add(Phaser.Timer.SECOND * 3, () => {
            this.levelTitle.alpha = 0;
        });

        // this.spawnBeginning = 0;

        // Here are different ways to modify existing an text object!
        // Alpha value:         this.hintsText_Lvl2.alpha = 0;
        // x or y position:     this.hintsText_Lvl2.x = 0;
        // the actual text:     this.hintsText_Lvl2.text = "Hello!";

        // // When you click on the sprite, you go back to the MainMenu.
        // this.wall.inputEnabled = true;
        // this.wall.events.onInputDown.add( function() { this.quitGame(); }, this );

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.jKey = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
        this.hKey = this.game.input.keyboard.addKey(Phaser.Keyboard.H);

        this.wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.twoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
        this.oneKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        // spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.mousePointer = this.game.input.activePointer;
        // this.mousePointer.contextMenu.disable();
    //    this.mouseText = this.game.add.text( this.mousePointer.x, this.mousePointer.y, '' , hintsTextStyle);

        // this.player1_Lvl2.body.onOverlap = new Phaser.Signal();
        // this.player1_Lvl2.body.onOverlap.add(this.takeItem, this);
//        this.itemInitVelocity = 200;
        // this.slowDownValue = 0;

        this.chatButton = this.add.button( this.game.world.centerX, 30, 'chatButton', this.chatButtonClicked, this);
        this.chatButton.anchor.setTo(0.5,0.5);
        this.chatButton.width = 55;
        this.chatButton.height = 55;


        // Tutorial: "the client will notify the server that a new player should be created"
        // Note: See how it is at the end of the create() method; my theory is that it's so that
        // no more than one player executes the entire process of initializing everything above
        Client.askNewPlayer_Lvl2();

/*        if (this.playerSide_Lvl2 === "left") {
            this.playerXPos_Lvl2 = 450;
            this.playerYPos_Lvl2 = 300;

            this.player2XPos_Lvl2 = 750;
            this.player2YPos_Lvl2 = 300;
            this.player2Side_Lvl2 = "right";
        } else if (this.playerSide_Lvl2 === "right") {
            this.playerXPos_Lvl2 = 750;
            this.playerYPos_Lvl2 = 300;

            this.player2XPos_Lvl2 = 450;
            this.player2YPos_Lvl2 = 300;
            this.player2Side_Lvl2 = "left";
        } else { // error
            console.log("Error getting the player side");
            return;
        }

        this.addMyGameElements(this.playerID_Lvl2,this.playerXPos_Lvl2,this.playerYPos_Lvl2,this.playerSide_Lvl2);
        this.addNewPlayer(this.player2ID_Lvl2,this.player2XPos_Lvl2,this.player2YPos_Lvl2,this.player2Side_Lvl2);
*/

    },

// Adding client's own new player, along with all client-specific game elements

    // Add all of the client-specific elements (i.e. the non-static elements that will be interacted with),
    // including the player's character (astronaut), ship pieces, ray guns, and enemies
    addMyGameElements: function(id,x,y,playerSide) {
        // this.player1_Lvl2.x = x;
        // this.player1_Lvl2.y = y;

        // var p1x = (x === 900) ? 300 : 900;
        // var p1y = 300;

        // this.player1_Lvl2 = game.add.sprite( p1x, p1y, 'player1' );
        this.player1_Lvl2 = game.add.sprite( x, y, 'player1' );
        this.player1_Lvl2.anchor.setTo( 0.5, 0.5 );
        this.player1_Lvl2.width = 75;
        this.player1_Lvl2.height = 75;
        this.player1_Lvl2.id = id;

        game.physics.enable( this.player1_Lvl2, Phaser.Physics.ARCADE );

        GameLvl2.playerMap[id] = this.player1_Lvl2;

        var hintsTextStyle = { font: "15px Verdana", fill: "#FFFFFF", align: "center" };

        // Text above the player
        this.hintsText_Lvl2 = game.add.text( this.player1_Lvl2.x, this.player1_Lvl2.y - this.player1_Lvl2.body.height/2 - 50, 'Hints will go here!' , hintsTextStyle);
        this.hintsText_Lvl2.anchor.setTo( 0.5, 0.5 );
        this.hintsText_Lvl2.alpha = 0;

// Rayguns

        this.rayGuns_Lvl2 = game.add.group();
        this.rayGuns_Lvl2.enableBody = true;
        this.rayGuns_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;

        this.redGun = this.rayGuns_Lvl2.create(200,450, 'RedGun');
        this.redGun.anchor.setTo(0.5,0.5);
        this.redGun.height = 50;
        this.redGun.width = 50;
        this.redGun.body.velocity.x = 0;
        this.redGun.body.velocity.y = 0;
        this.redGun.color = "red";
        this.redGun.name = "redGun";

        this.yellowGun = this.rayGuns_Lvl2.create(1000,450, 'YellowGun');
        this.yellowGun.anchor.setTo(0.5,0.5);
        this.yellowGun.height = 50;
        this.yellowGun.width = 50;
        this.yellowGun.body.velocity.x = 0;
        this.yellowGun.body.velocity.y = 0;
        this.yellowGun.color = "yellow";
        this.yellowGun.name = "yellowGun";

        this.greenGun = this.rayGuns_Lvl2.create(200,150, 'GreenGun');
        this.greenGun.anchor.setTo(0.5,0.5);
        this.greenGun.height = 50;
        this.greenGun.width = 50;
        this.greenGun.body.velocity.x = 0;
        this.greenGun.body.velocity.y = 0;
        this.greenGun.color = "green";
        this.greenGun.name = "greenGun";

        this.blueGun = this.rayGuns_Lvl2.create(1000,150, 'BlueGun');
        this.blueGun.anchor.setTo(0.5,0.5);
        this.blueGun.height = 50;
        this.blueGun.width = 50;
        this.blueGun.body.velocity.x = 0;
        this.blueGun.body.velocity.y = 0;
        this.blueGun.color = "blue";
        this.blueGun.name = "blueGun";

        this.redBulletTime = 0;
        this.yellowBulletTime = 0;
        this.greenBulletTime = 0;
        this.blueBulletTime = 0;

        this.redBullets = game.add.group();
        this.redBullets.enableBody = true;
        this.redBullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++)
        {
            this.redBullet = this.redBullets.create(0, 0, 'RedBullet');
            this.redBullet.width = 20;
            this.redBullet.height = 20;
            this.redBullet.anchor.setTo(0.5,0.5);
            this.redBullet.color = "red";
            this.redBullet.exists = false;
            this.redBullet.visible = false;
            this.redBullet.checkWorldBounds = true;
            this.redBullet.events.onOutOfBounds.add(this.killBullet, this);
        }

        this.yellowBullets = game.add.group();
        this.yellowBullets.enableBody = true;
        this.yellowBullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++)
        {
            this.yellowBullet = this.yellowBullets.create(0, 0, 'YellowBullet');
            this.yellowBullet.width = 20;
            this.yellowBullet.height = 20;
            this.yellowBullet.anchor.setTo(0.5,0.5);
            this.yellowBullet.color = "yellow";
            this.yellowBullet.exists = false;
            this.yellowBullet.visible = false;
            this.yellowBullet.checkWorldBounds = true;
            this.yellowBullet.events.onOutOfBounds.add(this.killBullet, this);
        }

        this.greenBullets = game.add.group();
        this.greenBullets.enableBody = true;
        this.greenBullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++)
        {
            this.greenBullet = this.greenBullets.create(0, 0, 'GreenBullet');
            this.greenBullet.width = 20;
            this.greenBullet.height = 20;
            this.greenBullet.anchor.setTo(0.5,0.5);
            this.greenBullet.color = "green";
            this.greenBullet.exists = false;
            this.greenBullet.visible = false;
            this.greenBullet.checkWorldBounds = true;
            this.greenBullet.events.onOutOfBounds.add(this.killBullet, this);
        }

        this.blueBullets = game.add.group();
        this.blueBullets.enableBody = true;
        this.blueBullets.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < 10; i++)
        {
            this.blueBullet = this.blueBullets.create(0, 0, 'BlueBullet');
            this.blueBullet.width = 20;
            this.blueBullet.height = 20;
            this.blueBullet.anchor.setTo(0.5,0.5);
            this.blueBullet.color = "blue";
            this.blueBullet.exists = false;
            this.blueBullet.visible = false;
            this.blueBullet.checkWorldBounds = true;
            this.blueBullet.events.onOutOfBounds.add(this.killBullet, this);
        }


// Player pieces

        // this.pieces = this.game.add.group();
        // this.pieces.enableBody = true;
        // this.pieces.physicsBodyType = Phaser.Physics.ARCADE;

        // Create subgroups for each category of ship piece, distinguished by color and player
        this.p1Red_pieces_Lvl2 = game.add.group();
        this.p1Yellow_pieces_Lvl2 = game.add.group();
        this.p1Green_pieces_Lvl2 = game.add.group();
        this.p1Blue_pieces_Lvl2 = game.add.group();
        
        this.p2Red_pieces_Lvl2 = game.add.group();
        this.p2Yellow_pieces_Lvl2 = game.add.group();
        this.p2Green_pieces_Lvl2 = game.add.group();
        this.p2Blue_pieces_Lvl2 = game.add.group();

        this.p1Red_pieces_Lvl2.enableBody = true;
        this.p1Red_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;
        this.p1Yellow_pieces_Lvl2.enableBody = true;
        this.p1Yellow_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;
        this.p1Green_pieces_Lvl2.enableBody = true;
        this.p1Green_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;
        this.p1Blue_pieces_Lvl2.enableBody = true;
        this.p1Blue_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;

        this.p2Red_pieces_Lvl2.enableBody = true;
        this.p2Red_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;
        this.p2Yellow_pieces_Lvl2.enableBody = true;
        this.p2Yellow_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;
        this.p2Green_pieces_Lvl2.enableBody = true;
        this.p2Green_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;
        this.p2Blue_pieces_Lvl2.enableBody = true;
        this.p2Blue_pieces_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;

    // P1 pieces


        // NOTE: There are at least two ways to set the drag value of a body (keep in mind that the drag value, which is measured in pixels per
        // second squared, is a Phaser.Point, i.e. it has x and y components, and it accepts large integer values in the 100s; before I found
        // out I was using Phaser 2, I was trying to do it in the Phaser 3 way, which is MUCH different--the drag values go from 0.0 to 1.0)
        //
        // 1) Set the existing drag x and y values individually:
        //      this.p1Red.body.drag.x = 100;
        //      this.p1Red.body.drag.y = 100;
        // 2) Create a new Phaser.Point instance for the drag:
        //      this.p1Red.body.drag = new Phaser.Point(100,100);

        this.p1Red = this.p1Red_pieces_Lvl2.create(1050, 500, 'RedP1');
        this.p1Red.anchor.setTo(0.5,0.5);
        this.p1Red.body.velocity.x = 0;
        this.p1Red.body.velocity.y = 0;
        // this.p1Red.body.setVelocity(50,50);
        this.p1Red.height = 30;
        this.p1Red.width = 30;
        this.p1Red.player = "p1";
        this.p1Red.color = "red";
        // this.p1Red.body.damping = true;
        this.p1Red.body.drag = new Phaser.Point(100,100); // This is Phaser 2! So, drag is measured in pixels per second squared for both x and y directions, according to line 91066 in phaser.js
        // this.p1Red.body.drag.x = 100;
        // this.p1Red.body.drag.y = 100;
        this.p1Red.name = "p1Red";

        this.p1Red2 = this.p1Red_pieces_Lvl2.create(675, 225, 'RedP1');
        this.p1Red2.anchor.setTo(0.5,0.5);
        this.p1Red2.body.velocity.x = 0;
        this.p1Red2.body.velocity.y = 0;
        this.p1Red2.height = 30;
        this.p1Red2.width = 30;
        this.p1Red2.player = "p1";
        this.p1Red2.color = "red";
        this.p1Red2.body.drag = new Phaser.Point(100,100); // This is Phaser 2! So, drag is measured in pixels per second squared for both x and y directions, according to line 91066 in phaser.js
        // this.p1Red2.body.drag.x = 100;
        // this.p1Red2.body.drag.y = 100;
        this.p1Red2.name = "p1Red2";

        this.p1Red3 = this.p1Red_pieces_Lvl2.create(425, 575, 'RedP1');
        this.p1Red3.anchor.setTo(0.5,0.5);
        this.p1Red3.body.velocity.x = 0;
        this.p1Red3.body.velocity.y = 0;
        this.p1Red3.height = 30;
        this.p1Red3.width = 30;
        this.p1Red3.player = "p1";
        this.p1Red3.color = "red";
        this.p1Red3.body.drag = new Phaser.Point(100,100);
        // this.p1Red3.body.drag.x = 100;
        // this.p1Red3.body.drag.y = 100; 
        this.p1Red3.name = "p1Red3";

        this.p1Blue = this.p1Blue_pieces_Lvl2.create(50,100,'BlueP1');
        this.p1Blue.anchor.setTo(0.5,0.5);
        this.p1Blue.body.velocity.x = 0;
        this.p1Blue.body.velocity.y = 0;
        this.p1Blue.height = 30;
        this.p1Blue.width = 30;
        this.p1Blue.player = "p1";
        this.p1Blue.color = "blue";
        this.p1Blue.body.drag = new Phaser.Point(100,100);
        this.p1Blue.name = "p1Blue";

        this.p1Blue2 = this.p1Blue_pieces_Lvl2.create(850,75,'BlueP1');
        this.p1Blue2.anchor.setTo(0.5,0.5);
        this.p1Blue2.body.velocity.x = 0;
        this.p1Blue2.body.velocity.y = 0;
        this.p1Blue2.height = 30;
        this.p1Blue2.width = 30;
        this.p1Blue2.player = "p1";
        this.p1Blue2.color = "blue";
        this.p1Blue2.body.drag = new Phaser.Point(100,100);
        this.p1Blue2.name = "p1Blue2";

        this.p1Blue3 = this.p1Blue_pieces_Lvl2.create(925,300,'BlueP1');
        this.p1Blue3.anchor.setTo(0.5,0.5);
        this.p1Blue3.body.velocity.x = 0;
        this.p1Blue3.body.velocity.y = 0;
        this.p1Blue3.height = 30;
        this.p1Blue3.width = 30;
        this.p1Blue3.player = "p1";
        this.p1Blue3.color = "blue";
        this.p1Blue3.body.drag = new Phaser.Point(100,100);
        this.p1Blue3.name = "p1Blue3";

/*
        this.p1Red = this.pieces.create(900, 500, 'RedP1');
        this.p1Red.anchor.setTo(0.5,0.5);
        this.p1Red.body.velocity.x = 0;
        this.p1Red.body.velocity.y = 0;
        this.p1Red.height = 30;
        this.p1Red.width = 30;
        this.p1Red.player = "p1";
        this.p1Red.color = "red";

        this.p1Red2 = this.pieces.create(850, 50, 'RedP1');
        this.p1Red2.anchor.setTo(0.5,0.5);
        this.p1Red2.body.velocity.x = 0;
        this.p1Red2.body.velocity.y = 0;
        this.p1Red2.height = 30;
        this.p1Red2.width = 30;
        this.p1Red2.player = "p1";
        this.p1Red2.color = "red";

        this.p1Red3 = this.pieces.create(425, 575, 'RedP1');
        this.p1Red3.anchor.setTo(0.5,0.5);
        this.p1Red3.body.velocity.x = 0;
        this.p1Red3.body.velocity.y = 0;
        this.p1Red3.height = 30;
        this.p1Red3.width = 30;
        this.p1Red3.player = "p1";
        this.p1Red3.color = "red";    

        this.p1Yellow = this.pieces.create(1100, 100, 'YellowP1');
        this.p1Yellow.anchor.setTo(0.5,0.5);
        this.p1Yellow.body.velocity.x = 0;
        this.p1Yellow.body.velocity.y = 0;
        this.p1Yellow.height = 30;
        this.p1Yellow.width = 30;
        this.p1Yellow.player = "p1";
        this.p1Yellow.color = "yellow";

        this.p1Yellow2 = this.pieces.create(500, 300, 'YellowP1');
        this.p1Yellow2.anchor.setTo(0.5,0.5);
        this.p1Yellow2.body.velocity.x = 0;
        this.p1Yellow2.body.velocity.y = 0;
        this.p1Yellow2.height = 30;
        this.p1Yellow2.width = 30;
        this.p1Yellow2.player = "p1";
        this.p1Yellow2.color = "yellow";

        this.p1Green = this.pieces.create(1150, 450, 'GreenP1');
        this.p1Green.anchor.setTo(0.5,0.5);
        this.p1Green.body.velocity.x = 0;
        this.p1Green.body.velocity.y = 0;
        this.p1Green.height = 30;
        this.p1Green.width = 30;
        this.p1Green.player = "p1";
        this.p1Green.color = "green";

        this.p1Green2 = this.pieces.create(450, 50, 'GreenP1');
        this.p1Green2.anchor.setTo(0.5,0.5);
        this.p1Green2.body.velocity.x = 0;
        this.p1Green2.body.velocity.y = 0;
        this.p1Green2.height = 30;
        this.p1Green2.width = 30;
        this.p1Green2.player = "p1";
        this.p1Green2.color = "green";

        this.p1Blue = this.pieces.create(50,100,'BlueP1');
        this.p1Blue.anchor.setTo(0.5,0.5);
        this.p1Blue.body.velocity.x = 0;
        this.p1Blue.body.velocity.y = 0;
        this.p1Blue.height = 30;
        this.p1Blue.width = 30;
        this.p1Blue.player = "p1";
        this.p1Blue.color = "blue";

        this.p1Blue2 = this.pieces.create(750,75,'BlueP1');
        this.p1Blue2.anchor.setTo(0.5,0.5);
        this.p1Blue2.body.velocity.x = 0;
        this.p1Blue2.body.velocity.y = 0;
        this.p1Blue2.height = 30;
        this.p1Blue2.width = 30;
        this.p1Blue2.player = "p1";
        this.p1Blue2.color = "blue";
*/
    // P2 pieces

        this.p2Red = this.p2Red_pieces_Lvl2.create(1100, 50, 'RedP2');
        this.p2Red.anchor.setTo(0.5,0.5);
        this.p2Red.body.velocity.x = 0;
        this.p2Red.body.velocity.y = 0;
        this.p2Red.height = 30;
        this.p2Red.width = 30;
        this.p2Red.player = "p2";
        this.p2Red.color = "red";
        this.p2Red.body.drag = new Phaser.Point(100,100);
        this.p2Red.name = "p2Red";

        this.p2Red2 = this.p2Red_pieces_Lvl2.create(550, 325, 'RedP2');
        this.p2Red2.anchor.setTo(0.5,0.5);
        this.p2Red2.body.velocity.x = 0;
        this.p2Red2.body.velocity.y = 0;
        this.p2Red2.height = 30;
        this.p2Red2.width = 30;
        this.p2Red2.player = "p2";
        this.p2Red2.color = "red";
        this.p2Red2.body.drag = new Phaser.Point(100,100);
        this.p2Red2.name = "p2Red2";

        this.p2Red3 = this.p2Red_pieces_Lvl2.create(200, 250, 'RedP2');
        this.p2Red3.anchor.setTo(0.5,0.5);
        this.p2Red3.body.velocity.x = 0;
        this.p2Red3.body.velocity.y = 0;
        this.p2Red3.height = 30;
        this.p2Red3.width = 30;
        this.p2Red3.player = "p2";
        this.p2Red3.color = "red";
        this.p2Red3.body.drag = new Phaser.Point(100,100);
        this.p2Red3.name = "p2Red3";


        this.p2Blue = this.p2Blue_pieces_Lvl2.create(800,550,'BlueP2');
        this.p2Blue.anchor.setTo(0.5,0.5);
        this.p2Blue.body.velocity.x = 0;
        this.p2Blue.body.velocity.y = 0;
        this.p2Blue.height = 30;
        this.p2Blue.width = 30;
        this.p2Blue.player = "p2";
        this.p2Blue.color = "blue";
        this.p2Blue.body.drag = new Phaser.Point(100,100);
        this.p2Blue.name = "p2Blue";

        this.p2Blue2 = this.p2Blue_pieces_Lvl2.create(350,175,'BlueP2');
        this.p2Blue2.anchor.setTo(0.5,0.5);
        this.p2Blue2.body.velocity.x = 0;
        this.p2Blue2.body.velocity.y = 0;
        this.p2Blue2.height = 30;
        this.p2Blue2.width = 30;
        this.p2Blue2.player = "p2";
        this.p2Blue2.color = "blue";
        this.p2Blue2.body.drag = new Phaser.Point(100,100);
        this.p2Blue2.name = "p2Blue2";

        this.p2Blue3 = this.p2Blue_pieces_Lvl2.create(400,450,'BlueP2');
        this.p2Blue3.anchor.setTo(0.5,0.5);
        this.p2Blue3.body.velocity.x = 0;
        this.p2Blue3.body.velocity.y = 0;
        this.p2Blue3.height = 30;
        this.p2Blue3.width = 30;
        this.p2Blue3.player = "p2";
        this.p2Blue3.color = "blue";
        this.p2Blue3.body.drag = new Phaser.Point(100,100);
        this.p2Blue3.name = "p2Blue3";

/*
        this.p2Red = this.pieces.create(750, 200, 'RedP2');
        this.p2Red.anchor.setTo(0.5,0.5);
        this.p2Red.body.velocity.x = 0;
        this.p2Red.body.velocity.y = 0;
        this.p2Red.height = 30;
        this.p2Red.width = 30;
        this.p2Red.player = "p2";
        this.p2Red.color = "red";

        this.p2Red2 = this.pieces.create(550, 500, 'RedP2');
        this.p2Red2.anchor.setTo(0.5,0.5);
        this.p2Red2.body.velocity.x = 0;
        this.p2Red2.body.velocity.y = 0;
        this.p2Red2.height = 30;
        this.p2Red2.width = 30;
        this.p2Red2.player = "p2";
        this.p2Red2.color = "red";

        this.p2Yellow = this.pieces.create(200, 400, 'YellowP2');
        this.p2Yellow.anchor.setTo(0.5,0.5);
        this.p2Yellow.body.velocity.x = 0;
        this.p2Yellow.body.velocity.y = 0;
        this.p2Yellow.height = 30;
        this.p2Yellow.width = 30;
        this.p2Yellow.player = "p2"
        this.p2Yellow.color = "yellow";

        this.p2Yellow2 = this.pieces.create(700, 400, 'YellowP2');
        this.p2Yellow2.anchor.setTo(0.5,0.5);
        this.p2Yellow2.body.velocity.x = 0;
        this.p2Yellow2.body.velocity.y = 0;
        this.p2Yellow2.height = 30;
        this.p2Yellow2.width = 30;
        this.p2Yellow2.player = "p2";
        this.p2Yellow2.color = "yellow";

        this.p2Green = this.pieces.create(100, 550, 'GreenP2');
        this.p2Green.anchor.setTo(0.5,0.5);
        this.p2Green.body.velocity.x = 0;
        this.p2Green.body.velocity.y = 0;
        this.p2Green.height = 30;
        this.p2Green.width = 30;
        this.p2Green.player = "p2";
        this.p2Green.color = "green";

        this.p2Green2 = this.pieces.create(1075, 25, 'GreenP2');
        this.p2Green2.anchor.setTo(0.5,0.5);
        this.p2Green2.body.velocity.x = 0;
        this.p2Green2.body.velocity.y = 0;
        this.p2Green2.height = 30;
        this.p2Green2.width = 30;
        this.p2Green2.player = "p2";
        this.p2Green2.color = "green";

        this.p2Blue = this.pieces.create(725,500,'BlueP2');
        this.p2Blue.anchor.setTo(0.5,0.5);
        this.p2Blue.body.velocity.x = 0;
        this.p2Blue.body.velocity.y = 0;
        this.p2Blue.height = 30;
        this.p2Blue.width = 30;
        this.p2Blue.player = "p2";
        this.p2Blue.color = "blue";

        this.p2Blue2 = this.pieces.create(350,175,'BlueP2');
        this.p2Blue2.anchor.setTo(0.5,0.5);
        this.p2Blue2.body.velocity.x = 0;
        this.p2Blue2.body.velocity.y = 0;
        this.p2Blue2.height = 30;
        this.p2Blue2.width = 30;
        this.p2Blue2.player = "p2";
        this.p2Blue2.color = "blue";

        this.p2Blue3 = this.pieces.create(400,450,'BlueP2');
        this.p2Blue3.anchor.setTo(0.5,0.5);
        this.p2Blue3.body.velocity.x = 0;
        this.p2Blue3.body.velocity.y = 0;
        this.p2Blue3.height = 30;
        this.p2Blue3.width = 30;
        this.p2Blue3.player = "p2";
        this.p2Blue3.color = "blue";
*/

// Enemies
        
        this.enemies_Lvl2 = game.add.group();
        this.enemies_Lvl2.enableBody = true;
        this.enemies_Lvl2.physicsBodyType = Phaser.Physics.ARCADE;

        this.enemySpawnCooldown = 0;

/*
        for (var i = 0; i < 10; i++)
        {
            this.redEnemy = this.enemies_Lvl2.create(-300, -300, 'RedEnemy'); // Just spawn it far away for now
            this.redEnemy.width = 60;
            this.redEnemy.height = 60;
            this.redEnemy.anchor.setTo(0.5,0.5);
            this.redEnemy.color = "red";
            this.redEnemy.body.velocity.x = 0;
            this.redEnemy.body.velocity.y = 0;
            this.redEnemy.exists = false;
            this.redEnemy.visible = false;
            this.redEnemy.checkWorldBounds = false;
        }

        for (var i = 0; i < 10; i++)
        {
            this.yellowEnemy = this.enemies_Lvl2.create(-300, -300, 'YellowEnemy'); // Just spawn it far away for now
            this.yellowEnemy.width = 60;
            this.yellowEnemy.height = 60;
            this.yellowEnemy.anchor.setTo(0.5,0.5);
            this.yellowEnemy.color = "yellow";
            this.yellowEnemy.body.velocity.x = 0;
            this.yellowEnemy.body.velocity.y = 0;
            this.yellowEnemy.exists = false;
            this.yellowEnemy.visible = false;
            this.yellowEnemy.checkWorldBounds = false;
        }

        for (var i = 0; i < 10; i++)
        {
            this.greenEnemy = this.enemies_Lvl2.create(-300, -300, 'GreenEnemy'); // Just spawn it far away for now
            this.greenEnemy.width = 60;
            this.greenEnemy.height = 60;
            this.greenEnemy.anchor.setTo(0.5,0.5);
            this.greenEnemy.color = "green";
            this.greenEnemy.body.velocity.x = 0;
            this.greenEnemy.body.velocity.y = 0;
            this.greenEnemy.exists = false;
            this.greenEnemy.visible = false;
            this.greenEnemy.checkWorldBounds = false;
        }

        for (var i = 0; i < 10; i++)
        {
            this.blueEnemy = this.enemies_Lvl2.create(-300, -300, 'BlueEnemy'); // Just spawn it far away for now
            this.blueEnemy.width = 60;
            this.blueEnemy.height = 60;
            this.blueEnemy.anchor.setTo(0.5,0.5);
            this.blueEnemy.color = "blue";
            this.blueEnemy.body.velocity.x = 0;
            this.blueEnemy.body.velocity.y = 0;
            this.blueEnemy.exists = false;
            this.blueEnemy.visible = false;
            this.blueEnemy.checkWorldBounds = false;
        }
*/
/*
// Wave 1

        this.redEnemy1 = this.enemies_Lvl2.create(300, -50, 'RedEnemy');
        this.redEnemy1.anchor.setTo(0.5,0.5);
        this.redEnemy1.body.velocity.x = 0;
        this.redEnemy1.body.velocity.y = 0;
        this.redEnemy1.height = 60;
        this.redEnemy1.width = 60;
        this.redEnemy1.color = "red";
        // this.redEnemy1.body.setSize(10, 10, 25, 25);

        // this.redEnemy2 = this.enemies_Lvl2.create(800, this.game.world.height-10, 'RedEnemy');
        // this.redEnemy2.anchor.setTo(0.5,0.5);
        // this.redEnemy2.body.velocity.x = 0;
        // this.redEnemy2.body.velocity.y = 0;
        // this.redEnemy2.height = 60;
        // this.redEnemy2.width = 60;
        // this.redEnemy2.color = "red";

        this.yellowEnemy1 = this.enemies_Lvl2.create(900, this.game.world.height+100, 'YellowEnemy');
        this.yellowEnemy1.anchor.setTo(0.5,0.5);
        this.yellowEnemy1.body.velocity.x = 0;
        this.yellowEnemy1.body.velocity.y = 0;
        this.yellowEnemy1.height = 60;
        this.yellowEnemy1.width = 60;
        this.yellowEnemy1.color = "yellow";


        // this.greenEnemy1 = this.enemies_Lvl2.create(1200, 300, 'GreenEnemy');
        // this.greenEnemy1.anchor.setTo(0.5,0.5);
        // this.greenEnemy1.body.velocity.x = 0;
        // this.greenEnemy1.body.velocity.y = 0;
        // this.greenEnemy1.height = 60;
        // this.greenEnemy1.width = 60;
        // this.greenEnemy1.color = "green";

        this.greenEnemy4 = this.enemies_Lvl2.create(350, this.game.world.height+50, 'GreenEnemy');
        this.greenEnemy4.anchor.setTo(0.5,0.5);
        this.greenEnemy4.body.velocity.x = 0;
        this.greenEnemy4.body.velocity.y = 0;
        this.greenEnemy4.height = 60;
        this.greenEnemy4.width = 60;
        this.greenEnemy4.color = "green"; 

        this.blueEnemy1 = this.enemies_Lvl2.create(700, -50, 'BlueEnemy');
        this.blueEnemy1.anchor.setTo(0.5,0.5);
        this.blueEnemy1.body.velocity.x = 0;
        this.blueEnemy1.body.velocity.y = 0;
        this.blueEnemy1.height = 60;
        this.blueEnemy1.width = 60;
        this.blueEnemy1.color = "blue";

// Wave 2

        this.yellowEnemy2 = this.enemies_Lvl2.create(-400, 400, 'YellowEnemy');
        this.yellowEnemy2.anchor.setTo(0.5,0.5);
        this.yellowEnemy2.body.velocity.x = 0;
        this.yellowEnemy2.body.velocity.y = 0;
        this.yellowEnemy2.height = 60;
        this.yellowEnemy2.width = 60;
        this.yellowEnemy2.color = "yellow";

        this.yellowEnemy3 = this.enemies_Lvl2.create(100, -350, 'YellowEnemy');
        this.yellowEnemy3.anchor.setTo(0.5,0.5);
        this.yellowEnemy3.body.velocity.x = 0;
        this.yellowEnemy3.body.velocity.y = 0;
        this.yellowEnemy3.height = 60;
        this.yellowEnemy3.width = 60;
        this.yellowEnemy3.color = "yellow";

        this.redEnemy3 = this.enemies_Lvl2.create(100, this.game.world.height+350, 'RedEnemy');
        this.redEnemy3.anchor.setTo(0.5,0.5);
        this.redEnemy3.body.velocity.x = 0;
        this.redEnemy3.body.velocity.y = 0;
        this.redEnemy3.height = 60;
        this.redEnemy3.width = 60;
        this.redEnemy3.color = "red";

        this.greenEnemy2 = this.enemies_Lvl2.create(800, this.game.world.height+350, 'GreenEnemy');
        this.greenEnemy2.anchor.setTo(0.5,0.5);
        this.greenEnemy2.body.velocity.x = 0;
        this.greenEnemy2.body.velocity.y = 0;
        this.greenEnemy2.height = 60;
        this.greenEnemy2.width = 60;
        this.greenEnemy2.color = "green";

        this.blueEnemy3 = this.enemies_Lvl2.create(200, this.game.world.height+400, 'BlueEnemy');
        this.blueEnemy3.anchor.setTo(0.5,0.5);
        this.blueEnemy3.body.velocity.x = 0;
        this.blueEnemy3.body.velocity.y = 0;
        this.blueEnemy3.height = 60;
        this.blueEnemy3.width = 60;
        this.blueEnemy3.color = "blue";

        this.blueEnemy4 = this.enemies_Lvl2.create(900, this.game.world.height+350, 'BlueEnemy');
        this.blueEnemy4.anchor.setTo(0.5,0.5);
        this.blueEnemy4.body.velocity.x = 0;
        this.blueEnemy4.body.velocity.y = 0;
        this.blueEnemy4.height = 60;
        this.blueEnemy4.width = 60;
        this.blueEnemy4.color = "blue";

        this.blueEnemy5 = this.enemies_Lvl2.create(1450, this.game.world.height-400, 'BlueEnemy');
        this.blueEnemy5.anchor.setTo(0.5,0.5);
        this.blueEnemy5.body.velocity.x = 0;
        this.blueEnemy5.body.velocity.y = 0;
        this.blueEnemy5.height = 60;
        this.blueEnemy5.width = 60;
        this.blueEnemy5.color = "blue";

// Wave 3

        this.redEnemy4 = this.enemies_Lvl2.create(1000, this.game.world.height+750, 'RedEnemy');
        this.redEnemy4.anchor.setTo(0.5,0.5);
        this.redEnemy4.body.velocity.x = 0;
        this.redEnemy4.body.velocity.y = 0;
        this.redEnemy4.height = 60;
        this.redEnemy4.width = 60;
        this.redEnemy4.color = "red";

        this.redEnemy4 = this.enemies_Lvl2.create(-750, this.game.world.height/2, 'RedEnemy');
        this.redEnemy4.anchor.setTo(0.5,0.5);
        this.redEnemy4.body.velocity.x = 0;
        this.redEnemy4.body.velocity.y = 0;
        this.redEnemy4.height = 60;
        this.redEnemy4.width = 60;
        this.redEnemy4.color = "red";

        this.yellowEnemy4 = this.enemies_Lvl2.create(750, this.game.world.height+800, 'YellowEnemy');
        this.yellowEnemy4.anchor.setTo(0.5,0.5);
        this.yellowEnemy4.body.velocity.x = 0;
        this.yellowEnemy4.body.velocity.y = 0;
        this.yellowEnemy4.height = 60;
        this.yellowEnemy4.width = 60;
        this.yellowEnemy4.color = "yellow";

        this.greenEnemy3 = this.enemies_Lvl2.create(200, this.game.world.height+750, 'GreenEnemy');
        this.greenEnemy3.anchor.setTo(0.5,0.5);
        this.greenEnemy3.body.velocity.x = 0;
        this.greenEnemy3.body.velocity.y = 0;
        this.greenEnemy3.height = 60;
        this.greenEnemy3.width = 60;
        this.greenEnemy3.color = "green";

        this.greenEnemy4 = this.enemies_Lvl2.create(550, -850, 'GreenEnemy');
        this.greenEnemy4.anchor.setTo(0.5,0.5);
        this.greenEnemy4.body.velocity.x = 0;
        this.greenEnemy4.body.velocity.y = 0;
        this.greenEnemy4.height = 60;
        this.greenEnemy4.width = 60;
        this.greenEnemy4.color = "green";

        this.blueEnemy2 = this.enemies_Lvl2.create(400, this.game.world.height+750, 'BlueEnemy');
        this.blueEnemy2.anchor.setTo(0.5,0.5);
        this.blueEnemy2.body.velocity.x = 0;
        this.blueEnemy2.body.velocity.y = 0;
        this.blueEnemy2.height = 60;
        this.blueEnemy2.width = 60;
        this.blueEnemy2.color = "blue";

        this.blueEnemy3 = this.enemies_Lvl2.create(this.game.world.width+750, this.game.world.height/3, 'BlueEnemy');
        this.blueEnemy3.anchor.setTo(0.5,0.5);
        this.blueEnemy3.body.velocity.x = 0;
        this.blueEnemy3.body.velocity.y = 0;
        this.blueEnemy3.height = 60;
        this.blueEnemy3.width = 60;
        this.blueEnemy3.color = "blue";

// Wave 4

        this.redEnemy4 = this.enemies_Lvl2.create(100, -1100, 'RedEnemy');
        this.redEnemy4.anchor.setTo(0.5,0.5);
        this.redEnemy4.body.velocity.x = 0;
        this.redEnemy4.body.velocity.y = 0;
        this.redEnemy4.height = 60;
        this.redEnemy4.width = 60;
        this.redEnemy4.color = "red";

        this.redEnemy5 = this.enemies_Lvl2.create(400, this.game.world.height+1200, 'RedEnemy');
        this.redEnemy5.anchor.setTo(0.5,0.5);
        this.redEnemy5.body.velocity.x = 0;
        this.redEnemy5.body.velocity.y = 0;
        this.redEnemy5.height = 60;
        this.redEnemy5.width = 60;
        this.redEnemy5.color = "red";

        this.redEnemy6 = this.enemies_Lvl2.create(-1150, -1200, 'RedEnemy');
        this.redEnemy6.anchor.setTo(0.5,0.5);
        this.redEnemy6.body.velocity.x = 0;
        this.redEnemy6.body.velocity.y = 0;
        this.redEnemy6.height = 60;
        this.redEnemy6.width = 60;
        this.redEnemy6.color = "red";

        this.redEnemy7 = this.enemies_Lvl2.create(this.game.width+1300, 0, 'RedEnemy');
        this.redEnemy7.anchor.setTo(0.5,0.5);
        this.redEnemy7.body.velocity.x = 0;
        this.redEnemy7.body.velocity.y = 0;
        this.redEnemy7.height = 60;
        this.redEnemy7.width = 60;
        this.redEnemy7.color = "red";

        this.redEnemy8 = this.enemies_Lvl2.create(950, 1350, 'RedEnemy');
        this.redEnemy8.anchor.setTo(0.5,0.5);
        this.redEnemy8.body.velocity.x = 0;
        this.redEnemy8.body.velocity.y = 0;
        this.redEnemy8.height = 60;
        this.redEnemy8.width = 60;
        this.redEnemy8.color = "red";

        this.redEnemy9 = this.enemies_Lvl2.create(700, 1300, 'RedEnemy');
        this.redEnemy9.anchor.setTo(0.5,0.5);
        this.redEnemy9.body.velocity.x = 0;
        this.redEnemy9.body.velocity.y = 0;
        this.redEnemy9.height = 60;
        this.redEnemy9.width = 60;
        this.redEnemy9.color = "red";

        this.yellowEnemy5 = this.enemies_Lvl2.create(750, -1200, 'YellowEnemy');
        this.yellowEnemy5.anchor.setTo(0.5,0.5);
        this.yellowEnemy5.body.velocity.x = 0;
        this.yellowEnemy5.body.velocity.y = 0;
        this.yellowEnemy5.height = 60;
        this.yellowEnemy5.width = 60;
        this.yellowEnemy5.color = "yellow";

        this.yellowEnemy6 = this.enemies_Lvl2.create(800, this.game.world.height+1100, 'YellowEnemy');
        this.yellowEnemy6.anchor.setTo(0.5,0.5);
        this.yellowEnemy6.body.velocity.x = 0;
        this.yellowEnemy6.body.velocity.y = 0;
        this.yellowEnemy6.height = 60;
        this.yellowEnemy6.width = 60;
        this.yellowEnemy6.color = "yellow";

        this.yellowEnemy7 = this.enemies_Lvl2.create(1250, -1100, 'YellowEnemy');
        this.yellowEnemy7.anchor.setTo(0.5,0.5);
        this.yellowEnemy7.body.velocity.x = 0;
        this.yellowEnemy7.body.velocity.y = 0;
        this.yellowEnemy7.height = 60;
        this.yellowEnemy7.width = 60;
        this.yellowEnemy7.color = "yellow";

        this.greenEnemy5 = this.enemies_Lvl2.create(350, -1250, 'GreenEnemy');
        this.greenEnemy5.anchor.setTo(0.5,0.5);
        this.greenEnemy5.body.velocity.x = 0;
        this.greenEnemy5.body.velocity.y = 0;
        this.greenEnemy5.height = 60;
        this.greenEnemy5.width = 60;
        this.greenEnemy5.color = "green";

        this.greenEnemy5 = this.enemies_Lvl2.create(-1300, 250, 'GreenEnemy');
        this.greenEnemy5.anchor.setTo(0.5,0.5);
        this.greenEnemy5.body.velocity.x = 0;
        this.greenEnemy5.body.velocity.y = 0;
        this.greenEnemy5.height = 60;
        this.greenEnemy5.width = 60;
        this.greenEnemy5.color = "green";

        this.blueEnemy4 = this.enemies_Lvl2.create(this.game.world.width+1250, this.game.world.height/3 * 2, 'BlueEnemy');
        this.blueEnemy4.anchor.setTo(0.5,0.5);
        this.blueEnemy4.body.velocity.x = 0;
        this.blueEnemy4.body.velocity.y = 0;
        this.blueEnemy4.height = 60;
        this.blueEnemy4.width = 60;
        this.blueEnemy4.color = "blue";

        this.blueEnemy5 = this.enemies_Lvl2.create(1000, -1300, 'BlueEnemy');
        this.blueEnemy5.anchor.setTo(0.5,0.5);
        this.blueEnemy5.body.velocity.x = 0;
        this.blueEnemy5.body.velocity.y = 0;
        this.blueEnemy5.height = 60;
        this.blueEnemy5.width = 60;
        this.blueEnemy5.color = "blue";

// Wave 5       

        this.redEnemy5 = this.enemies_Lvl2.create(1400, 1400, 'RedEnemy');
        this.redEnemy5.anchor.setTo(0.5,0.5);
        this.redEnemy5.body.velocity.x = 0;
        this.redEnemy5.body.velocity.y = 0;
        this.redEnemy5.height = 60;
        this.redEnemy5.width = 60;
        this.redEnemy5.color = "red";
*/

    },

    generateEnemyWave: function() {

        var numEnemiesToSpawn = Math.floor(Math.random() * 4) + 2; // Generate 2 to 6 enemies per wave

        for (var i = 0; i < numEnemiesToSpawn; i++) {

            // Generate a random int, either 0 or 1; this number will represent whether the enemy will spawn at the left or right half of the map
            // Note: Math.random returns a decimal number from 0 (inclusive) to 1 (exclusive)
            var mapSide = Math.floor(Math.random() * 2); // 0 is left half, 1 is right half

            // Random int from 0 to 2 inclusive; this number will represent which part of the map half (top, middle, or bottom) the enemy will spawn at
            var mapBorderSection = Math.floor(Math.random() * 3);
            // game.rnd.integerInRange(0, 2); // Note: This does the same thing. game.rnd.integerInRange is useful if you want repeatable results because it already seeds the random number generator

            var xCoord = -300;
            var yCoord = -300;

            switch(mapSide) {
                case 0: // Left half of map
                    switch(mapBorderSection) {
                        case 0: // Top border section
                            // spawn the enemy at a random location on the left side, top border
                            xCoord = Math.random() * this.game.world.width/2.0;                                 // Random x on the left half of map
                            yCoord = -50;                                                                       // Off-screen at the top
                            break;
                        case 1: // Middle border section
                            // spawn the enemy at a random location on the left end of the map
                            xCoord = -50;                                                                       // Off-screen at the left
                            yCoord = Math.random() * this.game.world.height;                                    // Random y
                            break;
                        case 2: // Bottom border section
                            // spawn the enemy at a random location on the left side, bottom border
                            xCoord = Math.random() * this.game.world.width/2.0;                                 // Random x on the left half of map
                            yCoord = this.game.world.height + 50;                                               // Off-screen at the bottom
                            break;
                    }
                    break;
                case 1: // Right half of map; spawn the enemy at a random location on the right border
                    switch(mapBorderSection) {
                        case 0: // Top border section
                            // spawn the enemy at a random location on the right side, top border
                            xCoord = (Math.random() * this.game.world.width/2.0) + this.game.world.width/2.0;   // Random x on the right half of the map
                            yCoord = -50;                                                                       // Off-screen at the top
                            break;
                        case 1: // Middle border section
                            // spawn the enemy at a random location on the right end of the map
                            xCoord = this.game.world.width + 50;                                                // Off-screen at the right
                            yCoord = Math.random() * this.game.world.height;                                    // Random y
                            break;
                        case 2: // Bottom border section
                            // spawn the enemy at a random location on the right side, bottom border
                            xCoord = (Math.random() * this.game.world.width/2.0) + this.game.world.width/2.0;   // Random x at the right half of map
                            yCoord = this.game.world.height + 50;                                               // Off-screen at the bottom
                            break;
                    }
                    break;
            } // end switch(mapSide)
    /*
            switch(mapBorderSection) {
                case 0: // spawn the enemy at a random location on the left side, top border
                    // Note: Math.random returns a decimal number from 0 (inclusive) to 1 (exclusive)
                    xCoord = Math.random() * this.game.world.width/2.0;                                 // Random x on the left half of map
                    yCoord = -50;                                                                       // Off-screen at the top
                    break;
                case 1: // spawn the enemy at a random location on the right side, top border
                    xCoord = (Math.random() * this.game.world.width/2.0) + this.game.world.width/2.0;   // Random x on the right half of the map
                    yCoord = -50;                                                                       // Off-screen at the top
                    break;
                case 2: // spawn the enemy at a random location on the left border
                    xCoord = -50;                                                                       // Off-screen at the left
                    yCoord = Math.random() * this.game.world.height;                                    // Random y
                    break;
                case 3: // spawn the enemy at a random location on the right border
                    xCoord = this.game.world.width + 50;                                                // Off-screen at the right
                    yCoord = Math.random() * this.game.world.height;                                    // Random y
                    break;
                case 4: // spawn the enemy at a random location on the left side, bottom border
                    xCoord = Math.random() * this.game.world.width/2.0;                                 // Random x on the left half of map
                    yCoord = this.game.world.height + 50;                                               // Off-screen at the bottom
                    break;
                case 5: // spawn the enemy at a random location on the right side, bottom border
                    xCoord = (Math.random() * this.game.world.width/2.0) + this.game.world.width/2.0;   // Random x at the right half of map
                    yCoord = this.game.world.height + 50;                                               // Off-screen at the bottom
                    break;
            }
    */
            // Random int from 0 to 3 inclusive; the generated number represents the color that the spawned enemy will be
            var enemyColor = Math.floor(Math.random() * 4);

            switch(enemyColor) {
                case 0: // Enemy will be red
                    this.redEnemy = this.enemies_Lvl2.create(xCoord, yCoord, 'RedEnemy'); // Just spawn it far away for now
                    this.redEnemy.width = 60;
                    this.redEnemy.height = 60;
                    this.redEnemy.anchor.setTo(0.5,0.5);
                    this.redEnemy.color = "red";
                    this.redEnemy.body.velocity.x = 0;
                    this.redEnemy.body.velocity.y = 0;
                    // this.redEnemy.exists = false;
                    // this.redEnemy.visible = false;
                    this.redEnemy.checkWorldBounds = false;
                    break;
                case 1: // Enemy will be yellow
                    this.yellowEnemy = this.enemies_Lvl2.create(xCoord, yCoord, 'YellowEnemy'); // Just spawn it far away for now
                    this.yellowEnemy.width = 60;
                    this.yellowEnemy.height = 60;
                    this.yellowEnemy.anchor.setTo(0.5,0.5);
                    this.yellowEnemy.color = "yellow";
                    this.yellowEnemy.body.velocity.x = 0;
                    this.yellowEnemy.body.velocity.y = 0;
                    // this.yellowEnemy.exists = false;
                    // this.yellowEnemy.visible = false;
                    this.yellowEnemy.checkWorldBounds = false;
                    break;
                case 2: // Enemy will be green
                    this.greenEnemy = this.enemies_Lvl2.create(xCoord, yCoord, 'GreenEnemy'); // Just spawn it far away for now
                    this.greenEnemy.width = 60;
                    this.greenEnemy.height = 60;
                    this.greenEnemy.anchor.setTo(0.5,0.5);
                    this.greenEnemy.color = "green";
                    this.greenEnemy.body.velocity.x = 0;
                    this.greenEnemy.body.velocity.y = 0;
                    // this.greenEnemy.exists = false;
                    // this.greenEnemy.visible = false;
                    this.greenEnemy.checkWorldBounds = false;
                    break;
                case 3: // Enemy will be blue
                    this.blueEnemy = this.enemies_Lvl2.create(xCoord, yCoord, 'BlueEnemy'); // Just spawn it far away for now
                    this.blueEnemy.width = 60;
                    this.blueEnemy.height = 60;
                    this.blueEnemy.anchor.setTo(0.5,0.5);
                    this.blueEnemy.color = "blue";
                    this.blueEnemy.body.velocity.x = 0;
                    this.blueEnemy.body.velocity.y = 0;
                    // this.blueEnemy.exists = false;
                    // this.blueEnemy.visible = false;
                    this.blueEnemy.checkWorldBounds = false;
                    break;
            } // end switch(enemyColor)



        } // end for-loop

    }, // end generateEnemyWave function

// Update enemies positions

    // This func is for sending the enemies' positions to the server, so that the other player sees when they move
    sendEnemiesPos: function(x,y){
        Client.updateEnemiesPos_Lvl2(x,y);
    },

    // This func is for seeing the enemies move
    moveEnemies: function(id,x,y){
        if (GameLvl2.enemyMap[id] != null) {
            GameLvl2.enemyMap[id].x = x;
            GameLvl2.enemyMap[id].y = y;
        }
    },

// Send messages from this player to the other player and receive messages from the other player to this player

    chatButtonClicked: function() {
        var msg = "Hello, other player!";

        // Display the message above yourself
        this.hintsText_Lvl2.text = msg;
        this.hintsText_Lvl2.alpha = 1;

        Client.sendMessageToOtherPlayer_Lvl2(msg);

        if (this.hintsTimer_Lvl2 != null) {
            game.time.events.remove(this.hintsTimer_Lvl2);
        }

        // Clear the text after some time. Note: I defined the callback function right here. Of course
        // I could simply define a separate function entirely and call that, but this works too
        this.hintsTimer_Lvl2 = game.time.events.add(Phaser.Timer.SECOND * 5, () => {
            this.hintsText_Lvl2.text = "";
            this.hintsText_Lvl2.alpha = 0;
        });

        // this.playerSendMessage();
    },

    // Display an incoming message above the player who sent it
    displayReceivedMessage: function(message) {
        console.log(message);
        // GameLvl2.playerMap[id]
        // this.hintsText_Lvl2.text = message;
        // this.hintsText_Lvl2.alpha = 1;
        this.otherPlayerHintsText_Lvl2.text = message;
        this.otherPlayerHintsText_Lvl2.alpha = 1;

        if (this.otherPlayerHintsTimer_Lvl2 != null) {
            game.time.events.remove(this.otherPlayerHintsTimer_Lvl2);
        }

        // Clear the text after some time. Note: I defined the callback function right here. Of course
        // I could simply define a separate function entirely and call that, but this works too
        this.otherPlayerHintsTimer_Lvl2 = game.time.events.add(Phaser.Timer.SECOND * 5, () => {
            this.otherPlayerHintsText_Lvl2.text = "";
            this.otherPlayerHintsText_Lvl2.alpha = 0;
        });
    },

// Add and remove another player (not this client's player) to the game

    // playerSendMessage: function(message) {
    //     Client.sendMessageToOtherPlayer_Lvl2(message);
    // },

    // This func is for adding a new player to the game; they are placed at a specified x and y pos, and are given a unique id,
    // which are stored in the socket object (lines 38-42 of server.js) created when the player connects to the server
    // Tutorial: "This method creates a new sprite at the specified coordinates, and stores the corresponding Sprite object into
    // an associative array declared in Game.create(), with the supplied id as the key. This allows to easily access the sprite
    // corresponding to a specific player, for example when we need to move or remove it"
    // NOTE: if the server is performing socket.broadcast.emit, that means it sends a given message to all sockets *except* the
    // one who called for the message to be sent. If the server is performing io.emit, that means it sends the given message to
    // all sockets.
    addNewPlayer: function(id,x,y,playerSide){
        console.log(`From addNewPlayer in GameLvl2.js... id: ${id}, x: ${x}, y: ${y}, playerSide: ${playerSide}`);
        GameLvl2.playerMap[id] = game.add.sprite(x,y,'player1');
        GameLvl2.playerMap[id].anchor.setTo( 0.5, 0.5 );
        GameLvl2.playerMap[id].width = 75;//50;
        GameLvl2.playerMap[id].height = 75;//50;
        GameLvl2.playerMap[id].playerSide = playerSide;

        var hintsTextStyle = { font: "15px Verdana", fill: "#FFFFFF", align: "center" };
        // Text above the other player
        this.otherPlayerHintsText_Lvl2 = game.add.text( x, y - GameLvl2.playerMap[id].height/2 - 50, 'The other player\'s hints will go here!' , hintsTextStyle);
        this.otherPlayerHintsText_Lvl2.anchor.setTo( 0.5, 0.5 );
        this.otherPlayerHintsText_Lvl2.alpha = 0;
    },

    // This func is for removing a player (with the specified id) from the game. It is called when the Client receives the
    // message from the server that the player disconnected from the game.
    removePlayer: function(id){
        GameLvl2.playerMap[id].destroy();
        delete GameLvl2.playerMap[id];
    },

// Update player motion

    // This func is for sending the player's position to the server, so that the other player sees when they move
    sendPlayerPos: function(x,y){
        Client.updatePlayerPos_Lvl2(x,y);
    },

    // This func is for seeing the other player (with the specified id) move
    movePlayer: function(id,x,y){
        if (GameLvl2.playerMap[id] != null) {
            GameLvl2.playerMap[id].x = x;
            GameLvl2.playerMap[id].y = y;

            this.otherPlayerHintsText_Lvl2.x = x;
            this.otherPlayerHintsText_Lvl2.y = y - GameLvl2.playerMap[id].height/2 - 50;
        }
        // var distance = Phaser.Math.distance(player.x,player.y,x,y);
        // var duration = distance;
        // var tween = game.add.tween(player);
        // tween.to({x:x,y:y}, 1.0);
        // tween.start();
        // player.x = x;
        // player.y = y;
    },

// Update object position

    // Send to server so the other client can see the object changing position
    // Note: This is for when there is a change in the object's position, i.e. it is being carried and moved by a player
    sendObjPosition: function(objName,objPlayer,objColor,positionX,positionY) {
        Client.updateObjPosition_Lvl2(objName,objPlayer,objColor,positionX,positionY);
    },

    // From server; this function executes if the other player executed sendObjPosition
    moveObject_position: function(objName,objPlayer,objColor,positionX,positionY) {

        var listToCheck = null;

        // Rather than search every list, find which list of pieces to search through, based on the object's assigned player and color; this should make things more efficient
        switch (objColor) {
            case "red":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Red_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Red_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
            case "yellow":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Yellow_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Yellow_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
            case "green":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Green_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Green_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
            case "blue":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Blue_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Blue_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
        }

        // Search through the list for the object with the specific name, and set its position accordingly
        // Note: Since the pieces lists are Objects and not simple arrays, the same is true for listToCheck. It has a "children" property,
        // and THAT is a simple array that holds all the members of the group.
        for (var i=0; i<listToCheck.children.length; i++) {
            if (listToCheck.children[i].name === objName) { // Object found

                listToCheck.children[i].x = positionX;
                listToCheck.children[i].y = positionY;
                break;
            }
        }

    },

// Update object motion

    // Send to server so the other client can see the object in motion
    // Note: This is for when there is a change in the object's velocity, i.e. it is thrown by a player
    sendObjMotion: function(objName,objPlayer,objColor,velocityX,velocityY,dragX,dragY) {
        Client.updateObjMotion_Lvl2(objName,objPlayer,objColor,velocityX,velocityY,dragX,dragY);
    },

    // From server; this function executes if the other player executed sendObjMotion
    moveObject_velocity: function(objName,objPlayer,objColor,velocityX,velocityY,dragX,dragY) {

        var listToCheck = null;

        // Rather than search every list, find which list of pieces to search through, based on the object's assigned player and color; this should make things more efficient
        switch (objColor) {
            case "red":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Red_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Red_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
            case "yellow":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Yellow_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Yellow_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
            case "green":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Green_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Green_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
            case "blue":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Blue_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Blue_pieces_Lvl2;
                } else { // Although there was an assigned color, there was no assigned player; it must be one of the ray guns
                    listToCheck = this.rayGuns_Lvl2;
                }
                break;
        }

        // Search through the list for the object with the specific name, and set its velocity and drag accordingly
        // Note: Since the pieces lists are Objects and not simple arrays, the same is true for listToCheck. It has a "children" property,
        // and THAT is a simple array that holds all the members of the group.
        for (var i=0; i<listToCheck.children.length; i++) {
            if (listToCheck.children[i].name === objName) { // Object found

                listToCheck.children[i].body.velocity.setTo(velocityX,velocityY);
                listToCheck.children[i].body.drag.x = dragX;
                listToCheck.children[i].body.drag.y = dragY;
                break;
            }
        }

    },

// Overall game loop

    update: function () {

        if (this.player1_Lvl2 === undefined) {
            return;
        }

        this.gameClock.text = 'Elapsed seconds: ' + Phaser.Math.roundTo(this.game.time.totalElapsedSeconds()-this.timeSoFar,-2);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
      // this.wall.rotation = this.game.physics.arcade.accelerateToPointer( this.wall, this.game.input.activePointer, 500, 500, 500 );

        // this.mouseText.setText("x: "+this.mousePointer.x+"\ny: "+this.mousePointer.y+"\nleftButton.isDown: "+this.mousePointer.leftButton.isDown+"\nrightButton.isDown: "+this.mousePointer.rightButton.isDown);
        // this.mouseText.x = this.mousePointer.x
        // this.mouseText.y = this.mousePointer.y;

        // Players cannot phase through walls
        this.hitWall = this.game.physics.arcade.collide([this.player1_Lvl2/*,this.player2*/], [this.wall,this.wall2,this.leftWall,this.rightWall]);
        this.playerHitGates = this.game.physics.arcade.collide(this.player1_Lvl2, [this.redGate,this.yellowGate,this.greenGate,this.blueGate]);
        this.game.physics.arcade.overlap([this.redBullets,this.yellowBullets,this.greenBullets,this.blueBullets], [this.wall,this.wall2,this.leftWall,this.rightWall,this.redGate,this.yellowGate,this.greenGate,this.blueGate], this.killBullet, null, this);
    //    this.hitShip = this.game.physics.arcade.collide([this.player1_Lvl2,this.player2], [this.p1Ship,this.p2Ship]);
        this.game.physics.arcade.overlap([this.p1Red_pieces_Lvl2, this.p1Yellow_pieces_Lvl2, this.p1Green_pieces_Lvl2, this.p1Blue_pieces_Lvl2, this.p2Red_pieces_Lvl2, this.p2Yellow_pieces_Lvl2, this.p2Green_pieces_Lvl2, this.p2Blue_pieces_Lvl2], [this.p1Ship,this.p2Ship], this.pieceShip, null, this);
        this.game.physics.arcade.collide([this.p1Red_pieces_Lvl2, this.p1Yellow_pieces_Lvl2, this.p1Green_pieces_Lvl2, this.p1Blue_pieces_Lvl2, this.p2Red_pieces_Lvl2, this.p2Yellow_pieces_Lvl2, this.p2Green_pieces_Lvl2, this.p2Blue_pieces_Lvl2], [this.wall,this.wall2,this.leftWall,this.rightWall]);
        this.game.physics.arcade.collide([this.redGun,this.yellowGun,this.greenGun,this.blueGun],[this.wall,this.wall2,this.leftWall,this.rightWall]);

        var isRedPieceColliding = this.game.physics.arcade.collide([this.p1Red_pieces_Lvl2,this.p2Red_pieces_Lvl2],[this.yellowGate,this.greenGate,this.blueGate]);
        var isYellowPieceColliding = this.game.physics.arcade.collide([this.p1Yellow_pieces_Lvl2,this.p2Yellow_pieces_Lvl2],[this.redGate,this.greenGate,this.blueGate]);
        var isGreenPieceColliding = this.game.physics.arcade.collide([this.p1Green_pieces_Lvl2,this.p2Green_pieces_Lvl2],[this.redGate,this.yellowGate,this.blueGate]);
        var isBluePieceColliding = this.game.physics.arcade.collide([this.p1Blue_pieces_Lvl2,this.p2Blue_pieces_Lvl2],[this.redGate,this.yellowGate,this.greenGate]);

        var isRedGunColliding = this.game.physics.arcade.collide(this.redGun,[this.yellowGate,this.greenGate,this.blueGate]);
        var isYellowGunColliding = this.game.physics.arcade.collide(this.yellowGun,[this.redGate,this.greenGate,this.blueGate]);
        var isGreenGunColliding = this.game.physics.arcade.collide(this.greenGun,[this.redGate,this.yellowGate,this.blueGate]);
        var isBlueGunColliding = this.game.physics.arcade.collide(this.blueGun,[this.redGate,this.yellowGate,this.greenGate]);

/*        
        var isRedPieceOverlapping = this.game.physics.arcade.overlap([this.p1Red_pieces_Lvl2,this.p2Red_pieces_Lvl2],[this.yellowGate,this.greenGate,this.blueGate]);
        var isYellowPieceOverlapping = this.game.physics.arcade.overlap([this.p1Yellow_pieces_Lvl2,this.p2Yellow_pieces_Lvl2],[this.redGate,this.greenGate,this.blueGate]);
        var isGreenPieceOverlapping = this.game.physics.arcade.overlap([this.p1Green_pieces_Lvl2,this.p2Green_pieces_Lvl2],[this.redGate,this.yellowGate,this.blueGate]);
        var isBluePieceOverlapping = this.game.physics.arcade.overlap([this.p1Blue_pieces_Lvl2,this.p2Blue_pieces_Lvl2],[this.redGate,this.yellowGate,this.greenGate]);
*/
        // if (this.redBullet != null) {
     //     this.game.physics.arcade.collide(this.redBullet, this.redEnemy1);
        // }
        if (this.game.time.now > this.enemySpawnCooldown) { // Spawn a new wave of enemies after a certain cooldown period
            this.enemySpawnCooldown += 15000; // Cooldown is 15 seconds
            this.generateEnemyWave();
        }
        // this.game.physics.arcade.overlap(this.enemies_Lvl2, this.bullets, this.killEnemy, null, this);
        this.game.physics.arcade.overlap([this.redBullets,this.yellowBullets,this.greenBullets,this.blueBullets],this.enemies_Lvl2,this.killEnemy,null,this);
                // game.physics.arcade.overlap(bullets, enemies, enemyKill, null, this);
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.eachEnemy, this);
        // this.enemies_Lvl2.forEach(this.chasePlayer, this, null);
        this.game.physics.arcade.overlap(this.enemies_Lvl2, [this.player1_Lvl2/*,this.player2*/], this.killPlayer, null, this);
 //     this.game.physics.arcade.moveToObject(this.redEnemy1, this.player1_Lvl2, 25);

        this.hintsText_Lvl2.x = this.player1_Lvl2.x;
        this.hintsText_Lvl2.y = this.player1_Lvl2.y - this.player1_Lvl2.body.height/2 - 50;

        // this.hintsText_Lvl22.x = this.player1_Lvl2.x;
        // this.hintsText_Lvl22.y = this.player1_Lvl2.y + this.player1_Lvl2.body.height/2 + 50;

        // Items can only pass through same-colored gates. This is done by accessing and checking the item's color property, which was set at
        // creation, and then having the item collide with all gates except for the same-colored gate. currItemTemp is used instead of currItem
        // so that the collision checking still continues for the curr item even after it is released and a new item is picked up.
/*        if (this.p1currItemTemp != null) {
            if (this.p1currItemTemp.color == "red") {
                this.hitGate1 = this.game.physics.arcade.collide(this.p1currItemTemp, [this.yellowGate,this.greenGate,this.blueGate]);
            }
            else if (this.p1currItemTemp.color == "yellow") {
                this.hitGate1 = this.game.physics.arcade.collide(this.p1currItemTemp, [this.redGate,this.greenGate,this.blueGate]);
            }
            else if (this.p1currItemTemp.color == "green") {
                this.hitGate1 = this.game.physics.arcade.collide(this.p1currItemTemp, [this.redGate,this.yellowGate,this.blueGate]);
            }
            else if (this.p1currItemTemp.color == "blue") {
                this.hitGate1 = this.game.physics.arcade.collide(this.p1currItemTemp, [this.redGate,this.yellowGate,this.greenGate]);
            }
        }
        if (this.p2currItemTemp != null) {
            if (this.p2currItemTemp.color == "red") {
                this.hitGate2 = this.game.physics.arcade.collide(this.p2currItemTemp, [this.yellowGate,this.greenGate,this.blueGate]);
            }
            else if (this.p2currItemTemp.color == "yellow") {
                this.hitGate2 = this.game.physics.arcade.collide(this.p2currItemTemp, [this.redGate,this.greenGate,this.blueGate]);
            }
            else if (this.p2currItemTemp.color == "green") {
                this.hitGate2 = this.game.physics.arcade.collide(this.p2currItemTemp, [this.redGate,this.yellowGate,this.blueGate]);
            }
            else if (this.p2currItemTemp.color == "blue") {
                this.hitGate2 = this.game.physics.arcade.collide(this.p2currItemTemp, [this.redGate,this.yellowGate,this.greenGate]);
            }
        }
*/
    //    this.takePieces = this.game.physics.arcade.overlap([this.player1_Lvl2,this.player2], this.p1Blue, this.takeItem, null, this);
        // this.game.physics.arcade.overlap(this.player, this.door, this.notFinished, null, this);
        // Only executes takeItem when the player is holding nothing (has nothing in their possession)
        if (this.p1Possess != true) {
            this.game.physics.arcade.overlap(this.player1_Lvl2, [this.p1Red_pieces_Lvl2, this.p1Yellow_pieces_Lvl2, this.p1Green_pieces_Lvl2, this.p1Blue_pieces_Lvl2, this.p2Red_pieces_Lvl2, this.p2Yellow_pieces_Lvl2, this.p2Green_pieces_Lvl2, this.p2Blue_pieces_Lvl2], this.takeItem, null, this);
            this.game.physics.arcade.overlap(this.player1_Lvl2, this.rayGuns_Lvl2, this.takeItem, null, this);

            // this.hintsText_Lvl2.text = "";
            // this.hintsText_Lvl2.alpha = 0;

            // this.hintsText_Lvl22.text = "";
            // this.hintsText_Lvl22.alpha = 0;
        }    
        // Quick Maths!!!

        // Gets the distance to the mouse pointer in both x and y directions
        this.xDistToMousePointer = this.mousePointer.x - this.player1_Lvl2.x; // x direction vector towards the mouse pointer
        this.yDistToMousePointer = this.mousePointer.y - this.player1_Lvl2.y; // y direction vector towards the mouse pointer

        // Uses the x and y directions--which create 2 sides of a 90 degree triangle--to get the 3 side, the hypotenuse,
        // of the triangle. This hypotenuse is the actual distance to the mouse pointer.
        this.distToMousePointer = Math.sqrt(Math.pow(this.xDistToMousePointer,2.0) + Math.pow(this.yDistToMousePointer,2.0)); // c = root(a^2 + b^2)

        // Divide both x and y directions by the distance in order to normalize them (yeah, I remembered how to do that myself)
        this.xDistToMousePointer_norm = this.xDistToMousePointer/this.distToMousePointer; // Normalize both of the
        this.yDistToMousePointer_norm = this.yDistToMousePointer/this.distToMousePointer; // x and y direction vectors

        // If the player is holding an item, the item must move in sync with the player,
        // so the item's velocity is constanly updated to equal the velocity of the player.
        if ((this.p1Possess == true) && (this.itemThrowIsInitiated != true)) {

            // Calculate the distance the item should be from the player
            this.itemXPos = ((this.player1_Lvl2.width + 0) * this.xDistToMousePointer_norm);
            this.itemYPos = ((this.player1_Lvl2.width + 0) * this.yDistToMousePointer_norm);

            // Finally, put the item at the proper spot, using the player's current position.
            this.p1currItem.x = this.player1_Lvl2.x + this.itemXPos;
            this.p1currItem.y = this.player1_Lvl2.y + this.itemYPos;

            // Set the velocity of the item equal to the velocity of the player, so that it moves with the player
            this.p1currItem.body.velocity.x = this.player1_Lvl2.body.velocity.x;
            this.p1currItem.body.velocity.y = this.player1_Lvl2.body.velocity.y;

            this.sendObjPosition(this.p1currItem.name, this.p1currItem.player, this.p1currItem.color, this.p1currItem.x, this.p1currItem.y);

            // // Adjust the hint to show relevant item info
            // this.hintsText_Lvl2.text = "I've picked up a "+this.p1currItem.color+" item!\nI can throw this through a "+this.p1currItem.color+" gate!";
            // this.hintsText_Lvl2.y -= 10; // This particular message is 2 lines, so we should move it up a little
            // this.hintsText_Lvl2.alpha = 1;


            // Determine what type of item the player is holding
            var itemType = "ray gun";
            if (this.p1currItem.player != null) { // Ray guns don't have assigned players, but ship pieces do. This check will determine if the player is holding a ray gun.
                if (this.p1currItem.player == "p1") {
                    itemType = "P1 ship piece";
                } else { // this.p1currItem.player1 == "p2"
                    itemType = "P2 ship piece";
                }
            }

            // this.hintsText_Lvl22.text = "Current item: "+this.p1currItem.color+" "+itemType;
            // this.hintsText_Lvl22.alpha = 1;
        }

        // These are the directional buttons for Player 1 (W,S,A,D) and what they do.
        // If P1 is in possession of an item and that item isn't null, the item's velocity and position
        // are constantly updated to be equal to P1's velocity and position (to simulate the item following P1)

        this.player1_Lvl2.body.velocity.set(0);
/*
        var currPlayerPos = this.player1_Lvl2.body.position;
        // Movement will be affected by the terrain, generated by Perlin noise
        var cellIndex = Math.abs(Math.round((this.player1_Lvl2.body.position.x + (this.player1_Lvl2.body.position.y * this.game.world.width)) * 4));
        if (cellIndex < 0) {
            cellIndex = (this.planetSurfaceData.length%cellIndex) + this.planetSurfaceData.length;
            // var currPerlinVal = (this.planetSurfaceData[this.planetSurfaceData.length-4] + this.planetSurfaceData[this.planetSurfaceData.length-3] + this.planetSurfaceData[this.planetSurfaceData.length-2])/3;
        }
        else if (cellIndex > this.planetSurfaceData.length) {
            cellIndex = this.planetSurfaceData.length - (this.planetSurfaceData.length%cellIndex);
            // var currPerlinVal = (this.planetSurfaceData[this.planetSurfaceData.length-4] + this.planetSurfaceData[this.planetSurfaceData.length-3] + this.planetSurfaceData[this.planetSurfaceData.length-2])/3;
        }
        var currPerlinVal = (this.planetSurfaceData[cellIndex] + this.planetSurfaceData[cellIndex + 1] + this.planetSurfaceData[cellIndex + 2])/3;
*/
        if (this.aKey.isDown) {
            this.player1_Lvl2.body.velocity.x = -10 - 200;//*(currPerlinVal / 255.0); // Move left; currPerlinVal will be a value from 0 to 255
            // if ((this.p1Possess == true) && (this.p1currItem != null)) {
            //     // this.p1currItem.x = this.player1_Lvl2.x-this.player1_Lvl2.width/1.25;
            //     // this.p1currItem.y = this.player1_Lvl2.y;
            //     // this.p1currItem.pos = "left";
            //     // this.p1currItem.position.setTo(this.player1_Lvl2.x-this.player1_Lvl2.width/1.25,this.player1_Lvl2.y);    ...This works too, it's just less readable
            // }
        }
        if (this.dKey.isDown) {
            this.player1_Lvl2.body.velocity.x = 10 + 200;//*(currPerlinVal / 255.0); // Move right; currPerlinVal will be a value from 0 to 255
            // if ((this.p1Possess == true) && (this.p1currItem != null)) {
            //     // this.p1currItem.x = this.player1_Lvl2.x+this.player1_Lvl2.width/1.25;
            //     // this.p1currItem.y = this.player1_Lvl2.y;
            //     // this.p1currItem.pos = "right";
            // }
        }
        if (this.wKey.isDown) {
            this.player1_Lvl2.body.velocity.y = -10 - 200;//*(currPerlinVal / 255.0); // Move up; currPerlinVal will be a value from 0 to 255
            // if ((this.p1Possess == true) && (this.p1currItem != null)) {
            //     // this.p1currItem.x = this.player1_Lvl2.x;
            //     // this.p1currItem.y = this.player1_Lvl2.y-this.player1_Lvl2.height/1.25;
            //     // this.p1currItem.pos = "up";
            // }
        }
        if (this.sKey.isDown) {
            this.player1_Lvl2.body.velocity.y = 10 + 200;//*(currPerlinVal / 255.0); // Move down; currPerlinVal will be a value from 0 to 255
            // if ((this.p1Possess == true) && (this.p1currItem != null)) {
            //     // this.p1currItem.x = this.player1_Lvl2.x;
            //     // this.p1currItem.y = this.player1_Lvl2.y+this.player1_Lvl2.height/1.25;
            //     // this.p1currItem.pos = "down";
            // }
        }

        // If P1 has possession of an item and the 1 key is pressed, the item is
        // thrown in the direction that the item is facing (as tracked before).
        // Notice that an initial velocity is set in the corresponding direction...

        // Sometimes, the item held by the player can be within an obstacle because a player is right next to the obstacle and the item has no choice
        // but to go to the position that is assigned to it and that position happens to be within the obstacle. So, we should check for overlap.
        
        if ( this.mousePointer.rightButton.isDown /*&& (this.hitGate1 != true)*/ && (this.p1currItem != null) && (this.itemThrowIsInitiated != true)) {

            this.throwItem();

        }

        // ...and when the 1 key is pressed, the item is thrown and its velocity gradually decreases because of an opposite acceleration that is added,
        // causing the item to slow down. The thrown object moves for 2 seconds before coming to a complete stop, as performed by calling the stopMovement function,
        // which takes p1currItemTemp as its argument. p1currItemTemp is a variable that stores a copy of p1currItem, allowing the original item stored in
        // p1currItem to be manipulated even after p1currItem changes, which happens when the player throws the original p1currItem and picks up another item.

        // if ((this.oneKey.isDown) && (this.hitGate1 != true) && (this.p1currItem != null) && (this.keyIsPressed1 != true)) { // Checks if object to throw exists and if throw button has been pressed
        //     if (this.p1currItem.body.velocity.x > 0) {
        //         this.p1currItem.body.acceleration.setTo(-100,0);
        //         this.p1currItemTemp = this.p1currItem;
        //         this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
        //     }
        //     else if (this.p1currItem.body.velocity.x < 0) {
        //         this.p1currItem.body.acceleration.setTo(100,0);
        //         this.p1currItemTemp = this.p1currItem;
        //         this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
        //     }
        //     else if (this.p1currItem.body.velocity.y > 0) {
        //         this.p1currItem.body.acceleration.setTo(0,-100);
        //         this.p1currItemTemp = this.p1currItem;
        //         this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
        //     }
        //     else if (this.p1currItem.body.velocity.y < 0) {
        //         this.p1currItem.body.acceleration.setTo(0,100);
        //         this.p1currItemTemp = this.p1currItem;
        //         this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
        //     }
        //     this.keyIsPressed1 = true;
        // }        

//             this.p1currItem.body.velocity.setTo(this.velocityX1,this.velocityY1);
//             if (this.velocityX1 > 0) {
//                 this.velocityX1 -= this.slowDownValue1;
//             }
//             else if (this.velocityX1 < 0) {
//                 this.velocityX1 += this.slowDownValue1;
//             }
//             else if (this.velocityY1 > 0) {
//                 this.velocityY1 -= this.slowDownValue1;
//             }
//             else if (this.velocityY1 < 0) {
//                 this.velocityY1 += this.slowDownValue1;
//             }
//             else if ((this.velocityX1 + this.velocityY1) == 0) {
//                 // this.slowDownValue2 = 0;
//             //  this.p2Possess = false;
// //                this.p1currItem = null;
//                 this.keyIsPressed1 = false;
//             }
            // if ((this.velocityX1 + this.velocityY1) == 0) {
            // //     this.slowDownValue1 = 0;
            //     this.p1currItem = null;
            // }
            // if (((this.velocityX1 + this.velocityY1) > -100) && ((this.velocityX1 + this.velocityY1) < 100)) {
            // //     this.slowDownValue2 = 0;
            //     this.velocityX1 = 0;
            //     this.velocityY1 = 0;
            //     this.p1currItem = null;
            // }

        // }
/*
        this.player2.body.velocity.set(0);

        // These are the directional buttons for Player 2 (up,down,left,right) and what they do.
        // If P2 is in possession of an item and that item isn't null, the item's velocity and position
        // are constantly updated to be equal to P2's velocity and position (to simulate the item following P2)

        var currPlayerPos2 = this.player2.body.position;
        // Movement will be affected by the terrain, generated by Perlin noise
        var cellIndex2 = Math.abs(Math.round((this.player2.body.position.x + (this.player2.body.position.y * this.game.world.width)) * 4));
        if (cellIndex2 < 0) {
            cellIndex2 = (this.planetSurfaceData.length%cellIndex2) + this.planetSurfaceData.length;
            // var currPerlinVal = (this.planetSurfaceData[this.planetSurfaceData.length-4] + this.planetSurfaceData[this.planetSurfaceData.length-3] + this.planetSurfaceData[this.planetSurfaceData.length-2])/3;
        }
        else if (cellIndex2 > this.planetSurfaceData.length) {
            cellIndex2 = this.planetSurfaceData.length - (this.planetSurfaceData.length%cellIndex2);
            // var currPerlinVal = (this.planetSurfaceData[this.planetSurfaceData.length-4] + this.planetSurfaceData[this.planetSurfaceData.length-3] + this.planetSurfaceData[this.planetSurfaceData.length-2])/3;
        }
        var currPerlinVal2 = (this.planetSurfaceData[cellIndex2] + this.planetSurfaceData[cellIndex2 + 1] + this.planetSurfaceData[cellIndex2 + 2])/3;

        if (this.cursors.left.isDown) {
            this.player2.body.velocity.x = -10 - 200*(currPerlinVal2 / 255.0); // Move left; currPerlinVal will be a value from 0 to 255
            // this.player2.body.velocity.x = -200; // Move left
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                this.p2currItem.x = this.player2.x-this.player2.width/1.25;
                this.p2currItem.y = this.player2.y;
                this.p2currItem.pos = "left";
                // this.p1currItem.position.setTo(this.player1_Lvl2.x-this.player1_Lvl2.width/1.25,this.player1_Lvl2.y);    ...This works too, it's just less readable
            }
        }
        if (this.cursors.right.isDown) {
            this.player2.body.velocity.x = 10 + 200*(currPerlinVal2 / 255.0); // Move right; currPerlinVal will be a value from 0 to 255
            // this.player2.body.velocity.x = 200; // Move right
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                this.p2currItem.x = this.player2.x+this.player2.width/1.25;
                this.p2currItem.y = this.player2.y;
                this.p2currItem.pos = "right";
            }
        }
        if (this.cursors.up.isDown) {
            this.player2.body.velocity.y = -10 - 200*(currPerlinVal2 / 255.0); // Move up; currPerlinVal will be a value from 0 to 255
            // this.player2.body.velocity.y = -200; // Move up
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                this.p2currItem.x = this.player2.x;
                this.p2currItem.y = this.player2.y-this.player2.height/1.25;
                this.p2currItem.pos = "up";
            }
        }
        if (this.cursors.down.isDown) {
            this.player2.body.velocity.y = 10 + 200*(currPerlinVal2 / 255.0); // Move down; currPerlinVal will be a value from 0 to 255
            // this.player2.body.velocity.y = 200; // Move down
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                this.p2currItem.x = this.player2.x;
                this.p2currItem.y = this.player2.y+this.player2.height/1.25;
                this.p2currItem.pos = "down";
            }
        }

        // If P2 has possession of an item and the K key is pressed, the item is
        // thrown in the direction that the item is facing (as tracked before).
        // Notice that an initial velocity is set in the corresponding direction...

        if ((this.hKey.isDown) && (this.hitGate2 != true) && (this.p2currItem != null) && (this.keyIsPressed2 != true)) {
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                if (this.p2currItem.pos == "left") {
                    // this.p1currItem.body.velocity.setTo(-100,0);
                // moveToXY(displayObject, x, y, speed, maxTime)
                    this.velocityX2 = -200;
                    this.velocityY2 = 0;
                }
                if (this.p2currItem.pos == "right") {
                    // this.p1currItem.body.velocity.setTo(100,0);
                    this.velocityX2 = 200;
                    this.velocityY2 = 0;
                }
                if (this.p2currItem.pos == "up") {
                    // this.p1currItem.body.velocity.setTo(0,-100);
                    this.velocityX2 = 0;
                    this.velocityY2 = -200;
                }
                if (this.p2currItem.pos == "down") {
                    // this.p1currItem.body.velocity.setTo(0,100);
                    this.velocityX2 = 0;
                    this.velocityY2 = 200;
                }
                this.p2currItem.body.velocity.setTo(this.velocityX2,this.velocityY2);
                this.p2Possess = false;
            }
            // this.slowDownValue2 = 2;
            // this.keyIsPressed2 = true; // Sets throw button as pressed
        }

        // ...and when the K key is pressed, the item is thrown and its velocity gradually decreases because of an opposite acceleration that is added,
        // causing the item to slow down. The thrown object moves for 2 seconds before coming to a complete stop, as performed by calling the stopMovement function,
        // which takes p2currItemTemp as its argument. p2currItemTemp is a variable that stores a copy of p2currItem, allowing the original item stored in
        // p2currItem to be manipulated even after p2currItem changes, which happens when the player throws the original p1currItem and picks up another item.


        if ((this.hKey.isDown) && (this.hitGate2 != true) && (this.p2currItem != null) && (this.keyIsPressed2 != true)) { // Checks if object to throw exists and if throw button has been pressed
            // if (this.slowDownValue2 != 0) {
         //    if ((this.done == true) || (this.p2currItemTemp == null)) {
         //     this.p2currItemTemp = this.p2currItem;
            // }
            // if (this.p2currItemTemp != null) {
                // this.p2currItem.body.velocity.setTo(this.velocityX2,this.velocityY2);
            // }
            // }
            // this.done = false;
            if (this.p2currItem.body.velocity.x > 0) {
                // this.velocityX2 -= this.slowDownValue2;
                this.p2currItem.body.acceleration.setTo(-100,0);
                // Phaser.TimerEvent(Phaser.Timer, 3000, 3000, 0, 0, this.p2currItem.body.acceleration.setTo(0,0), this);
                this.p2currItemTemp = this.p2currItem;
                this.throwTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p2currItemTemp);
            }
            else if (this.p2currItem.body.velocity.x < 0) {
                // this.velocityX2 += this.slowDownValue2;
                this.p2currItem.body.acceleration.setTo(100,0);
                // Phaser.TimerEvent(Phaser.Timer, 3000, 3000, 0, 0, this.p2currItem.body.acceleration.setTo(0,0), this);
                this.p2currItemTemp = this.p2currItem;
                this.throwTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p2currItemTemp);
            }
            else if (this.p2currItem.body.velocity.y > 0) {
                // this.velocityY2 -= this.slowDownValue2;
                this.p2currItem.body.acceleration.setTo(0,-100);
                // Phaser.TimerEvent(Phaser.Timer, 3000, 3000, 0, 0, this.p2currItem.body.acceleration.setTo(0,0), this);
                this.p2currItemTemp = this.p2currItem;
                this.throwTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p2currItemTemp);
            }
            else if (this.p2currItem.body.velocity.y < 0) {
                // this.velocityY2 += this.slowDownValue2;
                this.p2currItem.body.acceleration.setTo(0,100);
                // Phaser.TimerEvent(Phaser.Timer, 3000, 3000, 0, 0, this.p2currItem.body.acceleration.setTo(0,0), this);
                this.p2currItemTemp = this.p2currItem;
                this.throwTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p2currItemTemp);
            }
            // else if ((this.velocityX2 + this.velocityY2) == 0) {
                // this.slowDownValue2 = 0;
            //  this.p2Possess = false;
//                this.p2currItem = null;
                this.keyIsPressed2 = true;
                // this.done = true;
            // }
            // if (((this.velocityX2 + this.velocityY2) > -100) && ((this.velocityX2 + this.velocityY2) < 100)) {
            // //     this.slowDownValue2 = 0;
            //     this.velocityX2 = 0;
            //     this.velocityY2 = 0;
            //     this.p2currItem = null;
            // }
        }
*/
        // if (this.p1currItem in this.rayGuns_Lvl2.children) {
        if ((this.p1currItem != null) && this.mousePointer.leftButton.isDown /*(this.twoKey.isDown)*//* && (this.itemThrowIsInitiated != true) */&& (this.p1Possess == true)) {
            
            // switch (this.p1currItem.color) {
            //     case "red":
            //         this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Red_pieces_Lvl2,this.p2Red_pieces_Lvl2]*/,[this.yellowGate,this.greenGate,this.blueGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
            //         break;
            //     case "yellow":
            //         this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Yellow_pieces_Lvl2,this.p2Yellow_pieces_Lvl2]*/,[this.redGate,this.greenGate,this.blueGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
            //         break;
            //     case "green":
            //         this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Green_pieces_Lvl2,this.p2Green_pieces_Lvl2]*/,[this.redGate,this.yellowGate,this.blueGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
            //         break;
            //     case "blue":
            //         this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Blue_pieces_Lvl2,this.p2Blue_pieces_Lvl2]*/,[this.redGate,this.yellowGate,this.greenGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
            //         break;
            // }

            this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Blue_pieces_Lvl2,this.p2Blue_pieces_Lvl2]*/,[this.redGate,this.yellowGate,this.greenGate,this.blueGate,this.wall,this.wall2,this.leftWall,this.rightWall]);

            if (this.p1currItem == this.redGun) {
                if (this.game.time.now > this.redBulletTime) {
                    // this.redBullet = this.redBullets.getFirstExists(false);

                    // this.redBullet.anchor.setTo(0.5,0.5);
                 //    this.redBullet.width = 10;
                 //     this.redBullet.height = 10;
                 //     this.redBullet.color = "red";
                    // this.game.physics.enable( this.redBullet, Phaser.Physics.ARCADE );
                    // this.redBullet.body.onOverlap = new Phaser.Signal();
                    // this.redBullet.body.onOverlap.add(this.killEnemy, this);

                    // this.redBullet.reset(this.player1_Lvl2.x, this.player1_Lvl2.y);
                    
                    // switch (this.p1currItem.pos) {
                        // Calculate the distance the item should be from the player
                        this.bulletXPos = (this.player1_Lvl2.width + this.p1currItem.width*0.7) * this.xDistToMousePointer_norm;
                        this.bulletYPos = (this.player1_Lvl2.height + this.p1currItem.height*0.7) * this.yDistToMousePointer_norm;

                        // Put the bullet at the proper spot, using the player's current position.
                        var finalBulletXPos = this.player1_Lvl2.x + this.bulletXPos;
                        var finalbulletYPos = this.player1_Lvl2.y + this.bulletYPos;

                        // Determine the bullet velocity
                        this.bulletXVel = this.xDistToMousePointer_norm*this.baseVelocityVal*2
                        this.bulletYVel = this.yDistToMousePointer_norm*this.baseVelocityVal*2;

                        // If there are no overlaps with any obstacles, we are all set to fire
                        if (this.isCurrItemOverlapping == false) {
                            this.fireBullet(this.redBullet,finalBulletXPos,finalbulletYPos,this.bulletXVel,this.bulletYVel);
                        }

                        // case "right":
                        //  // this.redBullet.body.velocity.x = 300;
                        //  this.fireBullet(this.redBullet,this.player1_Lvl2,300,0);
                        //  break;
                        // case "left":
                        //  // this.redBullet.body.velocity.x = -300;
                        //  this.fireBullet(this.redBullet,this.player1_Lvl2,-300,0);
                        //  break;
                        // case "up":
                        //  // this.redBullet.body.velocity.y = -300;
                        //  this.fireBullet(this.redBullet,this.player1_Lvl2,0,-300);
                        //  break;
                        // case "down":
                        //  // this.redBullet.body.velocity.y = 300;
                        //  this.fireBullet(this.redBullet,this.player1_Lvl2,0,300);
                        //  break;
                    // }
                    // this.redBullet.events.onOutOfBounds.add(this.killBullet, this);
                    this.redBulletTime = this.game.time.now + 300;
                }
            }
            else if (this.p1currItem == this.yellowGun) {
                if (this.game.time.now > this.yellowBulletTime) {

                    // Calculate the distance the item should be from the player
                    this.bulletXPos = (this.player1_Lvl2.width + this.p1currItem.width*0.7) * this.xDistToMousePointer_norm;
                    this.bulletYPos = (this.player1_Lvl2.height + this.p1currItem.height*0.7) * this.yDistToMousePointer_norm;

                    // Put the bullet at the proper spot, using the player's current position.
                    var finalBulletXPos = this.player1_Lvl2.x + this.bulletXPos;
                    var finalbulletYPos = this.player1_Lvl2.y + this.bulletYPos;

                    // Determine the bullet velocity
                    this.bulletXVel = this.xDistToMousePointer_norm*this.baseVelocityVal*2
                    this.bulletYVel = this.yDistToMousePointer_norm*this.baseVelocityVal*2;

                    // If there are no overlaps with any obstacles, we are all set to fire
                    if (this.isCurrItemOverlapping == false) {
                        this.fireBullet(this.yellowBullet,finalBulletXPos,finalbulletYPos,this.bulletXVel,this.bulletYVel);
                    }

                    // switch (this.p1currItem.pos) {
                    //  case "right":
                    //      this.fireBullet(this.yellowBullet,this.player1_Lvl2,300,0);
                    //      break;
                    //  case "left":
                    //      this.fireBullet(this.yellowBullet,this.player1_Lvl2,-300,0);
                    //      break;
                    //  case "up":
                    //      this.fireBullet(this.yellowBullet,this.player1_Lvl2,0,-300);
                    //      break;
                    //  case "down":
                    //      this.fireBullet(this.yellowBullet,this.player1_Lvl2,0,300);
                    //      break;
                    // }
                    this.yellowBulletTime = this.game.time.now + 300;
                }
            }
            else if (this.p1currItem == this.greenGun) {
                if (this.game.time.now > this.greenBulletTime) {

                    // Calculate the distance the item should be from the player
                    this.bulletXPos = (this.player1_Lvl2.width + this.p1currItem.width*0.7) * this.xDistToMousePointer_norm;
                    this.bulletYPos = (this.player1_Lvl2.height + this.p1currItem.height*0.7) * this.yDistToMousePointer_norm;

                    // Put the bullet at the proper spot, using the player's current position.
                    var finalBulletXPos = this.player1_Lvl2.x + this.bulletXPos;
                    var finalbulletYPos = this.player1_Lvl2.y + this.bulletYPos;

                    // Determine the bullet velocity
                    this.bulletXVel = this.xDistToMousePointer_norm*this.baseVelocityVal*2
                    this.bulletYVel = this.yDistToMousePointer_norm*this.baseVelocityVal*2;

                    // If there are no overlaps with any obstacles, we are all set to fire
                    if (this.isCurrItemOverlapping == false) {
                        this.fireBullet(this.greenBullet,finalBulletXPos,finalbulletYPos,this.bulletXVel,this.bulletYVel);
                    }

                    // switch (this.p1currItem.pos) {
                    //  case "right":
                    //      this.fireBullet(this.greenBullet,this.player1_Lvl2,300,0);
                    //      break;
                    //  case "left":
                    //      this.fireBullet(this.greenBullet,this.player1_Lvl2,-300,0);
                    //      break;
                    //  case "up":
                    //      this.fireBullet(this.greenBullet,this.player1_Lvl2,0,-300);
                    //      break;
                    //  case "down":
                    //      this.fireBullet(this.greenBullet,this.player1_Lvl2,0,300);
                    //      break;
                    // }
                    this.greenBulletTime = this.game.time.now + 300;
                }
            }
            else if (this.p1currItem == this.blueGun) {
                if (this.game.time.now > this.blueBulletTime) {
                    
                    // Calculate the distance the item should be from the player
                    this.bulletXPos = (this.player1_Lvl2.width + this.p1currItem.width*0.7) * this.xDistToMousePointer_norm;
                    this.bulletYPos = (this.player1_Lvl2.height + this.p1currItem.height*0.7) * this.yDistToMousePointer_norm;

                    // Put the bullet at the proper spot, using the player's current position.
                    var finalBulletXPos = this.player1_Lvl2.x + this.bulletXPos;
                    var finalbulletYPos = this.player1_Lvl2.y + this.bulletYPos;

                    // Determine the bullet velocity
                    this.bulletXVel = this.xDistToMousePointer_norm*this.baseVelocityVal*2
                    this.bulletYVel = this.yDistToMousePointer_norm*this.baseVelocityVal*2;

                    // If there are no overlaps with any obstacles, we are all set to fire
                    if (this.isCurrItemOverlapping == false) {
                        this.fireBullet(this.blueBullet,finalBulletXPos,finalbulletYPos,this.bulletXVel,this.bulletYVel);
                    }

                    // switch (this.p1currItem.pos) {
                    //  case "right":
                    //      this.fireBullet(this.blueBullet,this.player1_Lvl2,300,0);
                    //      break;
                    //  case "left":
                    //      this.fireBullet(this.blueBullet,this.player1_Lvl2,-300,0);
                    //      break;
                    //  case "up":
                    //      this.fireBullet(this.blueBullet,this.player1_Lvl2,0,-300);
                    //      break;
                    //  case "down":
                    //      this.fireBullet(this.blueBullet,this.player1_Lvl2,0,300);
                    //      break;
                    // }
                    this.blueBulletTime = this.game.time.now + 300;
                }
            }
            else { // The current item is not a ray gun, i.e. if ((this.p1currItem != this.redGun) && (this.p1currItem != this.yellowGun) && (this.p1currItem != this.greenGun) && (this.p1currItem != this.blueGun)) {
                if ( (this.p1currItem != null) && (this.itemThrowIsInitiated != true)) {

                    this.throwItem();

                }
            }

        }

        // Send the player position to the server
        this.sendPlayerPos(this.player1_Lvl2.x,this.player1_Lvl2.y);

    },

    // slowDownObject: function () {

    //     // this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItem);

    //     // this.newTimer = new Phaser.TimerEvent(this.throwTimer1, 0, tick, repeatCount, true, slowDownObject, this, arguments);

    //     // slowDownValueX and slowDownValueY will be positive, and they will be added or subtracted to the item's current velocity to slow the item down
    //     var newVelX = 0;
    //     if (this.p1currItem.body.velocity.x < 0) {
    //         newVelX = this.p1currItem.body.velocity.x + 100;
    //     } else if (this.p1currItem.body.velocity.x > 0) {
    //         newVelX = this.p1currItem.body.velocity.x - 100;
    //     }
    //     var newVelY = 0;
    //     if (this.p1currItem.body.velocity.y < 0) {
    //         newVelY = this.p1currItem.body.velocity.y + 100;
    //     } else if (this.p1currItem.body.velocity.y > 0) {
    //         newVelY = this.p1currItem.body.velocity.y - 100;
    //     }

    //     this.p1currItem.body.velocity.setTo(newVelX,newVelY);

    // },

    // resetPlayerPossession: function (player) {
    //     this.p1Possess = false;
    // },

    throwItem: function () {

        this.isCurrItemOverlapping = false;

        switch (this.p1currItem.color) {
            case "red":
                this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Red_pieces_Lvl2,this.p2Red_pieces_Lvl2]*/,[this.yellowGate,this.greenGate,this.blueGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
                break;
            case "yellow":
                this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Yellow_pieces_Lvl2,this.p2Yellow_pieces_Lvl2]*/,[this.redGate,this.greenGate,this.blueGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
                break;
            case "green":
                this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Green_pieces_Lvl2,this.p2Green_pieces_Lvl2]*/,[this.redGate,this.yellowGate,this.blueGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
                break;
            case "blue":
                this.isCurrItemOverlapping = this.game.physics.arcade.overlap(this.p1currItem /*[this.p1Blue_pieces_Lvl2,this.p2Blue_pieces_Lvl2]*/,[this.redGate,this.yellowGate,this.greenGate,this.wall,this.wall2,this.leftWall,this.rightWall]);
                break;
        }

        // this.baseVelocityVal = 200;
        if ((this.p1Possess == true) && (this.isCurrItemOverlapping == false) /*&& (this.p1currItem != null)*/) {
            // if (this.p1currItem.pos == "left") {
            //     // this.p1currItem.body.velocity.setTo(-100,0);
            //     this.velocityX1 = -200;
            //     this.velocityY1 = 0;
            // }
            // if (this.p1currItem.pos == "right") {
            //     // this.p1currItem.body.velocity.setTo(100,0);
            //     this.velocityX1 = 200;
            //     this.velocityY1 = 0;
            // }
            // if (this.p1currItem.pos == "up") {
            //     // this.p1currItem.body.velocity.setTo(0,-100);
            //     this.velocityX1 = 0;
            //     this.velocityY1 = -200;
            // }
            // if (this.p1currItem.pos == "down") {
            //     // this.p1currItem.body.velocity.setTo(0,100);
            //     this.velocityX1 = 0;
            //     this.velocityY1 = 200;
            // }
            // this.p1currItem.body.velocity.setTo(this.velocityX1,this.velocityY1);

            // We will use the normalized vectors (unit vectors) going towards the mouse pointer and set the item velocity to go in that direction
            
            this.p1currItem.body.velocity.setTo(this.xDistToMousePointer_norm*this.baseVelocityVal,this.yDistToMousePointer_norm*this.baseVelocityVal);
            // Set the x and y drag values of the current item in proportion to how much the item is moving in the x direction and y direction.
            // Doing this prevents the drag from being too much in one direction. Otherwise, the object would curve towards a certain direction.
            this.p1currItem.body.drag.x = 100*(Math.abs(this.xDistToMousePointer_norm));
            this.p1currItem.body.drag.y = 100*(Math.abs(this.yDistToMousePointer_norm));
            this.itemThrowIsInitiated = true;

            this.sendObjMotion(this.p1currItem.name, this.p1currItem.player, this.p1currItem.color, this.p1currItem.body.velocity.x, this.p1currItem.body.velocity.y, this.p1currItem.body.drag.x, this.p1currItem.body.drag.y);

            this.resetPossessionTimer = this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.setPossessionFalse, this, this.player1_Lvl2);
            // this.p1Possess = false;
        }
        // this.p1Possess = false;
        // this.p1currItem = null;
        // this.slowDownValue1 = 5;
        // this.slowDownValue1 = 2;
        // this.itemThrowIsInitiated = true; // sets throw button as pressed
        // this.isCurrItemOverlapping = false;
    },

    takeItem: function (player, piece) {
        if (player == this.player1_Lvl2) {
            this.p1Possess = true;
            // this.p1prevItem = this.p1currItem;
            this.p1currItem = piece;
            // if (this.p1prevItem == null) {this.p1prevItem = this.p1currItem;}
            // this.stopMovement(piece);
            piece.body.velocity.setTo(0,0);
            // this.sendObjMotion(piece.name, piece.player, piece.color, 0, 0, 0, 0);
            this.itemThrowIsInitiated = false;
            // The deceleration event timer of an item must be removed and reset if the current item was the previous item (i.e. the player threw an item
            // and took the same item again). This is so that if the item is thrown, picked up, and thrown again very quickly, the old
            // deceleration event of the old throw doesn't overlap with the new deceleration event of the new throw and affect the throw.
            // if ((this.throwTimer1 != null)/* && (this.p1prevItem  == this.p1currItem)*/) {
                // this.game.time.events.remove(this.throwTimer1);
            // }
        }
    },

    setPossessionFalse: function (player) {
        if (player == this.player1_Lvl2) {
            // this.p1currItem.body.velocity.setTo(0,0);
            // this.p1currItem.body.acceleration.setTo(0,0);
            this.p1Possess = false;
        }
    },

    // shootGun: function (player, gun) {
    //  if () {

    //  }
    //  else if () {

    //  }
    //  else if () {

    //  }
    //  else if () {

    //  }
    // },

    pieceShip: function (ship, piece) {
        if (piece.player == ship.player) { // Checks if the piece is brought back to the correct ship
            if (piece == this.p1currItem) {this.p1Possess = false;}
            piece.kill();
            this.killPieceAndCheckRemaining_send(piece.name, piece.player, piece.color);
        }
        if ((this.p1Red_pieces_Lvl2.countLiving() == 0) && (this.p1Yellow_pieces_Lvl2.countLiving() == 0) && (this.p1Green_pieces_Lvl2.countLiving() == 0) && (this.p1Blue_pieces_Lvl2.countLiving() == 0) && (this.p2Red_pieces_Lvl2.countLiving() == 0) && (this.p2Yellow_pieces_Lvl2.countLiving() == 0) && (this.p2Green_pieces_Lvl2.countLiving() == 0) && (this.p2Blue_pieces_Lvl2.countLiving() == 0)) { // Ends the game once all pieces have been brought back
            // The players win; call quitGame
            this.playersWin = true;
            // this.signalGameOver(playersWin);
            this.quitGame(this.playersWin);
        }
    },

    // Send to server
    signalGameOver: function(didPlayersWin) {
        Client.updateGameOverStatus_Lvl2(didPlayersWin);
    },

    // Send to server
    killPieceAndCheckRemaining_send: function(objName,objPlayer,objColor) {
        Client.updateKilledPiece_Lvl2(objName,objPlayer,objColor);
    },

    // Receive from server
    killPieceAndCheckRemaining_receive: function(objName,objPlayer,objColor) {

        var listToCheck = null;

        // Rather than search every list, find which list of pieces to search through, based on the object's assigned player and color; this should make things more efficient
        // Note that we don't check for ray guns here because they should not be able to be killed.
        switch (objColor) {
            case "red":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Red_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Red_pieces_Lvl2;
                }
                break;
            case "yellow":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Yellow_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Yellow_pieces_Lvl2;
                }
                break;
            case "green":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Green_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Green_pieces_Lvl2;
                }
                break;
            case "blue":
                if (objPlayer === "p1") {
                    listToCheck = this.p1Blue_pieces_Lvl2;
                } else if (objPlayer === "p2") {
                    listToCheck = this.p2Blue_pieces_Lvl2;
                }
                break;
        }

        // Search through the list for the object with the specific name, and set its position accordingly
        // Note: Since the pieces lists are Objects and not simple arrays, the same is true for listToCheck. It has a "children" property,
        // and THAT is a simple array that holds all the members of the group.
        for (var i=0; i<listToCheck.children.length; i++) { // If the object isn't found, then it must have been killed already
            if (listToCheck.children[i].name === objName) { // Object found

                listToCheck.children[i].kill();
                break;
            }
        }

        if ((this.p1Red_pieces_Lvl2.countLiving() == 0) && (this.p1Yellow_pieces_Lvl2.countLiving() == 0) && (this.p1Green_pieces_Lvl2.countLiving() == 0) && (this.p1Blue_pieces_Lvl2.countLiving() == 0) && (this.p2Red_pieces_Lvl2.countLiving() == 0) && (this.p2Yellow_pieces_Lvl2.countLiving() == 0) && (this.p2Green_pieces_Lvl2.countLiving() == 0) && (this.p2Blue_pieces_Lvl2.countLiving() == 0)) { // Ends the game once all pieces have been brought back
            // The players win; call quitGame
            this.playersWin = true;
            // this.signalGameOver(playersWin);
            this.quitGame(this.playersWin);
        }

    },

    eachEnemy: function () {
        this.enemies_Lvl2.forEach(this.chasePlayer, this, null);
    },

    chasePlayer: function (enemy) {
        // An enemy should follow player 1 if both of them are on the same half of the screen
        if ((enemy.x < (this.game.world.width/2.0)) && (this.player1_Lvl2.x < this.game.world.width/2.0)) {
            this.game.physics.arcade.moveToObject(enemy, this.player1_Lvl2, 10);
        } else if ((enemy.x >= (this.game.world.width/2.0)) && (this.player1_Lvl2.x >= this.game.world.width/2.0)) {
            this.game.physics.arcade.moveToObject(enemy, this.player1_Lvl2, 10);
        }
        // else { // If the enemy is on the right half of the screen, follow player 2
        //  this.game.physics.arcade.moveToObject(enemy, this.player2, 10);
        // }

        // Move the enemies to the other player based on the positions received from that other player's client

        // if ((enemy.x < (this.game.world.width/2.0)) && (GameLvl2.playerMap < this.game.world.width/2.0)) {
        //     this.game.physics.arcade.moveToObject(enemy, this.player1_Lvl2, 10);
        // } else if ((enemy.x >= (this.game.world.width/2.0)) && (this.player1_Lvl2.x >= this.game.world.width/2.0)) {
        //     this.game.physics.arcade.moveToObject(enemy, this.player1_Lvl2, 10);
        // }
    },

    stopMovement: function (piece) {
        piece.body.acceleration.setTo(0,0);
        piece.body.velocity.setTo(0,0);
    },

    fireBullet: function (bullet, xPos, yPos, xVel, yVel) {
        if (bullet.color == "red") {
            if (this.game.time.now > this.redBulletTime) {
                bullet = this.redBullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(xPos, yPos);
                    bullet.body.velocity.x = xVel;
                    bullet.body.velocity.y = yVel;
                    this.redBulletTime = this.game.time.now + 300;
                }
            }
        }
        else if (bullet.color == "yellow") {
            if (this.game.time.now > this.yellowBulletTime) {
                bullet = this.yellowBullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(xPos, yPos);
                    bullet.body.velocity.x = xVel;
                    bullet.body.velocity.y = yVel;
                    this.yellowBulletTime = this.game.time.now + 300;
                }
            }
        }
        else if (bullet.color == "green") {
            if (this.game.time.now > this.greenBulletTime) {
                bullet = this.greenBullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(xPos, yPos);
                    bullet.body.velocity.x = xVel;
                    bullet.body.velocity.y = yVel;
                    this.greenBulletTime = this.game.time.now + 300;
                }
            }
        }
        else if (bullet.color == "blue") {
            if (this.game.time.now > this.blueBulletTime) {
                bullet = this.blueBullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(xPos, yPos);
                    bullet.body.velocity.x = xVel;
                    bullet.body.velocity.y = yVel;
                    this.blueBulletTime = this.game.time.now + 300;
                }
            }
        }

    },

    killBullet: function (bullet2, bullet1) {
        if (bullet1 != null) {
            bullet1.kill();
        }
        else {
            bullet2.kill();
        }
    },

    killEnemy: function (enemy, bullet) {
        if (bullet.color == enemy.color) {
            enemy.kill();
            bullet.kill();
        }
    },

    killPlayer: function (player, enemy) {
        if (this.game.time.now > player.spawnBeginning) { // Allows the player to not be killable for a number of seconds
            player.kill();
            if (player == this.player1_Lvl2) {
                // this.p1currItem.body.velocity.setTo(0,0);
                // this.p1currItem.body.acceleration.setTo(0,0);
                // this.p1Possess = false;
                if (this.itemThrowIsInitiated == true) {
                    this.game.time.events.add(Phaser.Timer.SECOND * 3, this.setPossessionFalse, this, this.player1_Lvl2);
                }
                else if (this.p1currItem != null) {
                    this.p1currItem.body.velocity.setTo(0,0);
                    this.p1currItem.body.acceleration.setTo(0,0);
                    this.p1Possess = false;
                }
            }
            // this.game.add.text();
            // var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
            if (player == this.player1_Lvl2) {this.textPosX = this.game.world.width/4;}
            else {this.textPosX = 3 * this.game.world.width/4;}
            this.reviveText = this.game.add.text( this.textPosX, this.game.world.centerY, '10 seconds till revive', {font: "25px Verdana", fill: "#FFFFFF", align: "center"} );
            this.reviveText.anchor.setTo(0.5,0.5);
            this.game.time.events.add(Phaser.Timer.SECOND * 10, this.respawnPlayer, this, player);
        }
        if (this.player1_Lvl2.alive == false) {
            // The players lose
            this.playersWin = false;
            this.quitGame(this.playersWin);
        }

        // if (player == this.player1_Lvl2) {
        //  if (this.game.time.now > this.player1_Lvl2.spawnBeginning) { // Allows the player to not be killable for a number of seconds
        //      this.player1_Lvl2.kill();
        //      // this.game.add.text();
        //      // var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
        //      this.textPosX = this.game.world.width/4;
           //      this.reviveText = this.game.add.text( this.textPosX, this.game.world.centerY, '10 seconds till revive', {font: "25px Verdana", fill: "#FFFFFF", align: "center"} );
           //      this.reviveText.anchor.setTo(0.5,0.5);
        //      this.game.time.events.add(Phaser.Timer.SECOND * 10, this.respawnPlayer, this, this.player1_Lvl2);
        //  }
        // }
        // else if (player == this.player2) {
        //  if (this.game.time.now > this.player2.spawnBeginning) { // Allows the player to not be killable for a number of seconds
        //      this.player2.kill();
        //      // this.game.add.text();
        //      // var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
        //      this.textPosX = 3 * this.game.world.width/4;
           //      this.reviveText = this.game.add.text( this.textPosX, this.game.world.centerY, '10 seconds till revive', {font: "25px Verdana", fill: "#FFFFFF", align: "center"} );
           //      this.reviveText.anchor.setTo(0.5,0.5);
        //      this.game.time.events.add(Phaser.Timer.SECOND * 10, this.respawnPlayer, this, this.player2);
        //  }
        // }
    },

    respawnPlayer: function (player) {
        this.reviveText.kill();
        player.reset((this.game.world.width/4), this.game.world.centerY);
        this.player1_Lvl2.spawnBeginning = this.game.time.now+3000; // Invulnerable for 3 seconds
        
        // https://phaser.io/examples/v2/tweens/yoyo
        // https://phaser.io/docs/2.4.4/Phaser.Tween.html
        this.player1_Lvl2.alpha = 1;
        // Fade player1 to alpha 0 over 1/2 of a second, abd back to 1 over 1/2 of a second
        var tween = this.game.add.tween(this.player1_Lvl2).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
        tween.yoyo(true, 0);
        // Performs the blinking tween 3 times total (repeat twice after the first time)
        tween.repeat(2);
    },

    quitGame: function (didPlayersWin) {

        this.finalTime = game.time.totalElapsedSeconds()-this.timeSoFar;

        var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
        // var text = this.game.add.text( this.game.world.centerX, 15, "Get your ship up and running!", style );
        // text.anchor.setTo( 0.5, 0.0 );

// TODO: this.endText does not display because either the WinScreen or LoseScreen begin immediately.
// So, find a way to pass the value of the final time to the next state (win or lose) and display it there

        // Displays the final time
        // this.endText = game.add.text( game.world.centerX, game.world.centerY, 'Your time: '+Phaser.Math.roundTo(this.finalTime,-2), style );
        // this.endText.anchor.setTo(0.5,0.5);

        GameLvl2.playerMap = {};

        if (didPlayersWin == true) {
            game.state.start('WinScreen');
            // game.state.start('GameLvl3', true, false, this.player1_Lvl2.id, this.player1_Lvl2.playerSide); // Pass the player side as an argument
        }
        else if (didPlayersWin == false) {
            game.state.start('LoseScreen');
        }

    }

};


// Note: This version of addNewPlayer() works too if you want to use it instead of the one in the .prototype above.
// In client.js, you'd just need to call BasicGame.Game.addNewPlayer(data.id,data.x,data.y) instead of BasicGame.Game.prototype.addNewPlayer(data.id,data.x,data.y)

// // This func is for adding a new player to the game; they are placed at a specified x and y pos, and are given a unique id,
// // which are stored in the socket object (lines 38-42 of server.js) created when the player connects to the server
// // Tutorial: "This method creates a new sprite at the specified coordinates, and stores the corresponding Sprite object into
// // an associative array declared in Game.create(), with the supplied id as the key. This allows to easily access the sprite
// // corresponding to a specific player, for example when we need to move or remove it"
// BasicGame.Game.addNewPlayer = function(id,x,y){
//     BasicGame.Game.playerMap[id] = game.add.sprite( x,y,'player1');
// };
