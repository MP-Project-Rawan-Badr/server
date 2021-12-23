const express = require("express");
const inquiryRouter = express.Router();
const {addinquiry} = require("./../Controller/inquiry");


//
inquiryRouter.post("/addinquiry", addinquiry);



module.exports = inquiryRouter;