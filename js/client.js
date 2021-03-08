
var Client = {};
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
Client.socket.on('newplayer',function(data){
	console.log(`From Client.socket.on in client.js... data.id: ${data.id}, data.x: ${data.x}, data.y: ${data.y}`);
    BasicGame.Game.prototype.addNewPlayer(data.id,data.x,data.y); // The way we have structured the game system, we need to go into the .prototype to access the addNewPlayer function
});

// "...For the 'allplayers' message, [the data] is a list of socket.player objects. In both cases, this data is processed by calling
// Game.addNewPlayer(), which we can now define in Game.js"
Client.socket.on('allplayers',function(data){
    console.log(data);
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});