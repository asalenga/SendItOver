"use strict";

BasicGame.LoseScreen = function (game) {

	this.loseMessage = null;

};

BasicGame.LoseScreen.prototype = {

	create: function () {

		this.loseMessage = this.add.text(this.world.centerX, this.world.centerY, "OOF. The aliens gotchu. You've been put into their local zoo\nto serve as entertainment for their young alien children.\nYou lost.\n\n...unless you enjoy being in the zoo\n\nGAME OVER", {font: "30px Verdana", fill: "#FFFFFF", align: "center"});
		this.loseMessage.anchor.setTo(0.5,0.5);

		let returnToMenuButtonLabel_style = { font: "25px DIN Alternate", fill: "#FFFFFF", align: "center" };

		// Create the "Return to Main Menu" button
        this.returnToMenuButton = game.add.button( game.world.centerX, this.winMessage.y + this.winMessage.height/2 + 70, 'playButton', this.returnToMenuButtonClicked, this);
        this.returnToMenuButton.anchor.setTo(0.5,0.5);
        this.returnToMenuButton.width = 235;
        this.returnToMenuButton.height = 80;

        // Text for the return to menu button
        this.returnToMenuButtonLabel = this.game.add.text( this.returnToMenuButton.x, this.returnToMenuButton.y, 'Return to Main Menu' , returnToMenuButtonLabel_style);
        this.returnToMenuButtonLabel.anchor.setTo(0.5, 0.5);
        this.returnToMenuButtonLabel.alpha = 1;

	},

	update: function () {



	},

	returnToMenuButtonClicked: function() {
        this.state.start('MainMenu');
    }

};