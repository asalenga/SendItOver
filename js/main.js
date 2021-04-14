"use strict";

// window.onload = function() {

	// var config = {
	//     type: Phaser.AUTO,
	//     width: 800,
	//     height: 600,
	//     parent: 'phaser-example',
	//     physics: {
	//         default: 'arcade',
	//         arcade: {
	//             debug: true
	//         }
	//     },
	//     scene: {
	//         preload: preload,
	//         create: create
	//     }
	// };

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	const game = new Phaser.Game( 1200, 600, Phaser.AUTO, 'game' ); // That last argument, 'game' can also be replaced by document.getElementById('game'), which means that this arg likely corresponds to the 'game' div from the index.html file

	// // this.timeSoFar = null;

	// //	Add the States your game has.
	// //	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('MainMenu', BasicGame.MainMenu);
	game.state.add('Tutorial', BasicGame.Tutorial);
	game.state.add('WaitingRoom', BasicGame.WaitingRoom);
	game.state.add('Game', BasicGame.Game);
	game.state.add('GameLvl2', BasicGame.GameLvl2);
	game.state.add('GameLvl3', BasicGame.GameLvl3);

	game.state.add('WinScreen', BasicGame.WinScreen);
	game.state.add('LoseScreen', BasicGame.LoseScreen);

	//	Now start the Boot state.
	game.state.start('Boot');

// };

// class MyGame extends Phaser.Game {

// 	constructor() {

// 		super( 1200, 600, Phaser.AUTO, 'game' );

// 		this.state.add('Boot', BasicGame.Boot);
// 		this.state.add('Preloader', BasicGame.Preloader);
// 		this.state.add('MainMenu', BasicGame.MainMenu);
// 		this.state.add('Tutorial', BasicGame.Tutorial);
// 		this.state.add('WaitingRoom', BasicGame.WaitingRoom);
// 		this.state.add('Game', BasicGame.Game);

// 		this.state.add('WinScreen', BasicGame.WinScreen);
// 		this.state.add('LoseScreen', BasicGame.LoseScreen);

// 		//	Now start the Boot state.
// 		this.state.start('Boot');

// 	}

// }

// var game = new MyGame();
