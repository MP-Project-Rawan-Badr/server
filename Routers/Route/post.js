const express = require("express");
const postRouter = express.Router();
const {addPost , getAllPosts , updatePost , deletePost} = require("./../Controller/post");


//
postRouter.post("/addpost", addPost);
postRouter.get("/getAllPosts",  getAllPosts);
postRouter.put("/updatePost/:id", updatePost);
postRouter.delete("/deletePost/:id", deletePost);



module.exports = postRouter;