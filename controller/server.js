var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {});
server.listen(1337, function() {});


WebSocket = new WebSocketServer({httpServer: server});

const { Client } = require('pg');
const database = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'talkgods',
  password: 'akjlsnflkajshdfjkwe2435623542&&&&',
  port: 5432,
});

database.connect();
database.query('LISTEN new_message');
WebSocket.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    database.on('notification', function(msg) {
       console.log(msg);
	   connection.send(msg.payload);
    });
    connection.on('close', function(connection) {});
});
