var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app).listen(3001),
    io = require('socket.io').listen(server);

app.get('/', function(req, res) {
  res.send('hello world');
});

var resJson = function(res, obj){
  res.setHeader('Content-Type', "application/json");
  res.end(JSON.stringify(obj));
}

io.sockets.on('connection', function(socket){

  socket.on('connect_room', function(data){
    socket.join(data.room_id);
    console.log('connected room room_id: ' + data.room_id);
  });

  app.post('/comment/:room_id', function(req, res) {
    room_id = req.params.room_id;
    socket.broadcast.to(room_id).emit('emit_comment', room_id);
    console.log('comment delivery room_id: ' + room_id);
    resJson(res, {response: "OK"});
  });
});

console.log("server starting...");
