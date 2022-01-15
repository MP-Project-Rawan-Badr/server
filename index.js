const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const cors = require("cors");
app.use(cors());

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






const PORT = process.env.PORT /*|| 5000*/;
app.listen(PORT , () => {
    console.log(`Server run on ${PORT}`);
})

