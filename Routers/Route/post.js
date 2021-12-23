const express = require("express");
const postRouter = express.Router();
const {addPost , getAllPosts , updatePost} = require("./../Controller/post");


//
postRouter.post("/addpost", addPost);
postRouter.get("/getAllPosts",  getAllPosts);
postRouter.put("/updatePost/:id", updatePost);



module.exports = postRouter;