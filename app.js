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
  app.post('/comment/:room_id', function(req, res) {
    room_id = req.params.room_id;
    //res.send('comment no: ' + room_id);
    console.log('room_id: ' + room_id);
    resJson(res, {response: "OK"});
  });
});

console.log("server starting...");
