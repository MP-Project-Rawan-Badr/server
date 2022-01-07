const express = require("express");
const commentsRouter = express.Router();

const {
    createComments,    
    getAllComments,
    deleteComment,
} = require("./../Controller/comment");
//
const authentication = require("./../MiddleWare/authentecation");
//add
commentsRouter.post("/comments/:id", authentication, createComments); 
//get all
commentsRouter.get("/comments/:id", authentication, getAllComments);

//deleteInquiry
commentsRouter.put("/comments/:id", authentication, deleteComment);


module.exports = commentsRouter;