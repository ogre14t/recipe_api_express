var express = require('express');
var path = require('path');

var app = express();

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '~/../src/index.html'));
});

var server = app.listen(8081, function() {
	var port = server.address().port;
	var host = server.address().address;
	console.log('Express running at http://%s:%s', host, port);
});
