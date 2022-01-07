const express = require("express");
const userRouter = express.Router();
const { register ,updateUser, activEmail , login, forgotPass, funcReset, resetPass, getAllUsers , getOneUser, getServiceProvider , delUser, getUsers} = require("./../Controller/user");

//middleware
const authentecation = require("./../MiddleWare/authentecation")
const authorization = require("./../MiddleWare/authorization")

//
userRouter.post("/register" , register);
userRouter.get('/activate/:token', activEmail);

//
userRouter.post("/login" , login);
//forgotPass
userRouter.post('/forgotPass', forgotPass);
userRouter.get('/reset/:token', funcReset);
userRouter.post('/resetPass/:id', resetPass);
// 


userRouter.put("/update_user",authentecation , updateUser);

userRouter.get("/allusers", authentecation, getAllUsers);

userRouter.get("/getServiceProvider", authentecation, getServiceProvider);
userRouter.get("/getUsers", authentecation, getUsers);


userRouter.get("/Oneusers/:_id", authentecation , getOneUser);


userRouter.put("/delUser/:_id", authentecation, delUser);




module.exports = userRouter; 