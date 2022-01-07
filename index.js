const express = require("express");
const socket = require("socket.io");
const app = express();
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(
    cors({credentials: true, origin: true, methods: "GET,POST,PUT,DELETE",}) 
);

require("./db");

//role
const roleRouter = require("./Routers/Route/Role");
app.use(roleRouter);

//user
const userRouter = require("./Routers/Route/user");
app.use(userRouter);


//post
const postRouter = require("./Routers/Route/post");
app.use(postRouter);

//inquiry
const inquiryRouter = require("./Routers/Route/inquiry");
app.use(inquiryRouter);

//comment
const commentsRouter = require("./Routers/Route/comment");  
app.use(commentsRouter);

const appointmentRouter = require("./Routers/Route/appointment");
app.use(appointmentRouter);

const rateRouter = require("./Routers/Route/rating");  
app.use(rateRouter);


const PORT = process.env.PORT /*|| 5000*/;
const server = app.listen(PORT , () => {
    console.log(`Server run on ${PORT}`);
})

//
const io = socket(server, {
    cors: {
      origin: process.env.ORIGIN_CORS,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  
  io.on("connection", (socket) => {
    socket.on("join_room", (data) => {
      socket.join(data.room);
      console.log(`${data.userName} has entered the room number ${data.room}`);
    });
  
    socket.on("send_message", (data) => {
      io.emit("recieve_message", {
          userName: data.userName,
          content: data.content,
        });
    });
  });
  