// this is the server
const express = require('express')
const app = express();
const http = require("http");

const cors = require("cors");
const {Server} = require("socket.io");
const server = http.createServer(app);


app.use(cors());

const io = new Server(server , {
    cors:{
        origin:"http://localhost:3000",
        methods:["GET" , "POST"],
    },
});


io.on("connection" , (socket)=>{
    // console.log(`User-Connected : ${socket.id}`);

    socket.on("join_room" , (data)=>{
        socket.join(data);
        // console.log("user joined with id " , data)
    });

    socket.on("send_Message" , (data)=>{
        // console.log(data);
        socket.to(data.room).emit("receive_message",data);

    })

    socket.on("disconnect" , ()=>{
        console.log("User Disconnected", socket.id);
    });
})



server.listen(3001 , ()=>{
    console.log("Server is Running");
})