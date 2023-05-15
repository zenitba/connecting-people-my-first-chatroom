const express = require('express')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(http)
const port = process.env.PORT || 8000
let count = 0

app.use(express.static(path.resolve('public')))

// aantal gebruiker waneer disconnected
ioServer.on('connection', (socket) => {
  console.log('a user connected', socket.id)
  // aantal gebruiker waneer gebruiker online is
  count++
  ioServer.emit('usercount', count)

  socket.on('chat', (data) => {
    io.emit('chat', data)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
    // aantal gebruiker waneer disconnected
    count--
    ioServer.emit('usercount', count)
  })

  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
})
})

http.listen(port, () => {
  console.log('listening on http://localhost:' + port)
})