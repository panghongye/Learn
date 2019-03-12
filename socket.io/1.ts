var socket = require('socket.io-client')('http://localhost/')

socket.on('connect', function() {
  socket.send('hi')

  socket.on('message', function(msg) {
    console.log(msg)
  })
})
