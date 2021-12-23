const express = require("express");
const postRouter = express.Router();
const {addPost } = require("./../Controller/post");


//
postRouter.post("/addpost", addPost);


module.exports = postRouter;