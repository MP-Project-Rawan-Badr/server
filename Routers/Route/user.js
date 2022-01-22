const express = require("express");
const userRouter = express.Router();
const { register ,updateUser, activEmail , login, forgotPass, funcReset, resetPass, getAllUsers,getAUsers , getOneUser, getServiceProvider , delUser,reUser, getUsers} = require("./../Controller/user");

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
userRouter.get("/users", authentecation, getAUsers);

userRouter.get("/getServiceProvider", authentecation, getServiceProvider);
userRouter.get("/getUsers", authentecation, getUsers);


userRouter.get("/Oneusers/:_id", authentecation , getOneUser);

// delete user
userRouter.put("/delUser/:_id", authentecation, delUser);
// return user
userRouter.put("/reUser/:_id", authentecation, reUser);







module.exports = userRouter; 