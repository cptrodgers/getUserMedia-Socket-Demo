# webRTC-Streaming ( Live stream get data from camera and mic by browser)
* This is a very simple how to use WebRTC + WebSocket (socket.io libary) streaming video from mic + camera of device run browser. 
* You have 2 part. 1 Client side and Server Side. You can custom it with your project + your database. 
* I recommend you nginx-rtmp. This proxy help you save more time for problem streaming file from server to client with more api useful. 

##Server side:
At server side, we will received buffer data from client side (browser) and we will write it to a file you create from fs. It's so easy
```
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
```


Client Size :
Browser provide WebRTC help you can received data from device micro and camera. But it's write to a strore. You so hard and try hard to processing data of it. I find easy solution. And i using a example WebRTC of Sam Dutton about and config some code. Awesome. You have a solution for streaming video from browser :D.

* I add libary socket.io (websocket) and connect to server side
```
function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
    socket.emit('blob', event.data);
  }
}
```
* I split video + camera with 10ms and send it to server.
```
function startRecording() {
  var options = { mimeType: 'video/webm', bitsPerSecond: 100000 };
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e0) {
    console.log('Unable to create MediaRecorder with options Object: ', e0);
    try {
      options = { mimeType: 'video/webm,codecs=vp9', bitsPerSecond: 100000 };
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e1) {
      console.log('Unable to create MediaRecorder with options Object: ', e1);
      try {
        options = 'video/vp8'; // Chrome 47
        mediaRecorder = new MediaRecorder(window.stream, options);
      } catch (e2) {
        alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
        console.error('Exception while creating MediaRecorder:', e2);
        return;
      }
    }
  }
  console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
  recordButton.textContent = 'Stop Recording';
  playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(10); // collect 10ms of data
  console.log('MediaRecorder started', mediaRecorder);
}
```


* Awesome. Server received and you can open test video. :D. Hope this guide can help you. You can see full example client in index.html in source tree.

## Note:
If you want streaming everything. You can thing more about latency of problem. Latency of write action > latency of read action. I recommend you read file streaming from server to client 0.95x. You can change 0.95x to other number. But i think it will make you have more 24fps. :D. 


## Contact
This guide used source from 
https://rawgit.com/Miguelao/demos/master/mediarecorder.html by  Sam Dutton

If you have any question about live streaming. You can ask me via email:
cptrodgers@gmail.com. I will try research and support for you if i can. 