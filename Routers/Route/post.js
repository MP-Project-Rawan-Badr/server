const express = require("express");
const postRouter = express.Router();
const {addPost , getAllPosts , getOnePost, getUserPost , updatePost , deletePost} = require("./../Controller/post");

//middleware
const authentecation = require("./../MiddleWare/authentecation")

//Service Provider add post
postRouter.post("/addpost",authentecation, addPost);
// all registerants ca see posts
postRouter.get("/getAllPosts",  getAllPosts);

postRouter.get("/getOnePost/:id", authentecation,  getOnePost);
postRouter.get("/getUserPost/:id", authentecation,  getUserPost);


// Service Provider can update post
postRouter.put("/updatePost/:id",authentecation, updatePost);
//admin & Service Provider Delete Post
postRouter.delete("/deletePost/:id",authentecation, deletePost);


module.exports = postRouter;