const express = require("express");
const inquiryRouter = express.Router();
const {addinquiry, getInquiries, updateInquiry} = require("./../Controller/inquiry");


//
inquiryRouter.post("/addinquiry", addinquiry);
inquiryRouter.get("/getInquiries", getInquiries);
inquiryRouter.put("/updateInquiry/:id", updateInquiry);


module.exports = inquiryRouter;