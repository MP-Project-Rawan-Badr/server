const express = require("express");
const userRouter = express.Router();
const { register , activEmail , login } = require("./../Controller/user");

//
userRouter.post("/register" , register);
userRouter.get('/activate/:token', activEmail);

//
userRouter.post("/login" , login);



module.exports = userRouter; 