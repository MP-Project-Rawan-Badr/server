const express = require("express");
const userRouter = express.Router();
const { register , activate } = require("./../Controller/user");

userRouter.post("/register" , register);
userRouter.get('/activate/:token', activate);



module.exports = userRouter; 