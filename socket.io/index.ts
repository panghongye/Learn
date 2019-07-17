var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', function (req:any, res) {
  res.sendFile(__dirname + '/index.html')
})

http.listen(3004, function () {
  console.log('listening on :3000')
})

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });

  io.emit('some event', { for: 'everyone' });
  socket.broadcast.emit('hi');


})

