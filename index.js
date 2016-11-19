var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs =require('fs');
var ffmpeg =require('fluent-ffmpeg');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var outStream = fs.createWriteStream('/home/hien/Record-WebRTC/upload/test3.mp4');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('blob', function(data){
      console.log(data);
      outStream.write(data);
   })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});