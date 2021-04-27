
var Client = {};

// Client.socket = null;

// Only connect to the server when explicitly requested; this is invoked in WaitingRoom.js so that clients
// connect to a game only if they go to the Waiting Room, i.e. they want to play the main 2-player game
Client.connectToServer = function() {
	Client.socket = io.connect();

// Putting player into waiting room (if there is currently no other player to partner up with)

	Client.socket.on('startWaitingRoom', function() {
		BasicGame.MainMenu.prototype.startWaitingRoom();
	});

// Starting a game

	// Receive from server
	Client.socket.on('startGame', function(){
		BasicGame.WaitingRoom.prototype.startGame();
	});

//////////////////////////////////////////////////////// For Game.js only!!! ///////////////////////////////////////////////////////////

	// Tutorial: "This method will use our socket object, and send through it a message to the
	// server. This message will have the label 'newplayer', which is self-explanatory. A second
	// argument could be added to pass additional data, but it won't be needed in this case."
	Client.askNewPlayer = function() {
		Client.socket.emit('newplayer');
	};

	// Tutorial: "We now need to adapt the clients so they can process the 'allplayers' and 'newplayer' messages from the server in return,
	// thus completing the loop `connect - notify the server I'm here - get info in return - display it`.
	// Note that the 'newplayer' message sent by the client and the one sent by the server are not the same; I chose to give them the same
	// label because they convey the same kind of information, but they will be treated separately since they have different endpoints (the
	// server for the former, the client for the latter)."
	// "As you can see, the same syntax to handle messages can be used on the client side. When data is sent along a message, it can be
	// retrieved as the first argument of the callback on the receiving end. Therefore, the 'data' object fed to the 'newplayer' callback
	// corresponds to the socket.player data sent by the server."
	// if (Client.socket != null) {
	Client.socket.on('newplayer',function(data){
		console.log("In client.js 'newplayer'");
		console.log(`From Client.socket.on newplayer in client.js... data.id: ${data.id}, data.x: ${data.x}, data.y: ${data.y}, data.playerSide: ${data.playerSide}`);
	    BasicGame.Game.prototype.addNewPlayer(data.id,data.x,data.y,data.playerSide); // The way we have structured the game system, we need to go into the .prototype to access the addNewPlayer function
	});
	// }

	Client.socket.on('myplayer',function(data){
		console.log(`From Client.socket.on myplayer in client.js... data.id: ${data.id}, data.x: ${data.x}, data.y: ${data.y}, data.playerSide: ${data.playerSide}`);
	    BasicGame.Game.prototype.addMyGameElements(data.id,data.x,data.y,data.playerSide); // The way we have structured the game system, we need to go into the .prototype to access the addNewPlayer function
	});

	// "...For the 'allplayers' message, [the data] is a list of socket.player objects. In both cases, this data is processed by calling
	// Game.addNewPlayer(), which we can now define in Game.js"
	Client.socket.on('allplayers',function(data){
		console.log("In client.js 'allplayers'. data: ");
	    console.log(data);
	    for(var i = 0; i < data.length; i++){
	        BasicGame.Game.prototype.addNewPlayer(data[i].id,data[i].x,data[i].y);
	    }
	});

	// Process the 'remove' message, which is emitting when a player disconnects from the game
	Client.socket.on('remove',function(id){
	    BasicGame.Game.prototype.removePlayer(id);
	});

// Updating player movement

	// Here, we just send the player position coordinates to the server, with the label 'playerPosUpdated'.
	// Tutorial: "No need to send any player id, since the socket is client-specific and associated to only one player."
	Client.updatePlayerPos = function(x,y) {
		Client.socket.emit('playerPosUpdated',{x:x,y:y});
	}

	// Here we wait for the 'movePlayer' message from the server
	// Tutorial: "we need to handle the 'move' message from the server, so that the clients can react to another player moving"
	Client.socket.on('movePlayer',function(data){
	    BasicGame.Game.prototype.movePlayer(data.id,data.x,data.y);
	});

// Creating a new enemy

	// Send to server
	Client.askNewEnemy = function(id,color,x,y) { // Note: id is the name of the enemy
		Client.socket.emit('newEnemy', {id:id, color:color, x:x, y:y});
	}

	// Receive from server
	Client.socket.on('addNewEnemy',function(data){
	    BasicGame.Game.prototype.addNewEnemy(data.id, data.color, data.x, data.y);
	});

// Updating enemy movement

	// Send to server
	Client.updateEnemyPos = function(id,x,y) {
		Client.socket.emit('enemyPosUpdated', {id:id, x:x, y:y});
	}

	// Receive from server
	Client.socket.on('moveEnemy',function(data){
	    BasicGame.Game.prototype.moveEnemy(data.id, data.x, data.y);
	});

// Kill enemy

    Client.updateKilledEnemy = function(id){
    	Client.socket.emit('enemyKillUpdated', {id:id});
    }

    Client.socket.on('killEnemyRemote',function(data){
    	BasicGame.Game.prototype.killEnemyRemote(data.id);
    });

// Updating object movement

	// Send to server
	Client.updateObjMotion = function(objName, objPlayer, objColor, velocityX, velocityY, dragX, dragY) {
		Client.socket.emit('objectMotionUpdated',{objName:objName, objPlayer:objPlayer, objColor:objColor, velocityX:velocityX, velocityY:velocityY, dragX:dragX, dragY:dragY});
	}

	// Receive from server
	Client.socket.on('moveObject_velocity',function(data){
	    BasicGame.Game.prototype.moveObject_velocity(data.objName, data.objPlayer, data.objColor, data.velocityX, data.velocityY, data.dragX, data.dragY);
	});

// Updating object position

	// Send to server
	Client.updateObjPosition = function(objName,objPlayer,objColor,positionX,positionY) {
		Client.socket.emit('objectPosUpdated',{objName:objName, objPlayer:objPlayer, objColor:objColor, positionX:positionX, positionY:positionY});
	}

	// Receive from server
	Client.socket.on('moveObject_position',function(data){
	    BasicGame.Game.prototype.moveObject_position(data.objName, data.objPlayer, data.objColor, data.positionX, data.positionY);
	});

// Updating killed piece

	// Send to server
	Client.updateKilledPiece = function(objName,objPlayer,objColor) {
		Client.socket.emit('pieceKilled',{objName:objName, objPlayer:objPlayer, objColor:objColor});
	}

	// Receive from server
	Client.socket.on('killPiece',function(data){
	    BasicGame.Game.prototype.killPieceAndCheckRemaining_receive(data.objName, data.objPlayer, data.objColor);
	});

// Creating a bullet

	Client.askNewBullet = function(id,color,x,y) { // Note: id is the name of the bullet
		Client.socket.emit('newBullet',{id:id, color:color, x:x, y:y});
	}

	Client.socket.on('addNewBullet',function(data){
		BasicGame.Game.prototype.addNewBullet(data.id, data.color, data.x, data.y);
	});

// Firing a bullet

	Client.updateFiredBullet = function(id,xPos,yPos,xVel,yVel) {
		Client.socket.emit('bulletFired',{id:id, xPos:xPos, yPos:yPos, xVel:xVel, yVel:yVel});
	}

	Client.socket.on('fireBulletRemote',function(data){
		BasicGame.Game.prototype.fireBulletRemote(data.id, data.xPos, data.yPos, data.xVel, data.yVel);
	});

// Killing a bullet

	Client.killFiredBullet = function(id) {
		Client.socket.emit('bulletKilled',{id:id});
	}

	Client.socket.on('killBulletRemote',function(data){
		BasicGame.Game.prototype.killBulletRemote(data.id);
	});

// Manually disconnect a player's socket (useful when one player leaves and we need to force the other one to leave too)

	// Client.manuallyDisconnect = function() {
	// 	Client.socket.emit('closePlayerSocket');
	// }

// Ending a game

	// Send to server
	Client.updateGameOverStatus = function(didPlayersWin) {
		Client.socket.emit('gameOverSignaled',{didPlayersWin:didPlayersWin});
	}

	Client.socket.on('quitGame', function(data) {
		BasicGame.Game.prototype.quitGame(data.didPlayersWin);
	});

// Sending a message from one player to the other

	// Send to server
    Client.sendMessageToOtherPlayer = function(message) {
    	Client.socket.emit('sendPlayerMessage',{message:message});
    }

    // Receive from server
    Client.socket.on('messageSent', function(message){
    	BasicGame.Game.prototype.displayReceivedMessage(message);
    });

/////// End "For Game.js only!!!"


//////////////////////////////////////////////////////// For GameLvl2.js only!!! ///////////////////////////////////////////////////////////

	// Tutorial: "This method will use our socket object, and send through it a message to the
	// server. This message will have the label 'newplayer', which is self-explanatory. A second
	// argument could be added to pass additional data, but it won't be needed in this case."
	Client.askNewPlayer_Lvl2 = function() {
		Client.socket.emit('newplayer_Lvl2');
	};

	// Tutorial: "We now need to adapt the clients so they can process the 'allplayers' and 'newplayer' messages from the server in return,
	// thus completing the loop `connect - notify the server I'm here - get info in return - display it`.
	// Note that the 'newplayer' message sent by the client and the one sent by the server are not the same; I chose to give them the same
	// label because they convey the same kind of information, but they will be treated separately since they have different endpoints (the
	// server for the former, the client for the latter)."
	// "As you can see, the same syntax to handle messages can be used on the client side. When data is sent along a message, it can be
	// retrieved as the first argument of the callback on the receiving end. Therefore, the 'data' object fed to the 'newplayer' callback
	// corresponds to the socket.player data sent by the server."
	// if (Client.socket != null) {
	Client.socket.on('newplayer_Lvl2',function(data){
		console.log("In client.js 'newplayer_Lvl2'");
		console.log(`From Client.socket.on newplayer_Lvl2 in client.js... data.id: ${data.id}, data.x: ${data.x}, data.y: ${data.y}, data.playerSide: ${data.playerSide}`);
	    BasicGame.GameLvl2.prototype.addNewPlayer(data.id,data.x,data.y,data.playerSide); // The way we have structured the game system, we need to go into the .prototype to access the addNewPlayer function
	});
	// }

	Client.socket.on('myplayer_Lvl2',function(data){
		console.log(`From Client.socket.on myplayer_Lvl2 in client.js... data.id: ${data.id}, data.x: ${data.x}, data.y: ${data.y}, data.playerSide: ${data.playerSide}`);
	    BasicGame.GameLvl2.prototype.addMyGameElements(data.id,data.x,data.y,data.playerSide); // The way we have structured the game system, we need to go into the .prototype to access the addNewPlayer function
	});

	// "...For the 'allplayers' message, [the data] is a list of socket.player objects. In both cases, this data is processed by calling
	// Game.addNewPlayer(), which we can now define in Game.js"
	Client.socket.on('allplayers_Lvl2',function(data){
		console.log("In client.js 'allplayers_Lvl2'. data: ");
	    console.log(data);
	    for(var i = 0; i < data.length; i++){
	        BasicGame.GameLvl2.prototype.addNewPlayer(data[i].id,data[i].x,data[i].y);
	    }
	});

	// Process the 'remove' message, which is emitting when a player disconnects from the game
	Client.socket.on('remove_Lvl2',function(id){
	    BasicGame.GameLvl2.prototype.removePlayer(id);
	});

// Updating player movement

	// Here, we just send the player position coordinates to the server, with the label 'playerPosUpdated'.
	// Tutorial: "No need to send any player id, since the socket is client-specific and associated to only one player."
	Client.updatePlayerPos_Lvl2 = function(x,y) {
		Client.socket.emit('playerPosUpdated_Lvl2',{x:x,y:y});
	}

	// Here we wait for the 'movePlayer' message from the server
	// Tutorial: "we need to handle the 'move' message from the server, so that the clients can react to another player moving"
	Client.socket.on('movePlayer_Lvl2',function(data){
	    BasicGame.GameLvl2.prototype.movePlayer(data.id,data.x,data.y);
	});

// Updating object movement

	// Send to server
	Client.updateObjMotion_Lvl2 = function(objName, objPlayer, objColor, velocityX, velocityY, dragX, dragY) {
		Client.socket.emit('objectMotionUpdated_Lvl2',{objName:objName, objPlayer:objPlayer, objColor:objColor, velocityX:velocityX, velocityY:velocityY, dragX:dragX, dragY:dragY});
	}

	// Receive from server
	Client.socket.on('moveObject_velocity_Lvl2',function(data){
	    BasicGame.GameLvl2.prototype.moveObject_velocity(data.objName, data.objPlayer, data.objColor, data.velocityX, data.velocityY, data.dragX, data.dragY);
	});

// Updating object position

	// Send to server
	Client.updateObjPosition_Lvl2 = function(objName,objPlayer,objColor,positionX,positionY) {
		Client.socket.emit('objectPosUpdated_Lvl2',{objName:objName, objPlayer:objPlayer, objColor:objColor, positionX:positionX, positionY:positionY});
	}

	// Receive from server
	Client.socket.on('moveObject_position_Lvl2',function(data){
	    BasicGame.GameLvl2.prototype.moveObject_position(data.objName, data.objPlayer, data.objColor, data.positionX, data.positionY);
	});

// Updating killed piece

	// Send to server
	Client.updateKilledPiece_Lvl2 = function(objName,objPlayer,objColor) {
		Client.socket.emit('pieceKilled_Lvl2',{objName:objName, objPlayer:objPlayer, objColor:objColor});
	}

	// Receive from server
	Client.socket.on('killPiece_Lvl2',function(data){
	    BasicGame.GameLvl2.prototype.killPieceAndCheckRemaining_receive(data.objName, data.objPlayer, data.objColor);
	});

// Manually disconnect a player's socket (useful when one player leaves and we need to force the other one to leave too)

	// Client.manuallyDisconnect = function() {
	// 	Client.socket.emit('closePlayerSocket');
	// }

// Ending a game

	// Send to server
	Client.updateGameOverStatus_Lvl2 = function(didPlayersWin) {
		Client.socket.emit('gameOverSignaled_Lvl2',{didPlayersWin:didPlayersWin});
	}

	Client.socket.on('quitGame_Lvl2', function(data) {
		BasicGame.GameLvl2.prototype.quitGame(data.didPlayersWin);
	});

// Sending a message from one player to the other

	// Send to server
    Client.sendMessageToOtherPlayer_Lvl2 = function(message) {
    	Client.socket.emit('sendPlayerMessage_Lvl2',{message:message});
    }

    // Receive from server
    Client.socket.on('messageSent_Lvl2', function(message){
    	BasicGame.GameLvl2.prototype.displayReceivedMessage(message);
    });

/////// End "For GameLvl2.js only!!!"


};