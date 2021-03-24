
var Client = {};

// Client.socket = null;

// Only connect to the server when explicitly requested; this is invoked in WaitingRoom.js so that clients
// connect to a game only if they go to the Waiting Room, i.e. they want to play the main 2-player game
Client.connectToServer = function() {
	Client.socket = io.connect();

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
		console.log(`From Client.socket.on newplayer in client.js... data.id: ${data.id}, data.x: ${data.x}, data.y: ${data.y}`);
	    BasicGame.Game.prototype.addNewPlayer(data.id,data.x,data.y); // The way we have structured the game system, we need to go into the .prototype to access the addNewPlayer function
	});
	// }

	Client.socket.on('myplayer',function(data){
		console.log(`From Client.socket.on myplayer in client.js... data.id: ${data.id}, data.x: ${data.x}, data.y: ${data.y}`);
	    BasicGame.Game.prototype.addMyPlayer(data.id,data.x,data.y); // The way we have structured the game system, we need to go into the .prototype to access the addNewPlayer function
	});

	// "...For the 'allplayers' message, [the data] is a list of socket.player objects. In both cases, this data is processed by calling
	// Game.addNewPlayer(), which we can now define in Game.js"
	Client.socket.on('allplayers',function(data){
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

// Updating object movement

	// Send to server
	Client.updateObjMotion = function(objName, objPlayer, objColor, velocityX, velocityY, dragX, dragY) {
		Client.socket.emit('objectPosUpdated',{objName:objName, objPlayer:objPlayer, objColor:objColor, velocityX:velocityX, velocityY:velocityY, dragX:dragX, dragY:dragY});
	}

	// Receive from server
	Client.socket.on('moveObject',function(data){
	    BasicGame.Game.prototype.moveObject(data.objName, data.objPlayer, data.objColor, data.velocityX, data.velocityY, data.dragX, data.dragY);
	});

// Starting a game

	Client.socket.on('startGame', function(){
		BasicGame.WaitingRoom.prototype.startGame();
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

};