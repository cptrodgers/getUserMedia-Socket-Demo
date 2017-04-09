var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs =require('fs');
var ffmpeg =require('fluent-ffmpeg');

app.get('/', function(req, res){
  res.sendfile('index.html');
});

//Create a new file stream. You can write buffer data into this file.
var outStream = fs.createWriteStream('/home/hien/Record-WebRTC/upload/test.mp4');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('blob', function(data){
      //You will received buffer data from browser client and you will write buffer to client.
      console.log(data);
      outStream.write(data);
   })
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});