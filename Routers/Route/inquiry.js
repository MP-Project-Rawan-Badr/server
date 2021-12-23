const express = require("express");
const inquiryRouter = express.Router();
const {addinquiry, getInquiries, updateInquiry , deleteInquiry} = require("./../Controller/inquiry");


inquiryRouter.post("/addinquiry", addinquiry);
inquiryRouter.get("/getInquiries", getInquiries);
inquiryRouter.put("/updateInquiry/:id", updateInquiry);
inquiryRouter.put("/deleteInquiry/:id", deleteInquiry);

module.exports = inquiryRouter;