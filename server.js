
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));			// These lines allow the server
app.use('/assets',express.static(__dirname + '/assets'));	// to serve our static files

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html'); 
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

server.lastPlayerID = 0; // Keep track of the last id assigned to a new player

// We check if there is a player connected to the server who is waiting for another player to join
// Inspired by tutorial: "JavaScript Game Dev - Multiplayer Match", https://youtu.be/nQC7VEIyQPI
let waitingPlayer = null;

// Tutorial: "We tell Socket.io to listen to the 'connection' event, which is fired each time a client connects to the server 
// (using io.connect()). When this happens, it should call the callback specified as the second argument. This callback receives
// as first argument the socket used to establish the connection, which, just like the client socket, can be used to pass messages."
io.on('connection',function(socket){

	// If there is a waiting player, match them with the joining player--who is passed in as the "socket" variable--and start a game
	if (waitingPlayer) {

		// // Send the same message to both players
		// [socket,waitingPlayer].forEach((s) => s.emit('message', 'Game Starts!'));

		[socket,waitingPlayer].forEach((s) => s.emit('startGame'));
		// waitingPlayer.emit('startGame', 'p1');
		// socket.emit('startGame', 'p2');

		// waitingPlayer = null;

	} else { // Otherwise, there is no currently waiting player, so the joining player becomes the waiting player

		waitingPlayer = socket;
		// waitingPlayer.emit('message', 'Waiting for a partner');

	}

	// Tutorial: "Using the socket.on() method from the socket objects, it is possible to specify callbacks to handle different
	// messages. Therefore each time a specific client sends a specific message through his socket, a specific callback will be
	// called in reaction. In this case, we define a callback to react to the 'newplayer' message."
    socket.on('newplayer',function(){

    	var xPos = 0;
    	var yPos = 0;
    	if (socket === waitingPlayer) {
    		xPos = 300;
    		yPos = 300;
    	} else {
    		xPos = 900;
    		yPos = 300;
    	}

		waitingPlayer = null;

    	// Tutorial: "First, we create a new custom object, used to represent a player, and store it in the socket object. As you can see,
    	// it's possible to add arbitrary client-specific properties to the socket object, making them convenient to access. In this object,
    	// we give the player a unique id (that will be used on the client side), and we randomly determine the position of the sprite."
        socket.player = {
            id: server.lastPlayerID++,
            x: xPos,//randomInt(100,400),
            y: yPos//randomInt(100,400)
        };
        // Tutorial: "Then, we want to send to the new player the list of already connected players.
        // Socket.emit() sends a message to one specific socket. Here, we send to the newly connected client a message labeled 'allplayers',
        // and as a second argument, the output of Client.getAllPlayers() which will be an array of the currently connected players. This
        // allows newly connected players to get up to date with the amount and positions of the already connected players."
        socket.emit('allplayers',getAllPlayers());
        // Tutorial: "The socket.emit.broadcast() sends a message to all connected sockets, *except* the socket who triggered the callback.
        // It allows to broadcast events from a client to all other clients without echoing them back to the initiating client. Here, we
        // broadcast the 'newplayer' message, and send as data the new player object."
        socket.broadcast.emit('newplayer',socket.player);
        socket.emit('myplayer',socket.player);

        // This is called when the Client sends the message to update the player position
        // Tutorial: "The x and y fields of the player property of the socket are updated with the new coordinates, and then immediately
        // broadcast to everyone so they can see the change. Now the full socket.player object is sent, because the other clients need to
        // know the id of the player who is moving, in order to move the proper sprite on-screen"
        socket.on('playerPosUpdated',function(data){
            // console.log('Player moved to '+data.x+', '+data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            socket.broadcast.emit('move',socket.player);
        });

        // Tutorial: "[process] the 'disconnect' message that the server automatically receives when a client actively disconnects or times out"
        // "In reaction to the 'disconnect' message, we use io.emit(), which sends a message to all connected clients. We send the message 'remove',
        // and send the id of the disconnected player to remove."
        // Note: "the 'disconnect' callback has to be registered within the 'newplayer' callback; if not, and 'disconnect' is somehow called before
        // 'newplayer', the server will crash!"
        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });

        socket.on('sendPlayerMessage',function(data){
        	console.log("data.message: "+data.message);
        	io.emit('messageSent',data.message);
        });

    });

});

// Tutorial: "io.sockets.connected is a Socket.io internal array of the sockets currently connected to the server. We can use it to iterate
// over all sockets, get the player property we have added to them (if any), and push them to a list, effectively listing the connected players."
function getAllPlayers(){
    var players = [];
    for (const socketID of Object.keys(io.sockets.sockets)) {
    	var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    }
    // Object.keys(io.sockets.connected).forEach(function(socketID){
    //     var player = io.sockets.connected[socketID].player;
    //     if(player) players.push(player);
    // });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

// Tutorial:
// "To summarize what we've done in these last few steps:
// - We listen to connections from clients and define callbacks to process the messages sent through the sockets
// - When we receive the 'newplayer' message from a client, we create a small player object that we store in the socket of the client
// - To the new client, we send a list of all the other players, so that he can display them
// - To the other clients, we send the information about the newcomer"

