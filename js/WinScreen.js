"use strict";

BasicGame.WinScreen = function (game) {

	this.winMessage = null;

};

BasicGame.WinScreen.prototype = {

	create: function () {

		this.winMessage = this.add.text(this.world.centerX, this.world.centerY, "Hab safe treep home. Enjoi your lipe.\nHouston, we can come back home.\nHouston, we’re coming home.\nHouston, we don’t have a problem anymore.\nHouston: Congratulations, you can come back home. We'll be waiting for you.\n\nYou win btw.", {font: "30px Verdana", fill: "#FFFFFF", align: "center"});
		this.winMessage.anchor.setTo(0.5,0.5);

	},

	update: function () {



	},

};