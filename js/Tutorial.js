"use strict";

BasicGame.Tutorial = function (game) {

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
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.planetSurfaceData = null;
    this.planetSurfaceSprite = null;
    this.wall = null;
    this.redGate = null;
    // this.yellowGate = null;
    // this.greenGate = null;
    this.blueGate = null;
    this.player1 = null;
    // this.player2 = null;
    this.rayGuns = null;
    this.pieces = null;
    this.enemies = null;
    this.p1Possess = null; // Check if PLayer 1 has possession of something
    this.p1currItem = null; // Check what item Player 1 is in possession of
    // this.p2Possess = null; // Check if PLayer 1 has possession of something
    // this.p2currItem = null; // Check what item Player 1 is in possession of
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
    // this.yellowBulletTime = null;
    // this.greenBulletTime = null;
    this.blueBulletTime = null;
    this.gameClock = null;
    this.playersWin = null; // Check if the players have won or lost
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

BasicGame.Tutorial.prototype = {

    // class Tile extends Phaser.GameObjects.Sprite {
    //   constructor(scene, x, y, key) {
    //     super(scene, x, y, key);
    //     this.scene = scene;
    //     this.scene.add.existing(this);
    //     this.setOrigin(0);
    //   }
    // };

    create: function () {

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
/*
        var canvas = document.createElement('canvas');
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

        // Create a sprite at the center of the screen using the 'logo' image.
        this.wall = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'wall' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.wall.anchor.setTo( 0.5, 0.5 );

        this.wall.width = 50;
        this.wall.height = this.game.world.height/2;

        this.redGate = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/5)*2, 'RedGate');
        this.redGate.anchor.setTo(0.5,0.5);
        this.redGate.width = this.wall.width+8;
        this.redGate.height = this.game.world.height/5;
/*
        this.yellowGate = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/5)*2, 'YellowGate');
        this.yellowGate.anchor.setTo(0.5,0.5);
        this.yellowGate.width = this.wall.width+8;
        this.yellowGate.height = this.game.world.height/5;

        this.greenGate = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/5)*3, 'GreenGate');
        this.greenGate.anchor.setTo(0.5,0.5);
        this.greenGate.width = this.wall.width+8;
        this.greenGate.height = this.game.world.height/5;
*/
        this.blueGate = this.game.add.sprite( this.game.world.centerX, (this.game.world.height/5)*3, 'BlueGate');
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


        this.player1 = this.game.add.sprite( (this.game.world.width/4), this.game.world.centerY, 'player1' );
        this.player1.anchor.setTo( 0.5, 0.5 );
        this.player1.width = 75;
        this.player1.height = 75;
        this.player1.spawnBeginning = 0;
        // this.player2 = this.game.add.sprite( (this.game.world.width/4)*3, this.game.world.centerY, 'player2' );
        // this.player2.anchor.setTo( 0.5, 0.5 );
        // this.player2.width = 75;
        // this.player2.height = 75;
        // this.player2.spawnBeginning = 0;

        this.game.physics.enable( [this.player1,/*this.player2,*/this.wall], Phaser.Physics.ARCADE );
        // this.player1.body.setSize(55, 55, 10, 10);
        // this.player2.body.setSize(55, 55, 10, 10);
        //this.game.physics.enable( this.player2, Phaser.Physics.ARCADE );
        //this.game.physics.enable( this.wall, Phaser.Physics.ARCADE );
        this.wall.body.collideWorldBounds = true;
        this.wall.body.immovable = true;

        this.game.physics.enable( [this.redGate,/*this.yellowGate,this.greenGate,*/this.blueGate], Phaser.Physics.ARCADE );
        this.redGate.body.immovable = true;
        // this.yellowGate.body.immovable = true;
        // this.greenGate.body.immovable = true;
        this.blueGate.body.immovable = true;
        
    //    this.p1Blue = new ShipPiece("p1", "blue", 'BlueP1');

    	this.rayGuns = this.game.add.group();
    	this.rayGuns.enableBody = true;
    	this.rayGuns.physicsBodyType = Phaser.Physics.ARCADE;

    	this.redGun = this.rayGuns.create(200,450, 'RedGun');
    	this.redGun.anchor.setTo(0.5,0.5);
    	this.redGun.height = 50;
    	this.redGun.width = 50;
    	this.redGun.body.velocity.x = 0;
    	this.redGun.body.velocity.y = 0;
    	this.redGun.color = "red";
/*
    	this.yellowGun = this.rayGuns.create(1000,450, 'YellowGun');
    	this.yellowGun.anchor.setTo(0.5,0.5);
    	this.yellowGun.height = 50;
    	this.yellowGun.width = 50;
    	this.yellowGun.body.velocity.x = 0;
    	this.yellowGun.body.velocity.y = 0;
    	this.yellowGun.color = "yellow";

    	this.greenGun = this.rayGuns.create(200,150, 'GreenGun');
    	this.greenGun.anchor.setTo(0.5,0.5);
    	this.greenGun.height = 50;
    	this.greenGun.width = 50;
    	this.greenGun.body.velocity.x = 0;
    	this.greenGun.body.velocity.y = 0;
    	this.greenGun.color = "green";
*/
    	this.blueGun = this.rayGuns.create(700,350, 'BlueGun');
    	this.blueGun.anchor.setTo(0.5,0.5);
    	this.blueGun.height = 50;
    	this.blueGun.width = 50;
    	this.blueGun.body.velocity.x = 0;
    	this.blueGun.body.velocity.y = 0;
    	this.blueGun.color = "blue";

    	this.redBulletTime = 0;
	    // this.yellowBulletTime = 0;
	    // this.greenBulletTime = 0;
	    this.blueBulletTime = 0;

    	this.redBullets = this.game.add.group();
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
/*
        this.yellowBullets = this.game.add.group();
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

        this.greenBullets = this.game.add.group();
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
*/
        this.blueBullets = this.game.add.group();
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

    	// this.redBullet = this.game.add.sprite( -50, -50, 'RedBullet' );
    	// this.redBullet.anchor.setTo(0.5,0.5);
     //    this.redBullet.width = 10;
     //   	this.redBullet.height = 10;
     // //   	this.redBullet.enableBody = true;
    	// // this.redBullet.physicsBodyType = Phaser.Physics.ARCADE;
    	// this.game.physics.enable( this.redBullet, Phaser.Physics.ARCADE );
    	// this.redBullet.body.velocity.x = 0;

    	this.enemies = this.game.add.group();
    	this.enemies.enableBody = true;
    	this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        this.pieces = this.game.add.group();
        this.pieces.enableBody = true;
        this.pieces.physicsBodyType = Phaser.Physics.ARCADE;

// P1 pieces

        this.p1Red = this.pieces.create(1050, 500, 'RedP1');
        this.p1Red.anchor.setTo(0.5,0.5);
        this.p1Red.body.velocity.x = 0;
        this.p1Red.body.velocity.y = 0;
        this.p1Red.height = 30;
        this.p1Red.width = 30;
        this.p1Red.player = "p1";
        this.p1Red.color = "red";

        this.p1Red2 = this.pieces.create(675, 225, 'RedP1');
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
/*
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
*/
        this.p1Blue = this.pieces.create(50,100,'BlueP1');
        this.p1Blue.anchor.setTo(0.5,0.5);
        this.p1Blue.body.velocity.x = 0;
        this.p1Blue.body.velocity.y = 0;
        this.p1Blue.height = 30;
        this.p1Blue.width = 30;
        this.p1Blue.player = "p1";
        this.p1Blue.color = "blue";

        this.p1Blue2 = this.pieces.create(850,75,'BlueP1');
        this.p1Blue2.anchor.setTo(0.5,0.5);
        this.p1Blue2.body.velocity.x = 0;
        this.p1Blue2.body.velocity.y = 0;
        this.p1Blue2.height = 30;
        this.p1Blue2.width = 30;
        this.p1Blue2.player = "p1";
        this.p1Blue2.color = "blue";

        this.p1Blue3 = this.pieces.create(925,300,'BlueP1');
        this.p1Blue3.anchor.setTo(0.5,0.5);
        this.p1Blue3.body.velocity.x = 0;
        this.p1Blue3.body.velocity.y = 0;
        this.p1Blue3.height = 30;
        this.p1Blue3.width = 30;
        this.p1Blue3.player = "p1";
        this.p1Blue3.color = "blue";

// P2 pieces

        this.p2Red = this.pieces.create(1100, 50, 'RedP2');
        this.p2Red.anchor.setTo(0.5,0.5);
        this.p2Red.body.velocity.x = 0;
        this.p2Red.body.velocity.y = 0;
        this.p2Red.height = 30;
        this.p2Red.width = 30;
        this.p2Red.player = "p2";
        this.p2Red.color = "red";

        this.p2Red2 = this.pieces.create(550, 325, 'RedP2');
        this.p2Red2.anchor.setTo(0.5,0.5);
        this.p2Red2.body.velocity.x = 0;
        this.p2Red2.body.velocity.y = 0;
        this.p2Red2.height = 30;
        this.p2Red2.width = 30;
        this.p2Red2.player = "p2";
        this.p2Red2.color = "red";

        this.p2Red3 = this.pieces.create(200, 250, 'RedP2');
        this.p2Red3.anchor.setTo(0.5,0.5);
        this.p2Red3.body.velocity.x = 0;
        this.p2Red3.body.velocity.y = 0;
        this.p2Red3.height = 30;
        this.p2Red3.width = 30;
        this.p2Red3.player = "p2";
        this.p2Red3.color = "red";
/*
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
*/
        this.p2Blue = this.pieces.create(800,550,'BlueP2');
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

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
        // var text = this.game.add.text( this.game.world.centerX, 15, "Get your ship up and running!", style );
        // text.anchor.setTo( 0.5, 0.0 );

        // this.gameClock = this.game.add.text( 50, 15, 'Elapsed seconds: '+this.game.time.totalElapsedSeconds(), style );
        // this.gameClock.anchor.setTo( 0.0, 0.0 );

		// this.timeSoFar = this.game.time.totalElapsedSeconds();

        // this.spawnBeginning = 0;
        
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

        // this.player1.body.onOverlap = new Phaser.Signal();
        // this.player1.body.onOverlap.add(this.takeObject, this);
//        this.itemInitVelocity = 200;
        // this.slowDownValue = 0;
    },

    update: function () {

    	// this.gameClock.text = 'Elapsed seconds: ' + Phaser.Math.roundTo(this.game.time.totalElapsedSeconds()-this.timeSoFar,-2);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
      // this.wall.rotation = this.game.physics.arcade.accelerateToPointer( this.wall, this.game.input.activePointer, 500, 500, 500 );

      	// Players cannot phase through walls
        this.hitWall = this.game.physics.arcade.collide([this.player1/*,this.player2*/], this.wall);
        this.game.physics.arcade.overlap([this.redBullets,/*this.yellowBullets,this.greenBullets,*/this.blueBullets], this.wall, this.killBullet, null, this);
    //    this.hitShip = this.game.physics.arcade.collide([this.player1,this.player2], [this.p1Ship,this.p2Ship]);
    	this.game.physics.arcade.overlap(this.pieces, [this.p1Ship,this.p2Ship], this.pieceShip, null, this);

    	// if (this.redBullet != null) {
     //    	this.game.physics.arcade.collide(this.redBullet, this.redEnemy1);
    	// }
    	// this.game.physics.arcade.overlap(this.enemies, this.bullets, this.killEnemy, null, this);
    	this.game.physics.arcade.overlap([this.redBullets,this.yellowBullets,this.greenBullets,this.blueBullets],this.enemies,this.killEnemy,null,this);
    	        // game.physics.arcade.overlap(bullets, enemies, enemyKill, null, this);
    	// this.game.time.events.add(Phaser.Timer.SECOND * 5, this.eachEnemy, this);
    	// this.enemies.forEach(this.chasePlayer, this, null);
		this.game.physics.arcade.overlap(this.enemies, [this.player1/*,this.player2*/], this.killPlayer, null, this);
 //   	this.game.physics.arcade.moveToObject(this.redEnemy1, this.player1, 25);

        // Items can only pass through same-colored gates. This is done by accessing and checking the item's color property, which was set at
        // creation, and then having the item collide with all gates except for the same-colored gate. currItemTemp is used instead of currItem
        // so that the collision checking still continues for the curr item even after it is released and a new item is picked up.
        if (this.p1currItemTemp != null) {
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

    //    this.takePieces = this.game.physics.arcade.overlap([this.player1,this.player2], this.p1Blue, this.takeObject, null, this);
        // this.game.physics.arcade.overlap(this.player, this.door, this.notFinished, null, this);
        // Only executes takeObject when the player is holding nothing (has nothing in their possession)
        if (this.p1Possess != true) {
        	this.game.physics.arcade.overlap(this.player1, this.pieces, this.takeObject, null, this);
        	this.game.physics.arcade.overlap(this.player1, this.rayGuns, this.takeObject, null, this);
    	}
    	// If the player is holding an item, the item must move in sync with the player,
    	// so the item's velocity is constanly updated to equal the velocity of the player.
        if (this.p1Possess == true) {
            this.p1currItem.body.velocity.x = this.player1.body.velocity.x;
            this.p1currItem.body.velocity.y = this.player1.body.velocity.y;
        }

        // These are the directional buttons for Player 1 (W,S,A,D) and what they do.
        // If P1 is in possession of an item and that item isn't null, the item's velocity and position
        // are constantly updated to be equal to P1's velocity and position (to simulate the item following P1)

        this.player1.body.velocity.set(0);
/*
        var currPlayerPos = this.player1.body.position;
        // Movement will be affected by the terrain, generated by Perlin noise
        var cellIndex = Math.abs(Math.round((this.player1.body.position.x + (this.player1.body.position.y * this.game.world.width)) * 4));
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
            this.player1.body.velocity.x = -10 - 200;//*(currPerlinVal / 255.0); // Move left; currPerlinVal will be a value from 0 to 255
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                this.p1currItem.x = this.player1.x-this.player1.width/1.25;
                this.p1currItem.y = this.player1.y;
                this.p1currItem.pos = "left";
                // this.p1currItem.position.setTo(this.player1.x-this.player1.width/1.25,this.player1.y);    ...This works too, it's just less readable
            }
        }
        if (this.dKey.isDown) {
            this.player1.body.velocity.x = 10 + 200;//*(currPerlinVal / 255.0); // Move right; currPerlinVal will be a value from 0 to 255
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                this.p1currItem.x = this.player1.x+this.player1.width/1.25;
                this.p1currItem.y = this.player1.y;
                this.p1currItem.pos = "right";
            }
        }
        if (this.wKey.isDown) {
            this.player1.body.velocity.y = -10 - 200;//*(currPerlinVal / 255.0); // Move up; currPerlinVal will be a value from 0 to 255
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                this.p1currItem.x = this.player1.x;
                this.p1currItem.y = this.player1.y-this.player1.height/1.25;
                this.p1currItem.pos = "up";
            }
        }
        if (this.sKey.isDown) {
            this.player1.body.velocity.y = 10 + 200;//*(currPerlinVal / 255.0); // Move down; currPerlinVal will be a value from 0 to 255
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                this.p1currItem.x = this.player1.x;
                this.p1currItem.y = this.player1.y+this.player1.height/1.25;
                this.p1currItem.pos = "down";
            }
        }

        // If P1 has possession of an item and the 1 key is pressed, the item is
        // thrown in the direction that the item is facing (as tracked before).
        // Notice that an initial velocity is set in the corresponding direction...

        if ((this.oneKey.isDown) && (this.hitGate1 != true) && (this.p1currItem != null) && (this.keyIsPressed1 != true)) {
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                if (this.p1currItem.pos == "left") {
                    // this.p1currItem.body.velocity.setTo(-100,0);
                    this.velocityX1 = -200;
                    this.velocityY1 = 0;
                }
                if (this.p1currItem.pos == "right") {
                    // this.p1currItem.body.velocity.setTo(100,0);
                    this.velocityX1 = 200;
                    this.velocityY1 = 0;
                }
                if (this.p1currItem.pos == "up") {
                    // this.p1currItem.body.velocity.setTo(0,-100);
                    this.velocityX1 = 0;
                    this.velocityY1 = -200;
                }
                if (this.p1currItem.pos == "down") {
                    // this.p1currItem.body.velocity.setTo(0,100);
                    this.velocityX1 = 0;
                    this.velocityY1 = 200;
                }
            this.p1currItem.body.velocity.setTo(this.velocityX1,this.velocityY1);
            this.p1Possess = false;
            }
            // this.p1Possess = false;
            // this.p1currItem = null;
            // this.slowDownValue1 = 5;
            // this.slowDownValue1 = 2;
            // this.keyIsPressed1 = true; // sets throw button as pressed
        }

        // ...and when the 1 key is pressed, the item is thrown and its velocity gradually decreases because of an opposite acceleration that is added,
        // causing the item to slow down. The thrown object moves for 2 seconds before coming to a complete stop, as performed by calling the stopMovement function,
        // which takes p1currItemTemp as its argument. p1currItemTemp is a variable that stores a copy of p1currItem, allowing the original item stored in
        // p1currItem to be manipulated even after p1currItem changes, which happens when the player throws the original p1currItem and picks up another item.

        if ((this.oneKey.isDown) && (this.hitGate1 != true) && (this.p1currItem != null) && (this.keyIsPressed1 != true)) { // Checks if object to throw exists and if throw button has been pressed
            if (this.p1currItem.body.velocity.x > 0) {
                this.p1currItem.body.acceleration.setTo(-100,0);
                this.p1currItemTemp = this.p1currItem;
                this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
            }
            else if (this.p1currItem.body.velocity.x < 0) {
                this.p1currItem.body.acceleration.setTo(100,0);
                this.p1currItemTemp = this.p1currItem;
                this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
            }
            else if (this.p1currItem.body.velocity.y > 0) {
                this.p1currItem.body.acceleration.setTo(0,-100);
                this.p1currItemTemp = this.p1currItem;
                this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
            }
            else if (this.p1currItem.body.velocity.y < 0) {
                this.p1currItem.body.acceleration.setTo(0,100);
                this.p1currItemTemp = this.p1currItem;
                this.throwTimer1 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p1currItemTemp);
            }
            this.keyIsPressed1 = true;
        }        

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

        // if (this.p1currItem in this.rayGuns.children) {
        if ((this.p1currItem != null) && (this.twoKey.isDown) && (this.keyIsPressed1 != true) && (this.p1Possess == true)) {
         	if ((this.p1currItem == this.redGun) && (this.game.time.now > this.redBulletTime)) {
        		// this.redBullet = this.redBullets.getFirstExists(false);

		    	// this.redBullet.anchor.setTo(0.5,0.5);
		     //    this.redBullet.width = 10;
		     //   	this.redBullet.height = 10;
		     //   	this.redBullet.color = "red";
		    	// this.game.physics.enable( this.redBullet, Phaser.Physics.ARCADE );
        		// this.redBullet.body.onOverlap = new Phaser.Signal();
        		// this.redBullet.body.onOverlap.add(this.killEnemy, this);

       			// this.redBullet.reset(this.player1.x, this.player1.y);
        		
        		switch (this.p1currItem.pos) {
        			case "right":
        				// this.redBullet.body.velocity.x = 300;
        				this.fireBullet(this.redBullet,this.player1,300,0);
        				break;
        			case "left":
        				// this.redBullet.body.velocity.x = -300;
        				this.fireBullet(this.redBullet,this.player1,-300,0);
        				break;
        			case "up":
        				// this.redBullet.body.velocity.y = -300;
        				this.fireBullet(this.redBullet,this.player1,0,-300);
        				break;
        			case "down":
        				// this.redBullet.body.velocity.y = 300;
        				this.fireBullet(this.redBullet,this.player1,0,300);
        				break;
        		}
        		// this.redBullet.events.onOutOfBounds.add(this.killBullet, this);
        		this.redBulletTime = this.game.time.now + 300;
         	}
/*         	if ((this.p1currItem == this.yellowGun) && (this.game.time.now > this.yellowBulletTime)) {
        		switch (this.p1currItem.pos) {
        			case "right":
        				this.fireBullet(this.yellowBullet,this.player1,300,0);
        				break;
        			case "left":
        				this.fireBullet(this.yellowBullet,this.player1,-300,0);
        				break;
        			case "up":
        				this.fireBullet(this.yellowBullet,this.player1,0,-300);
        				break;
        			case "down":
        				this.fireBullet(this.yellowBullet,this.player1,0,300);
        				break;
        		}
        		this.yellowBulletTime = this.game.time.now + 300;
         	}
         	if ((this.p1currItem == this.greenGun) && (this.game.time.now > this.greenBulletTime)) {
        		switch (this.p1currItem.pos) {
        			case "right":
        				this.fireBullet(this.greenBullet,this.player1,300,0);
        				break;
        			case "left":
        				this.fireBullet(this.greenBullet,this.player1,-300,0);
        				break;
        			case "up":
        				this.fireBullet(this.greenBullet,this.player1,0,-300);
        				break;
        			case "down":
        				this.fireBullet(this.greenBullet,this.player1,0,300);
        				break;
        		}
        		this.greenBulletTime = this.game.time.now + 300;
         	}*/
         	if ((this.p1currItem == this.blueGun) && (this.game.time.now > this.blueBulletTime)) {
        		switch (this.p1currItem.pos) {
        			case "right":
        				this.fireBullet(this.blueBullet,this.player1,300,0);
        				break;
        			case "left":
        				this.fireBullet(this.blueBullet,this.player1,-300,0);
        				break;
        			case "up":
        				this.fireBullet(this.blueBullet,this.player1,0,-300);
        				break;
        			case "down":
        				this.fireBullet(this.blueBullet,this.player1,0,300);
        				break;
        		}
        		this.blueBulletTime = this.game.time.now + 300;
         	}

        }

    },

    takeObject: function (player, piece) {
        if (player == this.player1) {
            this.p1Possess = true;
            this.p1prevItem = this.p1currItem;
            this.p1currItem = piece;
            if (this.p1prevItem == null) {this.p1prevItem = this.p1currItem;}
            this.stopMovement(piece);
            this.keyIsPressed1 = false;
            // The deceleration event timer of an item must be removed and reset if the current item was the previous item (i.e. the player threw an item
            // and took the same item again). This is so that if the item is thrown, picked up, and thrown again very quickly, the old
            // deceleration event of the old throw doesn't overlap with the new deceleration event of the new throw and affect the throw.
            if ((this.throwTimer1 != null) && (this.p1prevItem  == this.p1currItem)) {
            	this.game.time.events.remove(this.throwTimer1);
            }
        }
    },

    // shootGun: function (player, gun) {
    // 	if () {

    // 	}
    // 	else if () {

    // 	}
    // 	else if () {

    // 	}
    // 	else if () {

    // 	}
    // },

    pieceShip: function (ship, piece) {
    	if (piece.player == ship.player) { // Checks if the piece is brought back to the correct ship
    		if (piece == this.p1currItem) {this.p1Possess = false;}
    		piece.kill();
    	}
    	if (this.pieces.countLiving() == 0) { // Ends the game once all pieces have been brought back
    		// The players win; call quitGame
    		this.playersWin = true;
    		this.quitGame();
    	}
    },
/*
    eachEnemy: function () {
    	this.enemies.forEach(this.chasePlayer, this, null);
    },

    chasePlayer: function (enemy) {
    	if (enemy.x < (this.game.world.width/2)) { // If the enemy is on the left half of the screen, follow player 1
    		this.game.physics.arcade.moveToObject(enemy, this.player1, 10);
    	}
    },
*/
    stopMovement: function (piece) {
    	piece.body.acceleration.setTo(0,0);
    	piece.body.velocity.setTo(0,0);
    },

    fireBullet: function (bullet, player, xDir, yDir) {
    	if (bullet.color == "red") {
	        if (this.game.time.now > this.redBulletTime) {
	            bullet = this.redBullets.getFirstExists(false);
	            if (bullet) {
	                bullet.reset(player.x, player.y);
	                bullet.body.velocity.x = xDir;
	                bullet.body.velocity.y = yDir;
	                this.redBulletTime = this.game.time.now + 300;
	            }
        	}
		}
/*		else if (bullet.color == "yellow") {
	        if (this.game.time.now > this.yellowBulletTime) {
	            bullet = this.yellowBullets.getFirstExists(false);
	            if (bullet) {
	                bullet.reset(player.x, player.y);
	                bullet.body.velocity.x = xDir;
	                bullet.body.velocity.y = yDir;
	                this.yellowBulletTime = this.game.time.now + 300;
	            }
        	}
		}
		else if (bullet.color == "green") {
	        if (this.game.time.now > this.greenBulletTime) {
	            bullet = this.greenBullets.getFirstExists(false);
	            if (bullet) {
	                bullet.reset(player.x, player.y);
	                bullet.body.velocity.x = xDir;
	                bullet.body.velocity.y = yDir;
	                this.greenBulletTime = this.game.time.now + 300;
	            }
        	}
		}*/
		else if (bullet.color == "blue") {
	        if (this.game.time.now > this.blueBulletTime) {
	            bullet = this.blueBullets.getFirstExists(false);
	            if (bullet) {
	                bullet.reset(player.x, player.y);
	                bullet.body.velocity.x = xDir;
	                bullet.body.velocity.y = yDir;
	                this.blueBulletTime = this.game.time.now + 300;
	            }
        	}
		}

    },

    setPossessionFalse: function (player) {
    	if (player == this.player1) {
    		this.p1currItem.body.velocity.setTo(0,0);
    		this.p1currItem.body.acceleration.setTo(0,0);
    		this.p1Possess = false;
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
    		if (player == this.player1) {
    			// this.p1currItem.body.velocity.setTo(0,0);
    			// this.p1currItem.body.acceleration.setTo(0,0);
    			// this.p1Possess = false;
    			if (this.keyIsPressed1 == true) {
    				this.game.time.events.add(Phaser.Timer.SECOND * 3, this.setPossessionFalse, this, this.player1);
    			}
    			else if (this.p1currItem != null) {
    				this.p1currItem.body.velocity.setTo(0,0);
		    		this.p1currItem.body.acceleration.setTo(0,0);
		    		this.p1Possess = false;
		    	}
    		}
    		// this.game.add.text();
    		// var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
    		if (player == this.player1) {this.textPosX = this.game.world.width/4;}
    		else {this.textPosX = 3 * this.game.world.width/4;}
	        this.reviveText = this.game.add.text( this.textPosX, this.game.world.centerY, '10 seconds till revive', {font: "25px Verdana", fill: "#FFFFFF", align: "center"} );
	        this.reviveText.anchor.setTo(0.5,0.5);
    		this.game.time.events.add(Phaser.Timer.SECOND * 10, this.respawnPlayer, this, player);
    	}
    	if (this.player1.alive == false) {
    		// The players lose
    		this.playersWin = false;
    		this.quitGame();
    	}

    	// if (player == this.player1) {
	    // 	if (this.game.time.now > this.player1.spawnBeginning) { // Allows the player to not be killable for a number of seconds
	    // 		this.player1.kill();
	    // 		// this.game.add.text();
	    // 		// var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
	    // 		this.textPosX = this.game.world.width/4;
		   //      this.reviveText = this.game.add.text( this.textPosX, this.game.world.centerY, '10 seconds till revive', {font: "25px Verdana", fill: "#FFFFFF", align: "center"} );
		   //      this.reviveText.anchor.setTo(0.5,0.5);
    	// 		this.game.time.events.add(Phaser.Timer.SECOND * 10, this.respawnPlayer, this, this.player1);
	    // 	}
	    // }
	    // else if (player == this.player2) {
	    // 	if (this.game.time.now > this.player2.spawnBeginning) { // Allows the player to not be killable for a number of seconds
	    // 		this.player2.kill();
	    // 		// this.game.add.text();
	    // 		// var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
	    // 		this.textPosX = 3 * this.game.world.width/4;
		   //      this.reviveText = this.game.add.text( this.textPosX, this.game.world.centerY, '10 seconds till revive', {font: "25px Verdana", fill: "#FFFFFF", align: "center"} );
		   //      this.reviveText.anchor.setTo(0.5,0.5);
    	// 		this.game.time.events.add(Phaser.Timer.SECOND * 10, this.respawnPlayer, this, this.player2);
	    // 	}
	    // }
    },

    respawnPlayer: function (player) {
    	this.reviveText.kill();
		player.reset((this.game.world.width/4), this.game.world.centerY);
		this.player1.spawnBeginning = this.game.time.now+3000; // Invulnerable for 3 seconds
		
		// https://phaser.io/examples/v2/tweens/yoyo
		// https://phaser.io/docs/2.4.4/Phaser.Tween.html
		this.player1.alpha = 1;
	    // Fade player1 to alpha 0 over 1/2 of a second, abd back to 1 over 1/2 of a second
	    var tween = this.game.add.tween(this.player1).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
	    tween.yoyo(true, 0);
	    // Performs the blinking tween 3 times total (repeat twice after the first time)
	    tween.repeat(2);
    },

    quitGame: function () {

    	// this.finalTime = this.game.time.totalElapsedSeconds()-this.timeSoFar;

        var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
        // var text = this.game.add.text( this.game.world.centerX, 15, "Get your ship up and running!", style );
        // text.anchor.setTo( 0.5, 0.0 );

        // Displays the final time
        this.endText = this.game.add.text( this.game.world.centerX, this.game.world.centerY, 'Your time: '+Phaser.Math.roundTo(this.finalTime,-2), style );
        this.endText.anchor.setTo(0.5,0.5);

        if (this.playersWin == true) {
        	this.state.start('WinScreen');
        }
        else if (this.playersWin == false) {
        	this.state.start('LoseScreen');
        }

    }

};
