"use strict";

BasicGame.LoseScreen = function (game) {

	this.loseMessage = null;

};

BasicGame.LoseScreen.prototype = {

	create: function () {

		this.loseMessage = this.add.text(this.world.centerX, this.world.centerY, "OOF. The aliens gotchu. You've been put into their local zoo\nto serve as entertainment for their young alien children.\nYou lost.\n\n...unless you enjoy being in the zoo", {font: "30px Verdana", fill: "#FFFFFF", align: "center"});
		this.loseMessage.anchor.setTo(0.5,0.5);

	},

	update: function () {



	},

};