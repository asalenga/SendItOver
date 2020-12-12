"use strict";

BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.background.width = this.game.world.width;
		this.background.height = this.game.world.height;
		this.preloadBar = this.add.sprite(this.game.world.centerX, 400, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5,0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
		this.load.image('titlePage', 'assets/title.jpg');
		this.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
		this.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
		this.load.image('titleText', 'assets/SendItOver!Title3.png'); // Source: https://fontmeme.com/pixel-fonts/

		//	+ lots of other required assets here
        this.load.image( 'player1', 'assets/Astronaut1.png' );
        this.load.image( 'player2', 'assets/Astronaut2.png' );
        this.load.image( 'wall', 'assets/Wall.png' );
        
        this.load.image( 'RedP1', 'assets/RedP1.png' );
        this.load.image( 'YellowP1', 'assets/YellowP1.png' );
        this.load.image( 'GreenP1', 'assets/GreenP1.png' );
        this.load.image( 'BlueP1', 'assets/BlueP1.png' );
        
        this.load.image( 'RedP2', 'assets/RedP2.png' );
        this.load.image( 'YellowP2', 'assets/YellowP2.png' );
        this.load.image( 'GreenP2', 'assets/GreenP2.png' );
        this.load.image( 'BlueP2', 'assets/BlueP2.png' );

        this.load.image( 'RedGate', 'assets/RedGate.png' );
        this.load.image( 'YellowGate', 'assets/YellowGate.png' );
        this.load.image( 'GreenGate', 'assets/GreenGate.png' );
        this.load.image( 'BlueGate', 'assets/BlueGate.png' );

        this.load.image( 'P1Ship', 'assets/P1Ship.png' );
        this.load.image( 'P2Ship', 'assets/P2Ship.png' );

        this.load.image( 'RedEnemy', 'assets/RedEnemy.png' );
        this.load.image( 'YellowEnemy', 'assets/YellowEnemy.png' );
        this.load.image( 'GreenEnemy', 'assets/GreenEnemy.png' );
        this.load.image( 'BlueEnemy', 'assets/BlueEnemy.png' );

        this.load.image( 'RedGun', 'assets/RedGun.png' );
        this.load.image( 'YellowGun', 'assets/YellowGun.png' );
        this.load.image( 'GreenGun', 'assets/GreenGun.png' );
        this.load.image( 'BlueGun', 'assets/BlueGun.png' );

        this.load.image( 'RedBullet', 'assets/RedBullet.png' );
        this.load.image( 'YellowBullet', 'assets/YellowBullet.png' );
        this.load.image( 'GreenBullet', 'assets/GreenBullet.png' );
        this.load.image( 'BlueBullet', 'assets/BlueBullet.png' );

	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
		// if (this.cache.isSoundDecoded('titleMusic') && this.ready == false)
		// {
		// 	this.ready = true;
			this.state.start('MainMenu');
		// }

	}

};
