var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})

http.listen(3000, function() {
	console.log('listening on :3000')
})

io.on('connection', function(socket) {
	console.log('a user connected')
	socket.on('disconnect', function() {
		console.log('user disconnected')
	})

	socket.on('chat message', function(msg, fn) {
		io.emit('chat message', msg, fn)
	})

	// io.emit('some event', { for: 'everyone' });
	// socket.broadcast.emit('hi');
})
