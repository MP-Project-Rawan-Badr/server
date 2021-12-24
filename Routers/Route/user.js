const express = require("express");
const userRouter = express.Router();
const { register , activEmail , login, getAllUsers } = require("./../Controller/user");

//middleware
const authentecation = require("./../MiddleWare/authentecation")
const authorization = require("./../MiddleWare/authorization")

//
userRouter.post("/register" , register);
userRouter.get('/activate/:token', activEmail);

//
userRouter.post("/login" , login);

userRouter.get("/allusers", getAllUsers);




module.exports = userRouter; 