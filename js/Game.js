"use strict";

BasicGame.Game = function (game) {

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
    this.planetSurface = null;
    this.wall = null;
    this.redGate = null;
    this.yellowGate = null;
    this.greenGate = null;
    this.blueGate = null;
    this.player1 = null;
    this.player2 = null;
    this.rayGuns = null;
    this.pieces = null;
    this.enemies = null;
    this.p1Possess = null; // Check if PLayer 1 has possession of something
    this.p1currItem = null; // Check what item Player 1 is in possession of
    this.p2Possess = null; // Check if PLayer 1 has possession of something
    this.p2currItem = null; // Check what item Player 1 is in possession of
//    this.itemInitVelocity = null; // The initial velocity of an item when thrown by a player
    // this.slowDownValue1 = null; // The decrement value of the velocity over time (how quickly it slows down) for Player 1's current item
    // this.slowDownValue2 = null; // The decrement value of the velocity over time (how quickly it slows down) for Player 2's current item
    // this.done = null;
    // this.p2currItemTemp = null;
    this.throwTimer1 = null;
    this.throwTimer2 = null;
    this.p1prevItem = null;
    this.p2prevItem = null;
    // this.bulletTime1 = null;
    // this.bulletTime2 = null;
    this.redBulletTime = null;
    this.yellowBulletTime = null;
    this.greenBulletTime = null;
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

/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

// (function(global){
//   var module = global.noise = {};

//   function Grad(x, y, z) {
//     this.x = x; this.y = y; this.z = z;
//   }
  
//   Grad.prototype.dot2 = function(x, y) {
//     return this.x*x + this.y*y;
//   };

//   Grad.prototype.dot3 = function(x, y, z) {
//     return this.x*x + this.y*y + this.z*z;
//   };

//   var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
//                new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
//                new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

//   var p = [151,160,137,91,90,15,
//   131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
//   190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
//   88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
//   77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
//   102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
//   135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
//   5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
//   223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
//   129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
//   251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
//   49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
//   138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
//   // To remove the need for index wrapping, double the permutation table length
//   var perm = new Array(512);
//   var gradP = new Array(512);

//   // This isn't a very good seeding function, but it works ok. It supports 2^16
//   // different seed values. Write something better if you need more seeds.
//   module.seed = function(seed) {
//     if(seed > 0 && seed < 1) {
//       // Scale the seed out
//       seed *= 65536;
//     }

//     seed = Math.floor(seed);
//     if(seed < 256) {
//       seed |= seed << 8;
//     }

//     for(var i = 0; i < 256; i++) {
//       var v;
//       if (i & 1) {
//         v = p[i] ^ (seed & 255);
//       } else {
//         v = p[i] ^ ((seed>>8) & 255);
//       }

//       perm[i] = perm[i + 256] = v;
//       gradP[i] = gradP[i + 256] = grad3[v % 12];
//     }
//   };

//   module.seed(0);

//   /*
//   for(var i=0; i<256; i++) {
//     perm[i] = perm[i + 256] = p[i];
//     gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
//   }*/

//   // Skewing and unskewing factors for 2, 3, and 4 dimensions
//   var F2 = 0.5*(Math.sqrt(3)-1);
//   var G2 = (3-Math.sqrt(3))/6;

//   var F3 = 1/3;
//   var G3 = 1/6;

//   // 2D simplex noise
//   module.simplex2 = function(xin, yin) {
//     var n0, n1, n2; // Noise contributions from the three corners
//     // Skew the input space to determine which simplex cell we're in
//     var s = (xin+yin)*F2; // Hairy factor for 2D
//     var i = Math.floor(xin+s);
//     var j = Math.floor(yin+s);
//     var t = (i+j)*G2;
//     var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
//     var y0 = yin-j+t;
//     // For the 2D case, the simplex shape is an equilateral triangle.
//     // Determine which simplex we are in.
//     var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
//     if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
//       i1=1; j1=0;
//     } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
//       i1=0; j1=1;
//     }
//     // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
//     // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
//     // c = (3-sqrt(3))/6
//     var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
//     var y1 = y0 - j1 + G2;
//     var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
//     var y2 = y0 - 1 + 2 * G2;
//     // Work out the hashed gradient indices of the three simplex corners
//     i &= 255;
//     j &= 255;
//     var gi0 = gradP[i+perm[j]];
//     var gi1 = gradP[i+i1+perm[j+j1]];
//     var gi2 = gradP[i+1+perm[j+1]];
//     // Calculate the contribution from the three corners
//     var t0 = 0.5 - x0*x0-y0*y0;
//     if(t0<0) {
//       n0 = 0;
//     } else {
//       t0 *= t0;
//       n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
//     }
//     var t1 = 0.5 - x1*x1-y1*y1;
//     if(t1<0) {
//       n1 = 0;
//     } else {
//       t1 *= t1;
//       n1 = t1 * t1 * gi1.dot2(x1, y1);
//     }
//     var t2 = 0.5 - x2*x2-y2*y2;
//     if(t2<0) {
//       n2 = 0;
//     } else {
//       t2 *= t2;
//       n2 = t2 * t2 * gi2.dot2(x2, y2);
//     }
//     // Add contributions from each corner to get the final noise value.
//     // The result is scaled to return values in the interval [-1,1].
//     return 70 * (n0 + n1 + n2);
//   };

//   // 3D simplex noise
//   module.simplex3 = function(xin, yin, zin) {
//     var n0, n1, n2, n3; // Noise contributions from the four corners

//     // Skew the input space to determine which simplex cell we're in
//     var s = (xin+yin+zin)*F3; // Hairy factor for 2D
//     var i = Math.floor(xin+s);
//     var j = Math.floor(yin+s);
//     var k = Math.floor(zin+s);

//     var t = (i+j+k)*G3;
//     var x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
//     var y0 = yin-j+t;
//     var z0 = zin-k+t;

//     // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
//     // Determine which simplex we are in.
//     var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
//     var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
//     if(x0 >= y0) {
//       if(y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
//       else if(x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
//       else              { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
//     } else {
//       if(y0 < z0)      { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
//       else if(x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
//       else             { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
//     }
//     // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
//     // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
//     // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
//     // c = 1/6.
//     var x1 = x0 - i1 + G3; // Offsets for second corner
//     var y1 = y0 - j1 + G3;
//     var z1 = z0 - k1 + G3;

//     var x2 = x0 - i2 + 2 * G3; // Offsets for third corner
//     var y2 = y0 - j2 + 2 * G3;
//     var z2 = z0 - k2 + 2 * G3;

//     var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner
//     var y3 = y0 - 1 + 3 * G3;
//     var z3 = z0 - 1 + 3 * G3;

//     // Work out the hashed gradient indices of the four simplex corners
//     i &= 255;
//     j &= 255;
//     k &= 255;
//     var gi0 = gradP[i+   perm[j+   perm[k   ]]];
//     var gi1 = gradP[i+i1+perm[j+j1+perm[k+k1]]];
//     var gi2 = gradP[i+i2+perm[j+j2+perm[k+k2]]];
//     var gi3 = gradP[i+ 1+perm[j+ 1+perm[k+ 1]]];

//     // Calculate the contribution from the four corners
//     var t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
//     if(t0<0) {
//       n0 = 0;
//     } else {
//       t0 *= t0;
//       n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
//     }
//     var t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
//     if(t1<0) {
//       n1 = 0;
//     } else {
//       t1 *= t1;
//       n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
//     }
//     var t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
//     if(t2<0) {
//       n2 = 0;
//     } else {
//       t2 *= t2;
//       n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
//     }
//     var t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
//     if(t3<0) {
//       n3 = 0;
//     } else {
//       t3 *= t3;
//       n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
//     }
//     // Add contributions from each corner to get the final noise value.
//     // The result is scaled to return values in the interval [-1,1].
//     return 32 * (n0 + n1 + n2 + n3);

//   };

//   // ##### Perlin noise stuff

//   function fade(t) {
//     return t*t*t*(t*(t*6-15)+10);
//   }

//   function lerp(a, b, t) {
//     return (1-t)*a + t*b;
//   }

//   // 2D Perlin Noise
//   module.perlin2 = function(x, y) {
//     // Find unit grid cell containing point
//     var X = Math.floor(x), Y = Math.floor(y);
//     // Get relative xy coordinates of point within that cell
//     x = x - X; y = y - Y;
//     // Wrap the integer cells at 255 (smaller integer period can be introduced here)
//     X = X & 255; Y = Y & 255;

//     // Calculate noise contributions from each of the four corners
//     var n00 = gradP[X+perm[Y]].dot2(x, y);
//     var n01 = gradP[X+perm[Y+1]].dot2(x, y-1);
//     var n10 = gradP[X+1+perm[Y]].dot2(x-1, y);
//     var n11 = gradP[X+1+perm[Y+1]].dot2(x-1, y-1);

//     // Compute the fade curve value for x
//     var u = fade(x);

//     // Interpolate the four results
//     return lerp(
//         lerp(n00, n10, u),
//         lerp(n01, n11, u),
//        fade(y));
//   };

//   // 3D Perlin Noise
//   module.perlin3 = function(x, y, z) {
//     // Find unit grid cell containing point
//     var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
//     // Get relative xyz coordinates of point within that cell
//     x = x - X; y = y - Y; z = z - Z;
//     // Wrap the integer cells at 255 (smaller integer period can be introduced here)
//     X = X & 255; Y = Y & 255; Z = Z & 255;

//     // Calculate noise contributions from each of the eight corners
//     var n000 = gradP[X+  perm[Y+  perm[Z  ]]].dot3(x,   y,     z);
//     var n001 = gradP[X+  perm[Y+  perm[Z+1]]].dot3(x,   y,   z-1);
//     var n010 = gradP[X+  perm[Y+1+perm[Z  ]]].dot3(x,   y-1,   z);
//     var n011 = gradP[X+  perm[Y+1+perm[Z+1]]].dot3(x,   y-1, z-1);
//     var n100 = gradP[X+1+perm[Y+  perm[Z  ]]].dot3(x-1,   y,   z);
//     var n101 = gradP[X+1+perm[Y+  perm[Z+1]]].dot3(x-1,   y, z-1);
//     var n110 = gradP[X+1+perm[Y+1+perm[Z  ]]].dot3(x-1, y-1,   z);
//     var n111 = gradP[X+1+perm[Y+1+perm[Z+1]]].dot3(x-1, y-1, z-1);

//     // Compute the fade curve value for x, y, z
//     var u = fade(x);
//     var v = fade(y);
//     var w = fade(z);

//     // Interpolate
//     return lerp(
//         lerp(
//           lerp(n000, n100, u),
//           lerp(n001, n101, u), w),
//         lerp(
//           lerp(n010, n110, u),
//           lerp(n011, n111, u), w),
//        v);
//   };

// })(this);


BasicGame.Game.prototype = {

    // class Tile extends Phaser.GameObjects.Sprite {
    //   constructor(scene, x, y, key) {
    //     super(scene, x, y, key);
    //     this.scene = scene;
    //     this.scene.add.existing(this);
    //     this.setOrigin(0);
    //   }
    // };

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

        // var canvasRenderer = new CanvasRenderer(this);
        // var canvas = canvasRenderer.gameCanvas;


        // const canvas = document.createElement('canvas');
        // const ctx = canvas.getContext('2d');

        // canvas.width = this.game.world.width;
        // canvas.height = this.game.world.height;

        // var image = ctx.createImageData(canvas.width, canvas.height);
        // var data = image.data;

        // for (var x = 0; x < canvas.width; x++) {
        //   //if (x % 100 == 0) {
        //   //  noise.seed(Math.random());
        //   //}
        //   for (var y = 0; y < canvas.height; y++) {
        //     var value = Math.abs(noise.perlin2(x / 100, y / 100));
        //     value *= 256;

        //     var cell = (x + y * canvas.width) * 4;
        //     data[cell] = data[cell + 1] = data[cell + 2] = value;
        //     data[cell] += Math.max(0, (25 - value) * 8);
        //     data[cell + 3] = 255; // alpha.
        //   }
        // }

        // ctx.fillColor = 'white';
        // ctx.fillRect(0, 0, 100, 100);
        // ctx.putImageData(image, 0, 0);


        // NOTE: noise and perlin stuff is usable here only if the necessary files are loaded;
        // If you check index.html, you'll see the js/noisejs/perlin.js script loaded right before Game.js (which is this file).
        // That script includes all the values, variables, and functions necessary for the calculations below.

        var canvas = document.createElement('canvas');
        canvas.width = this.game.world.width;
        canvas.height = this.game.world.height;
        var bitmap;
        var imgSprite;

        var ctx = canvas.getContext('2d');

        var image = ctx.createImageData(canvas.width, canvas.height);
        var data = image.data;

        for (var x = 0; x < canvas.width; x++) {
          //if (x % 100 == 0) {
          //  noise.seed(Math.random());
          //}
          for (var y = 0; y < canvas.height; y++) {
            var value = Math.abs(noise.perlin2(x / 100, y / 100));
            value *= 256;

            var cell = (x + y * canvas.width) * 4;
            data[cell] = data[cell + 1] = data[cell + 2] = value;
            data[cell + 1] += Math.max(0, (25 - value) * 8);
            data[cell + 3] = 255; // alpha.
          }
        }

        ctx.fillColor = 'black';
        ctx.fillRect(0, 0, 100, 100);
        ctx.putImageData(image, 0, 0);


        // make a bitmap, and draw the canvas to its canvas
        bitmap = new Phaser.BitmapData(game, '', canvas.width, canvas.height);
        bitmap.context.drawImage(canvas, 0, 0);

        // use that bitmap as the texture for the sprite
        imgSprite = this.game.add.sprite(0, 0, bitmap);
        imgSprite.name = 'bx';
        imgSprite.x = this.game.world.centerX - imgSprite.width / 2;
        imgSprite.y = this.game.world.centerY - imgSprite.height / 2;




        // // create a canvas, and get the 2d context
        // var canvas = document.createElement('canvas'),
        // ctx = canvas.getContext('2d'),
        // bitmap,
        // sprite;
 
        // // set the native width, and height of the canvas
        // // and draw something to the context
        // canvas.width = 64;
        // canvas.height = 64;
        // ctx.fillStyle = 'green';
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
 
        // // make a bitmap, and draw the canvas to its canvas
        // bitmap = new Phaser.BitmapData(game, '', 64, 64);
        // bitmap.context.drawImage(canvas, 0, 0);
 
        // // use that bitmap as the texture for the sprite
        // sprite = game.add.sprite(0, 0, bitmap);
        // sprite.name = 'bx';
        // sprite.x = game.world.centerX - sprite.width / 2;
        // sprite.y = game.world.centerY - sprite.height / 2;



        // var img = canvas.toDataURL("image/png");
        // document.write('<img src="'+img+'"/>');

        // this.planetSurface = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, image);
        // this.wall.anchor.setTo( 0.5, 0.5 );

        // noise.seed(Math.random());

        // for (var x = 0; x < this.game.world.width; x++) {
        //     for (var y = 0; y < this.game.world.height; y++) {
        //         // All noise functions return values in the range of -1 to 1.

        //         // noise.perlin2 for 2d noise
        //         var value = noise.perlin2(x / 100, y / 100);

        //         // image[x][y].r = Math.abs(value) * 256; // Or whatever. Open demo.html to see it used with canvas.
        //     }
        // }

        // this.make.graphics({x: 0, y: 0, add: false});

        // var src = this.textures.get('wall').getSourceImage();

        // Create a sprite at the center of the screen using the 'logo' image.
        this.wall = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'wall' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        this.wall.anchor.setTo( 0.5, 0.5 );

        this.wall.width = 50;
        this.wall.height = this.game.world.height;

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


        this.player1 = this.game.add.sprite( (this.game.world.width/4), this.game.world.centerY, 'player1' );
        this.player1.anchor.setTo( 0.5, 0.5 );
        this.player1.width = 75;
        this.player1.height = 75;
        this.player1.spawnBeginning = 0;
        this.player2 = this.game.add.sprite( (this.game.world.width/4)*3, this.game.world.centerY, 'player2' );
        this.player2.anchor.setTo( 0.5, 0.5 );
        this.player2.width = 75;
        this.player2.height = 75;
        this.player2.spawnBeginning = 0;

        this.game.physics.enable( [this.player1,this.player2,this.wall], Phaser.Physics.ARCADE );
        // this.player1.body.setSize(55, 55, 10, 10);
        // this.player2.body.setSize(55, 55, 10, 10);
        //this.game.physics.enable( this.player2, Phaser.Physics.ARCADE );
        //this.game.physics.enable( this.wall, Phaser.Physics.ARCADE );
        this.wall.body.collideWorldBounds = true;
        this.wall.body.immovable = true;

        this.game.physics.enable( [this.redGate,this.yellowGate,this.greenGate,this.blueGate], Phaser.Physics.ARCADE );
        this.redGate.body.immovable = true;
        this.yellowGate.body.immovable = true;
        this.greenGate.body.immovable = true;
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

    	this.blueGun = this.rayGuns.create(1000,150, 'BlueGun');
    	this.blueGun.anchor.setTo(0.5,0.5);
    	this.blueGun.height = 50;
    	this.blueGun.width = 50;
    	this.blueGun.body.velocity.x = 0;
    	this.blueGun.body.velocity.y = 0;
    	this.blueGun.color = "blue";

    	this.redBulletTime = 0;
	    this.yellowBulletTime = 0;
	    this.greenBulletTime = 0;
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

// Wave 1

    	this.redEnemy1 = this.enemies.create(300, -50, 'RedEnemy');
    	this.redEnemy1.anchor.setTo(0.5,0.5);
    	this.redEnemy1.body.velocity.x = 0;
    	this.redEnemy1.body.velocity.y = 0;
    	this.redEnemy1.height = 60;
    	this.redEnemy1.width = 60;
    	this.redEnemy1.color = "red";
    	// this.redEnemy1.body.setSize(10, 10, 25, 25);

    	// this.redEnemy2 = this.enemies.create(800, this.game.world.height-10, 'RedEnemy');
    	// this.redEnemy2.anchor.setTo(0.5,0.5);
    	// this.redEnemy2.body.velocity.x = 0;
    	// this.redEnemy2.body.velocity.y = 0;
    	// this.redEnemy2.height = 60;
    	// this.redEnemy2.width = 60;
    	// this.redEnemy2.color = "red";

    	this.yellowEnemy1 = this.enemies.create(900, this.game.world.height+100, 'YellowEnemy');
    	this.yellowEnemy1.anchor.setTo(0.5,0.5);
    	this.yellowEnemy1.body.velocity.x = 0;
    	this.yellowEnemy1.body.velocity.y = 0;
    	this.yellowEnemy1.height = 60;
    	this.yellowEnemy1.width = 60;
    	this.yellowEnemy1.color = "yellow";


    	// this.greenEnemy1 = this.enemies.create(1200, 300, 'GreenEnemy');
    	// this.greenEnemy1.anchor.setTo(0.5,0.5);
    	// this.greenEnemy1.body.velocity.x = 0;
    	// this.greenEnemy1.body.velocity.y = 0;
    	// this.greenEnemy1.height = 60;
    	// this.greenEnemy1.width = 60;
    	// this.greenEnemy1.color = "green";

		this.greenEnemy4 = this.enemies.create(350, this.game.world.height+50, 'GreenEnemy');
    	this.greenEnemy4.anchor.setTo(0.5,0.5);
    	this.greenEnemy4.body.velocity.x = 0;
    	this.greenEnemy4.body.velocity.y = 0;
    	this.greenEnemy4.height = 60;
    	this.greenEnemy4.width = 60;
    	this.greenEnemy4.color = "green"; 

    	this.blueEnemy1 = this.enemies.create(700, -50, 'BlueEnemy');
    	this.blueEnemy1.anchor.setTo(0.5,0.5);
    	this.blueEnemy1.body.velocity.x = 0;
    	this.blueEnemy1.body.velocity.y = 0;
    	this.blueEnemy1.height = 60;
    	this.blueEnemy1.width = 60;
    	this.blueEnemy1.color = "blue";

// Wave 2

		this.yellowEnemy2 = this.enemies.create(-400, 400, 'YellowEnemy');
    	this.yellowEnemy2.anchor.setTo(0.5,0.5);
    	this.yellowEnemy2.body.velocity.x = 0;
    	this.yellowEnemy2.body.velocity.y = 0;
    	this.yellowEnemy2.height = 60;
    	this.yellowEnemy2.width = 60;
    	this.yellowEnemy2.color = "yellow";

    	this.yellowEnemy3 = this.enemies.create(100, -350, 'YellowEnemy');
    	this.yellowEnemy3.anchor.setTo(0.5,0.5);
    	this.yellowEnemy3.body.velocity.x = 0;
    	this.yellowEnemy3.body.velocity.y = 0;
    	this.yellowEnemy3.height = 60;
    	this.yellowEnemy3.width = 60;
    	this.yellowEnemy3.color = "yellow";

    	this.redEnemy3 = this.enemies.create(100, this.game.world.height+350, 'RedEnemy');
    	this.redEnemy3.anchor.setTo(0.5,0.5);
    	this.redEnemy3.body.velocity.x = 0;
    	this.redEnemy3.body.velocity.y = 0;
    	this.redEnemy3.height = 60;
    	this.redEnemy3.width = 60;
    	this.redEnemy3.color = "red";

    	this.greenEnemy2 = this.enemies.create(800, this.game.world.height+350, 'GreenEnemy');
    	this.greenEnemy2.anchor.setTo(0.5,0.5);
    	this.greenEnemy2.body.velocity.x = 0;
    	this.greenEnemy2.body.velocity.y = 0;
    	this.greenEnemy2.height = 60;
    	this.greenEnemy2.width = 60;
    	this.greenEnemy2.color = "green";

    	this.blueEnemy3 = this.enemies.create(200, this.game.world.height+400, 'BlueEnemy');
    	this.blueEnemy3.anchor.setTo(0.5,0.5);
    	this.blueEnemy3.body.velocity.x = 0;
    	this.blueEnemy3.body.velocity.y = 0;
    	this.blueEnemy3.height = 60;
    	this.blueEnemy3.width = 60;
    	this.blueEnemy3.color = "blue";

    	this.blueEnemy4 = this.enemies.create(900, this.game.world.height+350, 'BlueEnemy');
    	this.blueEnemy4.anchor.setTo(0.5,0.5);
    	this.blueEnemy4.body.velocity.x = 0;
    	this.blueEnemy4.body.velocity.y = 0;
    	this.blueEnemy4.height = 60;
    	this.blueEnemy4.width = 60;
    	this.blueEnemy4.color = "blue";

    	this.blueEnemy5 = this.enemies.create(1450, this.game.world.height-400, 'BlueEnemy');
    	this.blueEnemy5.anchor.setTo(0.5,0.5);
    	this.blueEnemy5.body.velocity.x = 0;
    	this.blueEnemy5.body.velocity.y = 0;
    	this.blueEnemy5.height = 60;
    	this.blueEnemy5.width = 60;
    	this.blueEnemy5.color = "blue";

// Wave 3

		this.redEnemy4 = this.enemies.create(1000, this.game.world.height+750, 'RedEnemy');
    	this.redEnemy4.anchor.setTo(0.5,0.5);
    	this.redEnemy4.body.velocity.x = 0;
    	this.redEnemy4.body.velocity.y = 0;
    	this.redEnemy4.height = 60;
    	this.redEnemy4.width = 60;
    	this.redEnemy4.color = "red";

    	this.redEnemy4 = this.enemies.create(-750, this.game.world.height/2, 'RedEnemy');
    	this.redEnemy4.anchor.setTo(0.5,0.5);
    	this.redEnemy4.body.velocity.x = 0;
    	this.redEnemy4.body.velocity.y = 0;
    	this.redEnemy4.height = 60;
    	this.redEnemy4.width = 60;
    	this.redEnemy4.color = "red";

		this.yellowEnemy4 = this.enemies.create(750, this.game.world.height+800, 'YellowEnemy');
    	this.yellowEnemy4.anchor.setTo(0.5,0.5);
    	this.yellowEnemy4.body.velocity.x = 0;
    	this.yellowEnemy4.body.velocity.y = 0;
    	this.yellowEnemy4.height = 60;
    	this.yellowEnemy4.width = 60;
    	this.yellowEnemy4.color = "yellow";

    	this.greenEnemy3 = this.enemies.create(200, this.game.world.height+750, 'GreenEnemy');
    	this.greenEnemy3.anchor.setTo(0.5,0.5);
    	this.greenEnemy3.body.velocity.x = 0;
    	this.greenEnemy3.body.velocity.y = 0;
    	this.greenEnemy3.height = 60;
    	this.greenEnemy3.width = 60;
    	this.greenEnemy3.color = "green";

    	this.greenEnemy4 = this.enemies.create(550, -850, 'GreenEnemy');
    	this.greenEnemy4.anchor.setTo(0.5,0.5);
    	this.greenEnemy4.body.velocity.x = 0;
    	this.greenEnemy4.body.velocity.y = 0;
    	this.greenEnemy4.height = 60;
    	this.greenEnemy4.width = 60;
    	this.greenEnemy4.color = "green";

    	this.blueEnemy2 = this.enemies.create(400, this.game.world.height+750, 'BlueEnemy');
    	this.blueEnemy2.anchor.setTo(0.5,0.5);
    	this.blueEnemy2.body.velocity.x = 0;
    	this.blueEnemy2.body.velocity.y = 0;
    	this.blueEnemy2.height = 60;
    	this.blueEnemy2.width = 60;
    	this.blueEnemy2.color = "blue";

  	  	this.blueEnemy3 = this.enemies.create(this.game.world.width+750, this.game.world.height/3, 'BlueEnemy');
    	this.blueEnemy3.anchor.setTo(0.5,0.5);
    	this.blueEnemy3.body.velocity.x = 0;
    	this.blueEnemy3.body.velocity.y = 0;
    	this.blueEnemy3.height = 60;
    	this.blueEnemy3.width = 60;
    	this.blueEnemy3.color = "blue";

// Wave 4

    	this.redEnemy4 = this.enemies.create(100, -1100, 'RedEnemy');
    	this.redEnemy4.anchor.setTo(0.5,0.5);
    	this.redEnemy4.body.velocity.x = 0;
    	this.redEnemy4.body.velocity.y = 0;
    	this.redEnemy4.height = 60;
    	this.redEnemy4.width = 60;
    	this.redEnemy4.color = "red";

    	this.redEnemy5 = this.enemies.create(400, this.game.world.height+1200, 'RedEnemy');
    	this.redEnemy5.anchor.setTo(0.5,0.5);
    	this.redEnemy5.body.velocity.x = 0;
    	this.redEnemy5.body.velocity.y = 0;
    	this.redEnemy5.height = 60;
    	this.redEnemy5.width = 60;
    	this.redEnemy5.color = "red";

    	this.redEnemy6 = this.enemies.create(-1150, -1200, 'RedEnemy');
    	this.redEnemy6.anchor.setTo(0.5,0.5);
    	this.redEnemy6.body.velocity.x = 0;
    	this.redEnemy6.body.velocity.y = 0;
    	this.redEnemy6.height = 60;
    	this.redEnemy6.width = 60;
    	this.redEnemy6.color = "red";

    	this.redEnemy7 = this.enemies.create(this.game.width+1300, 0, 'RedEnemy');
    	this.redEnemy7.anchor.setTo(0.5,0.5);
    	this.redEnemy7.body.velocity.x = 0;
    	this.redEnemy7.body.velocity.y = 0;
    	this.redEnemy7.height = 60;
    	this.redEnemy7.width = 60;
    	this.redEnemy7.color = "red";

    	this.redEnemy8 = this.enemies.create(950, 1350, 'RedEnemy');
    	this.redEnemy8.anchor.setTo(0.5,0.5);
    	this.redEnemy8.body.velocity.x = 0;
    	this.redEnemy8.body.velocity.y = 0;
    	this.redEnemy8.height = 60;
    	this.redEnemy8.width = 60;
    	this.redEnemy8.color = "red";

    	this.redEnemy9 = this.enemies.create(700, 1300, 'RedEnemy');
    	this.redEnemy9.anchor.setTo(0.5,0.5);
    	this.redEnemy9.body.velocity.x = 0;
    	this.redEnemy9.body.velocity.y = 0;
    	this.redEnemy9.height = 60;
    	this.redEnemy9.width = 60;
    	this.redEnemy9.color = "red";

    	this.yellowEnemy5 = this.enemies.create(750, -1200, 'YellowEnemy');
    	this.yellowEnemy5.anchor.setTo(0.5,0.5);
    	this.yellowEnemy5.body.velocity.x = 0;
    	this.yellowEnemy5.body.velocity.y = 0;
    	this.yellowEnemy5.height = 60;
    	this.yellowEnemy5.width = 60;
    	this.yellowEnemy5.color = "yellow";

    	this.yellowEnemy6 = this.enemies.create(800, this.game.world.height+1100, 'YellowEnemy');
    	this.yellowEnemy6.anchor.setTo(0.5,0.5);
    	this.yellowEnemy6.body.velocity.x = 0;
    	this.yellowEnemy6.body.velocity.y = 0;
    	this.yellowEnemy6.height = 60;
    	this.yellowEnemy6.width = 60;
    	this.yellowEnemy6.color = "yellow";

    	this.yellowEnemy7 = this.enemies.create(1250, -1100, 'YellowEnemy');
    	this.yellowEnemy7.anchor.setTo(0.5,0.5);
    	this.yellowEnemy7.body.velocity.x = 0;
    	this.yellowEnemy7.body.velocity.y = 0;
    	this.yellowEnemy7.height = 60;
    	this.yellowEnemy7.width = 60;
    	this.yellowEnemy7.color = "yellow";

    	this.greenEnemy5 = this.enemies.create(350, -1250, 'GreenEnemy');
    	this.greenEnemy5.anchor.setTo(0.5,0.5);
    	this.greenEnemy5.body.velocity.x = 0;
    	this.greenEnemy5.body.velocity.y = 0;
    	this.greenEnemy5.height = 60;
    	this.greenEnemy5.width = 60;
    	this.greenEnemy5.color = "green";

    	this.greenEnemy5 = this.enemies.create(-1300, 250, 'GreenEnemy');
    	this.greenEnemy5.anchor.setTo(0.5,0.5);
    	this.greenEnemy5.body.velocity.x = 0;
    	this.greenEnemy5.body.velocity.y = 0;
    	this.greenEnemy5.height = 60;
    	this.greenEnemy5.width = 60;
    	this.greenEnemy5.color = "green";

    	this.blueEnemy4 = this.enemies.create(this.game.world.width+1250, this.game.world.height/3 * 2, 'BlueEnemy');
    	this.blueEnemy4.anchor.setTo(0.5,0.5);
    	this.blueEnemy4.body.velocity.x = 0;
    	this.blueEnemy4.body.velocity.y = 0;
    	this.blueEnemy4.height = 60;
    	this.blueEnemy4.width = 60;
    	this.blueEnemy4.color = "blue";

    	this.blueEnemy5 = this.enemies.create(1000, -1300, 'BlueEnemy');
    	this.blueEnemy5.anchor.setTo(0.5,0.5);
    	this.blueEnemy5.body.velocity.x = 0;
    	this.blueEnemy5.body.velocity.y = 0;
    	this.blueEnemy5.height = 60;
    	this.blueEnemy5.width = 60;
    	this.blueEnemy5.color = "blue";

// Wave 5    	

    	this.redEnemy5 = this.enemies.create(1400, 1400, 'RedEnemy');
    	this.redEnemy5.anchor.setTo(0.5,0.5);
    	this.redEnemy5.body.velocity.x = 0;
    	this.redEnemy5.body.velocity.y = 0;
    	this.redEnemy5.height = 60;
    	this.redEnemy5.width = 60;
    	this.redEnemy5.color = "red";

    	

        this.pieces = this.game.add.group();
        this.pieces.enableBody = true;
        this.pieces.physicsBodyType = Phaser.Physics.ARCADE;

        // this.bluePieces = this.game.add.group();
        // this.bluePieces.enableBody = true;
        // this.bluePieces.physicsBodyType = Phaser.Physics.ARCADE;

        // this.pieces.add(this.bluePieces);

// P1 pieces

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

// P2 pieces

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

        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#FFFFFF", align: "center" };
        // var text = this.game.add.text( this.game.world.centerX, 15, "Get your ship up and running!", style );
        // text.anchor.setTo( 0.5, 0.0 );

        this.gameClock = this.game.add.text( 50, 15, 'Elapsed seconds: '+this.game.time.totalElapsedSeconds(), style );
        // this.gameClock.anchor.setTo( 0.0, 0.0 );

		this.timeSoFar = this.game.time.totalElapsedSeconds();

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

    	this.gameClock.text = 'Elapsed seconds: ' + Phaser.Math.roundTo(this.game.time.totalElapsedSeconds()-this.timeSoFar,-2);
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
      // this.wall.rotation = this.game.physics.arcade.accelerateToPointer( this.wall, this.game.input.activePointer, 500, 500, 500 );

      	// Players cannot phase through walls
        this.hitWall = this.game.physics.arcade.collide([this.player1,this.player2], this.wall);
        this.game.physics.arcade.overlap([this.redBullets,this.yellowBullets,this.greenBullets,this.blueBullets], this.wall, this.killBullet, null, this);
    //    this.hitShip = this.game.physics.arcade.collide([this.player1,this.player2], [this.p1Ship,this.p2Ship]);
    	this.game.physics.arcade.overlap(this.pieces, [this.p1Ship,this.p2Ship], this.pieceShip, null, this);

    	// if (this.redBullet != null) {
     //    	this.game.physics.arcade.collide(this.redBullet, this.redEnemy1);
    	// }
    	// this.game.physics.arcade.overlap(this.enemies, this.bullets, this.killEnemy, null, this);
    	this.game.physics.arcade.overlap([this.redBullets,this.yellowBullets,this.greenBullets,this.blueBullets],this.enemies,this.killEnemy,null,this);
    	        // game.physics.arcade.overlap(bullets, enemies, enemyKill, null, this);
    	this.game.time.events.add(Phaser.Timer.SECOND * 5, this.eachEnemy, this);
    	// this.enemies.forEach(this.chasePlayer, this, null);
		this.game.physics.arcade.overlap(this.enemies, [this.player1,this.player2], this.killPlayer, null, this);
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

    //    this.takePieces = this.game.physics.arcade.overlap([this.player1,this.player2], this.p1Blue, this.takeObject, null, this);
        // this.game.physics.arcade.overlap(this.player, this.door, this.notFinished, null, this);
        // Only executes takeObject when the player is holding nothing (has nothing in their possession)
        if (this.p1Possess != true) {
        	this.game.physics.arcade.overlap(this.player1, this.pieces, this.takeObject, null, this);
        	this.game.physics.arcade.overlap(this.player1, this.rayGuns, this.takeObject, null, this);
    	}
    	if (this.p2Possess != true) {
        	this.game.physics.arcade.overlap(this.player2, this.pieces, this.takeObject, null, this);
        	this.game.physics.arcade.overlap(this.player2, this.rayGuns, this.takeObject, null, this);
    	}
    	// If the player is holding an item, the item must move in sync with the player,
    	// so the item's velocity is constanly updated to equal the velocity of the player.
        if (this.p1Possess == true) {
            this.p1currItem.body.velocity.x = this.player1.body.velocity.x;
            this.p1currItem.body.velocity.y = this.player1.body.velocity.y;
        }
        if (this.p2Possess == true) {
            this.p2currItem.body.velocity.x = this.player2.body.velocity.x;
            this.p2currItem.body.velocity.y = this.player2.body.velocity.y;
        }

        // These are the directional buttons for Player 1 (W,S,A,D) and what they do.
        // If P1 is in possession of an item and that item isn't null, the item's velocity and position
        // are constantly updated to be equal to P1's velocity and position (to simulate the item following P1)

        this.player1.body.velocity.set(0);

        if (this.aKey.isDown) {
            this.player1.body.velocity.x = -200; // Move left
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                this.p1currItem.x = this.player1.x-this.player1.width/1.25;
                this.p1currItem.y = this.player1.y;
                this.p1currItem.pos = "left";
                // this.p1currItem.position.setTo(this.player1.x-this.player1.width/1.25,this.player1.y);    ...This works too, it's just less readable
            }
        }
        if (this.dKey.isDown) {
            this.player1.body.velocity.x = 200; // Move right
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                this.p1currItem.x = this.player1.x+this.player1.width/1.25;
                this.p1currItem.y = this.player1.y;
                this.p1currItem.pos = "right";
            }
        }
        if (this.wKey.isDown) {
            this.player1.body.velocity.y = -200; // Move up
            if ((this.p1Possess == true) && (this.p1currItem != null)) {
                this.p1currItem.x = this.player1.x;
                this.p1currItem.y = this.player1.y-this.player1.height/1.25;
                this.p1currItem.pos = "up";
            }
        }
        if (this.sKey.isDown) {
            this.player1.body.velocity.y = 200; // Move down
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

        this.player2.body.velocity.set(0);

		// These are the directional buttons for Player 2 (up,down,left,right) and what they do.
        // If P2 is in possession of an item and that item isn't null, the item's velocity and position
        // are constantly updated to be equal to P2's velocity and position (to simulate the item following P2)

        if (this.cursors.left.isDown) {
            this.player2.body.velocity.x = -200; // Move left
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                this.p2currItem.x = this.player2.x-this.player2.width/1.25;
                this.p2currItem.y = this.player2.y;
                this.p2currItem.pos = "left";
                // this.p1currItem.position.setTo(this.player1.x-this.player1.width/1.25,this.player1.y);    ...This works too, it's just less readable
            }
        }
        if (this.cursors.right.isDown) {
            this.player2.body.velocity.x = 200; // Move right
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                this.p2currItem.x = this.player2.x+this.player2.width/1.25;
                this.p2currItem.y = this.player2.y;
                this.p2currItem.pos = "right";
            }
        }
        if (this.cursors.up.isDown) {
            this.player2.body.velocity.y = -200; // Move up
            if ((this.p2Possess == true) && (this.p2currItem != null)) {
                this.p2currItem.x = this.player2.x;
                this.p2currItem.y = this.player2.y-this.player2.height/1.25;
                this.p2currItem.pos = "up";
            }
        }
        if (this.cursors.down.isDown) {
            this.player2.body.velocity.y = 200; // Move down
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
         //    	this.p2currItemTemp = this.p2currItem;
        	// }
        	// if (this.p2currItemTemp != null) {
                // this.p2currItem.body.velocity.setTo(this.velocityX2,this.velocityY2);
        	// }
            // }
        	// this.done = false;
            if (/*this.velocityX2*/ this.p2currItem.body.velocity.x > 0) {
                // this.velocityX2 -= this.slowDownValue2;
                this.p2currItem.body.acceleration.setTo(-100,0);
                // Phaser.TimerEvent(Phaser.Timer, 3000, 3000, 0, 0, this.p2currItem.body.acceleration.setTo(0,0), this);
                this.p2currItemTemp = this.p2currItem;
                this.throwTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p2currItemTemp);
            }
            else if (/*this.velocityX2*/ this.p2currItem.body.velocity.x < 0) {
                // this.velocityX2 += this.slowDownValue2;
                this.p2currItem.body.acceleration.setTo(100,0);
                // Phaser.TimerEvent(Phaser.Timer, 3000, 3000, 0, 0, this.p2currItem.body.acceleration.setTo(0,0), this);
                this.p2currItemTemp = this.p2currItem;
                this.throwTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p2currItemTemp);
            }
            else if (/*this.velocityY2*/ this.p2currItem.body.velocity.y > 0) {
                // this.velocityY2 -= this.slowDownValue2;
                this.p2currItem.body.acceleration.setTo(0,-100);
                // Phaser.TimerEvent(Phaser.Timer, 3000, 3000, 0, 0, this.p2currItem.body.acceleration.setTo(0,0), this);
                this.p2currItemTemp = this.p2currItem;
                this.throwTimer2 = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.stopMovement, this, this.p2currItemTemp);
            }
            else if (/*this.velocityY2*/ this.p2currItem.body.velocity.y < 0) {
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
         	if ((this.p1currItem == this.yellowGun) && (this.game.time.now > this.yellowBulletTime)) {
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
         	}
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


        if ((this.p2currItem != null) && (this.jKey.isDown) && (this.keyIsPressed2 != true) && (this.p2Possess == true)) {
         	if ((this.p2currItem == this.redGun) && (this.game.time.now > this.redBulletTime)) {
        		switch (this.p2currItem.pos) {
        			case "right":
        				this.fireBullet(this.redBullet,this.player2,300,0);
        				break;
        			case "left":
        				this.fireBullet(this.redBullet,this.player2,-300,0);
        				break;
        			case "up":
        				this.fireBullet(this.redBullet,this.player2,0,-300);
        				break;
        			case "down":
        				this.fireBullet(this.redBullet,this.player2,0,300);
        				break;
        		}
        		this.redBulletTime = this.game.time.now + 300;
         	}
         	if ((this.p2currItem == this.yellowGun) && (this.game.time.now > this.yellowBulletTime)) {
        		switch (this.p2currItem.pos) {
        			case "right":
        				this.fireBullet(this.yellowBullet,this.player2,300,0);
        				break;
        			case "left":
        				this.fireBullet(this.yellowBullet,this.player2,-300,0);
        				break;
        			case "up":
        				this.fireBullet(this.yellowBullet,this.player2,0,-300);
        				break;
        			case "down":
        				this.fireBullet(this.yellowBullet,this.player2,0,300);
        				break;
        		}
        		this.yellowBulletTime = this.game.time.now + 300;
         	}
         	if ((this.p2currItem == this.greenGun) && (this.game.time.now > this.greenBulletTime)) {
        		switch (this.p2currItem.pos) {
        			case "right":
        				this.fireBullet(this.greenBullet,this.player2,300,0);
        				break;
        			case "left":
        				this.fireBullet(this.greenBullet,this.player2,-300,0);
        				break;
        			case "up":
        				this.fireBullet(this.greenBullet,this.player2,0,-300);
        				break;
        			case "down":
        				this.fireBullet(this.greenBullet,this.player2,0,300);
        				break;
        		}
        		this.greenBulletTime = this.game.time.now + 300;
         	}
         	if ((this.p2currItem == this.blueGun) && (this.game.time.now > this.blueBulletTime)) {
        		switch (this.p2currItem.pos) {
        			case "right":
        				this.fireBullet(this.blueBullet,this.player2,300,0);
        				break;
        			case "left":
        				this.fireBullet(this.blueBullet,this.player2,-300,0);
        				break;
        			case "up":
        				this.fireBullet(this.blueBullet,this.player2,0,-300);
        				break;
        			case "down":
        				this.fireBullet(this.blueBullet,this.player2,0,300);
        				break;
        		}
        		this.blueBulletTime = this.game.time.now + 300;
         	}

        }

     //    if (this.redBullet != null) {
     //    	this.game.physics.arcade.overlap(this.redBullet, this.enemies, this.killEnemy, null, this);
    	// }

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
        else if (player == this.player2) {
            this.p2Possess = true;
            this.p2prevItem = this.p2currItem;
            this.p2currItem = piece;
            if (this.p2prevItem == null) {this.p2prevItem = this.p2currItem;}
            this.stopMovement(piece);
            this.keyIsPressed2 = false;
            // The deceleration event timer of an item must be removed and reset if the current item was the previous item (i.e. the player threw an item
            // and took the same item again). This is so that if the item is thrown, picked up, and thrown again very quickly, the old
            // deceleration event of the old throw doesn't overlap with the new deceleration event of the new throw and affect the throw.
            if ((this.throwTimer2 != null) && (this.p2prevItem  == this.p2currItem)) {
            	this.game.time.events.remove(this.throwTimer2);
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
    		else if (piece == this.p2currItem) {this.p2Possess = false;}
    		piece.kill();
    	}
    	if (this.pieces.countLiving() == 0) { // Ends the game once all pieces have been brought back
    		// The players win; call quitGame
    		this.playersWin = true;
    		this.quitGame();
    	}
    },

    eachEnemy: function () {
    	this.enemies.forEach(this.chasePlayer, this, null);
    },

    chasePlayer: function (enemy) {
    	if (enemy.x < (this.game.world.width/2)) { // If the enemy is on the left half of the screen, follow player 1
    		this.game.physics.arcade.moveToObject(enemy, this.player1, 10);
    	}
    	else { // If the enemy is on the right half of the screen, follow player 2
    		this.game.physics.arcade.moveToObject(enemy, this.player2, 10);
    	}
    },

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
		else if (bullet.color == "yellow") {
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
		}
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
    	if (player == this.player2) {
    		this.p2currItem.body.velocity.setTo(0,0);
    		this.p2currItem.body.acceleration.setTo(0,0);
    		this.p2Possess = false;
    	}
    	else if (player == this.player1) {
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
    		else if (player == this.player2) {
    			// this.p2currItem.body.velocity.setTo(0,0);
    			// this.p2currItem.body.acceleration.setTo(0,0);
    			if (this.keyIsPressed2 == true) {
    				this.game.time.events.add(Phaser.Timer.SECOND * 3, this.setPossessionFalse, this, this.player2);
    			}
    			else if (this.p2currItem != null) {
    				this.p2currItem.body.velocity.setTo(0,0);
		    		this.p2currItem.body.acceleration.setTo(0,0);
		    		this.p2Possess = false;
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
    	if ((this.player1.alive == false) && (this.player2.alive == false)) { // The game ends if both players are dead
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
    	if (player == this.player2) {
    		player.reset((this.game.world.width/4)*3, this.game.world.centerY);
    		this.player2.spawnBeginning = this.game.time.now+3000; // Invulnerable for 3 seconds
    		
    		// https://phaser.io/examples/v2/tweens/yoyo
    		// https://phaser.io/docs/2.4.4/Phaser.Tween.html
    		this.player2.alpha = 1;
		    // Fade player1 to alpha 0 over 1/2 of a second, and back to 1 over 1/2 of a second
		    var tween = this.game.add.tween(this.player2).to( { alpha: 0 }, 500, "Linear", true, 0, -1);
		    tween.yoyo(true, 0);
		    // Performs the blinking tween 3 times total (repeat twice after the first time)
		    tween.repeat(2);
    	}
    	else {
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
    	}
    },

    quitGame: function () {

    	this.finalTime = this.game.time.totalElapsedSeconds()-this.timeSoFar;

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
