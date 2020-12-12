"use strict";

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

		this.music = this.add.audio('titleMusic');
		this.music.play();

		// this.add.sprite(0, 0, 'titlePage');

		this.titleText = this.add.sprite(this.world.centerX, 370, 'titleText');
		// this.titleText = this.add.text(this.world.centerX, 350, 'Send It Over!', {font: "30px Verdana", fill: "#00FF00", align: "center"});
		this.titleText.height = 50;
		this.titleText.anchor.setTo(0.5,0.5);
		// this.game.physics.enable( this.titleText, Phaser.Physics.ARCADE );

		this.p1text = this.add.text(this.world.width/5, this.world.height-200, 'Player 1:\nW A S D keys to move\n1 key to throw a held item\n2 key to fire (if holding a weapon)', {font: "20px Verdana", fill: "#FFFFFF", align: "center"});
		this.p1text.anchor.setTo(0.5,0.5);
		this.p2text = this.add.text(4 * this.world.width/5, this.world.height-200, 'Player 2:\narrow keys to move\nh key to throw a held item\nj key to fire (if holding a weapon)', {font: "20px Verdana", fill: "#FFFFFF", align: "center"});
		this.p2text.anchor.setTo(0.5,0.5);

		this.storyText = this.add.text(this.world.centerX, 50, "Two astronauts (you) have been stranded on an alien planet. Your ships have been severely\ndamaged, and the pieces of your ships have been scattered throughout the map. You must\ngather these pieces (they are labeled either P1 or P2; also, notice their shape) and bring\nthem back to your respective ships to rebuild, and escape! But, that's easier said than done.\nSomehow you've been (conveniently) separated from each other by a wall spanning the\nlength of the terrain. What's strange though, is that the wall appears to have different\ncolored gates. You can't pass through the wall or gates, but what about items?\nYou see 4 rayguns on the ground, and you soon find out what they're for...", {font: "20px Verdana", fill: "#FFFFFF", align: "center"});
		// \nTo get off this planet, you must work together and...
		this.storyText.anchor.setTo(0.5,0);

		this.playButton = this.add.button( this.world.centerX, this.world.height-100, 'playButton', this.startGame, this, 'over', 'out', 'down');
		this.playButton.anchor.setTo(0.5,0.5);

		// this.val = 50;

	},

	update: function () {

		//	Do some nice funky main menu effect here
		
		// this.titleText.body.acceleration.setTo(0,this.val);
		// this.val = -1*this.val;

	},

	startGame: function (pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		this.music.stop();
		// this.timeSoFar = this.game.time.totalElapsedSeconds();

		//	And start the actual game
		this.state.start('Game');

	}

};
