// import {WebSocketServer} from "ws";
const { log } = require('console');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
//http is the server on which socket needs to work

http.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})

app.use(express.static(__dirname + '/public'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

//dev : nodemon server

const io = require('socket.io')(http);

io.on('connection', (socket)=>{
   console.log("Connected ...")

   socket.on('message', (msg) =>{
      
       socket.broadcast.emit('message', msg)
       
       //can write anything instead of message
       //sends message to all the clients except for himself
   })
})


