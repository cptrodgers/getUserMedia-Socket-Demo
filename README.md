# webRTC-Streaming ( Live stream get data from camera and mic by browser)

## Requirement for demo:

```
node >= 6.x.x
```

## Server :

Idea: We will receive chunk data by websocket (socket.io) from client sent. Data will store in storage like ssd or memory for high perfomance.

```
#!bin/bash
$ cd backend && npm i
$ touch upload/test.mp4
(change path in file socket.js - /home/rodgers/opensource/webRTC-Streaming/backend/upload/test.mp4)
$ npm start
```

## Client - Browser:

Idea: Using Media Recorder Stream (https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API) for get resource from mic + camera by browser. Use websocket (socket.io) for send data to server.

```
#!bin/bash
$ cd fronend && npm i
$ npm start
```

Open localhost:3000 in browser and click start recording for start.

* Awesome. Server received and you can open test video. :D. Hope this guide can help you. You can see full example client in index.html in source tree.

## Note:
* If you want streaming everything. You can thing more about latency of problem. Latency of write action > latency of read action. I recommend you read file streaming from server to client 0.95x. You can change 0.95x to other number. But i think it will make you have more 24fps. :D. 

* For high perfomance. We need store chunks data in memory of server. And read out will better than storage like ssd and hdd.

* Now we have file recording from browser in upload directory. You can use ffmpeg for push video to RTMP server

* You also can setup nginx-rtmp with video on demands for directory uploads.

## Contact:
Hope you try to start. Because i have less time for maintain my idea. Because WebRTC maybe not fit for you.:3
****