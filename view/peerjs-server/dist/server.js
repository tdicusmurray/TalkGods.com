var fs = require('fs');
var PeerServer = require('peer').PeerServer;

var server = PeerServer({
  port: 9000,
  ssl: {
    key: fs.readFileSync('/home/sammy/workfar.com.key'),
    cert: fs.readFileSync('/home/sammy/workfar.com.crt')
  }
});
