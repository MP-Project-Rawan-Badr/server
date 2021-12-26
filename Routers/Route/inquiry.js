const express = require("express");
const inquiryRouter = express.Router();
const {
  addinquiry,
  getInquiries,
  updateInquiry,
  deleteInquiry,
} = require("./../Controller/inquiry");

//middleware
const authentecation = require("./../MiddleWare/authentecation");

inquiryRouter.post("/addinquiry", authentecation, addinquiry);
inquiryRouter.get("/getInquiries", getInquiries);
inquiryRouter.put("/updateInquiry/:id", authentecation, updateInquiry);
inquiryRouter.delete("/deleteInquiry/:id", authentecation, deleteInquiry);

module.exports = inquiryRouter;
