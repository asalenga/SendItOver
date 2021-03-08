
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html'); 
});

server.listen(8081,function(){ // Listens to port 8081
    console.log('Listening on '+server.address().port);
});

server.lastPlayderID = 0; // Keep track of the last id assigned to a new player

// Tutorial: "We tell Socket.io to listen to the 'connection' event, which is fired each time a client connects to the server 
// (using io.connect()). When this happens, it should call the callback specified as the second argument. This callback receives
// as first argument the socket used to establish the connection, which, just like the client socket, can be used to pass messages."
io.on('connection',function(socket){

	// Tutorial: "Using the socket.on() method from the socket objects, it is possible to specify callbacks to handle different
	// messages. Therefore each time a specific client sends a specific message through his socket, a specific callback will be
	// called in reaction. In this case, we define a callback to react to the 'newplayer' message."
    socket.on('newplayer',function(){

    	// Tutorial: "First, we create a new custom object, used to represent a player, and store it in the socket object. As you can see,
    	// it's possible to add arbitrary client-specific properties to the socket object, making them convenient to access. In this object,
    	// we give the player a unique id (that will be used on the client side), and we randomly determine the position of the sprite."
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
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

