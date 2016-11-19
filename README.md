# webRTC-Streaming ( Live stream get data from camera and mic by browser)

##Server side:

We using socket.io to recive buffer data and pipe it in 1 file
```
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
```


Client Size :
Using webRTC get data. And use cut data about 10ms once. After using socket.io send to server. 
Trick: We should leave after recording 1-2 seconds depending on the VPS Server latency. Use setTimeOut ^^
```
var socket = io.connect();
var mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
var mediaRecorder;
var recordedBlobs;
var sourceBuffer;

var gumVideo = document.querySelector('video#gum');
var recordedVideo = document.querySelector('video#recorded');

var recordButton = document.querySelector('button#record');
var playButton = document.querySelector('button#play');
var downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
playButton.onclick = play;
downloadButton.onclick = download;

// Use old-style gUM to avoid requirement to enable the
// Enable experimental Web Platform features flag in Chrome 49

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: true,
  video: true
};

navigator.getUserMedia(constraints, successCallback, errorCallback);

function successCallback(stream) {
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream;
  if (window.URL) {
    gumVideo.src = window.URL.createObjectURL(stream);
  } else {
    gumVideo.src = stream;
  }
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

// navigator.mediaDevices.getUserMedia(constraints)
// .then(function(stream) {
//   console.log('getUserMedia() got stream: ', stream);
//   window.stream = stream; // make available to browser console
//   if (window.URL) {
//     gumVideo.src = window.URL.createObjectURL(stream);
//   } else {
//     gumVideo.src = stream;
//   }
// }).catch(function(error) {
//   console.log('navigator.getUserMedia error: ', error);
// });

function handleSourceOpen(event) {
  console.log('MediaSource opened');
  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
  console.log('Source buffer: ', sourceBuffer);
}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
    socket.emit('blob', event.data);
  }
}

```


This guide using suorce from https://rawgit.com/Miguelao/demos/master/mediarecorder.html by  Sam Dutton

If you have question send me : cptrodgers@gmail.com. Hope you success
