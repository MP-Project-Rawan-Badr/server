const express = require("express");
const inquiryRouter = express.Router();
const {addinquiry, getInquiries} = require("./../Controller/inquiry");


//
inquiryRouter.post("/addinquiry", addinquiry);
inquiryRouter.get("/addinquiry", getInquiries);



module.exports = inquiryRouter;