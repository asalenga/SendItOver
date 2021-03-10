"use strict";

BasicGame.WaitingRoom = function (game) {

	this.waitingMessage = null;

};

BasicGame.WaitingRoom.prototype = {

	create: function () {

		this.waitingMessage = this.add.text(this.world.centerX, this.world.centerY, 'Waiting for a partner', {font: "40px Verdana", fill: "#FFFFFF", align: "center"});
		this.waitingMessage.anchor.setTo(0.5,0.5);

		Client.connectToServer();

	},

	update: function () {

		//	Do some nice funky main menu effect here
		
		// this.titleText.body.acceleration.setTo(0,this.val);
		// this.val = -1*this.val;

	},

	startGame: function () {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		// this.music.stop();
		// this.timeSoFar = this.game.time.totalElapsedSeconds();

		//	And start the actual game
		game.state.start('Game');

		// var aNewGame = new MyGame();
 
		// aNewGame.state.start('Boot');
		// aNewGame.state.start('Preloader');
		// aNewGame.state.start('Game');


	}

};
