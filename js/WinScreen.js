"use strict";

BasicGame.WinScreen = function (game) {

	this.winMessage = null;

};

BasicGame.WinScreen.prototype = {

	create: function () {

		this.winMessage = this.add.text(this.world.centerX, this.world.centerY, "Houston, we no longer have a problem.\nHouston: Congratulations, you can come back home. We'll be waiting for you.\n\nHave a safe trip home. Enjoy your life.\nYou win!", {font: "30px Verdana", fill: "#FFFFFF", align: "center"});
		this.winMessage.anchor.setTo(0.5,0.5);

	},

	update: function () {



	},

};