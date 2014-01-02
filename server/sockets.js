var http = require('http');
var server = http.createServer(function(request, response) {});

var count = 0;
var clients = {};
var noPairs = [];

server.listen(1234, function() {
    console.log((new Date()) + ' Server is listening on port 1234');
});


var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
    httpServer: server
});


wsServer.on('request', function(r){
    // Code here to run on connection
    var connection = r.accept('echo-protocol', r.origin);

    // Specific id for this client & increment count
	var id = count++;
	// Store the connection method so we can use it later.
	clients[id] = 
	{
		connection : connection,
		pair : null,
		id : id
	}
	connection.sendUTF(id);
	if (noPairs.length == 0){
		//If there are no valid matches, then queue up for a match.
		noPairs.push(clients[id]);
	}else{
		//Match up with whomever has been waiting the longest.
		clients[id].pair = noPairs[0].connection;
		clients[noPairs[0].id].pair = clients[id].connection;
		clients[id].connection.sendUTF("connected");
		clients[id].pair.sendUTF("connected");
		noPairs.splice(0, 1);

	}

	

	console.log((new Date()) + ' Connection accepted [' + id + ']');


	// Create event listener
	connection.on('message', function(message) {
		console.log(message);
		if (message.utf8Data.indexOf(":::") != -1){
			var data = message.utf8Data.split(':::');
		}else{
			console.log("Null!!!  " + message.utf8Data);
			return;
		}

		/*
		if (data.length < 2) {
			console.log("Null!!!  " + message.utf8Data);
			return;
		}
		*/

		//The id of the user sending the message.
		var _id = data[0];

	    // The message that was sent to us.
	    var msg = data[1];

	    //Send the message to the user's pair.
	    clients[id].pair.sendUTF(msg);

	});

	connection.on('close', function(reasonCode, description) {
	    delete clients[id];
	    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});
});




