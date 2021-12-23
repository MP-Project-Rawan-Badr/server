const express = require("express");
const postRouter = express.Router();
const {addPost , getAllPosts} = require("./../Controller/post");


//
postRouter.post("/addpost", addPost);
postRouter.get("/getAllPosts",  getAllPosts);


module.exports = postRouter;