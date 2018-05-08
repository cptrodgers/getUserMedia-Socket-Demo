var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs =require('fs');
var ffmpeg =require('fluent-ffmpeg');

//Create a new file stream. You can write buffer data into this file.
var outStream = fs.createWriteStream('/home/rodgers/opensource/webRTC-Streaming/backend/upload/test.mp4');

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('blob', function(data){
      //You will received buffer data from browser client and you will write buffer to client.
      console.log(data);
      outStream.write(data);
   })
});


http.listen(4000, function(){
  console.log('socket listening on *:4000');
});