const express = require("express");
const inquiryRouter = express.Router();
const {
  addinquiry,
  getInquiries,
  getOneInquiry,
  getUserInquiry,
  updateInquiry,
  deleteInquiry,
} = require("./../Controller/inquiry");

//middleware
const authentecation = require("./../MiddleWare/authentecation");

inquiryRouter.post("/addinquiry", authentecation, addinquiry);
inquiryRouter.get("/getInquiries", authentecation, getInquiries);
inquiryRouter.get("/getOneInquiry/:id", authentecation,  getOneInquiry);
inquiryRouter.get("/getUserInquiry/:id", authentecation,  getUserInquiry);
inquiryRouter.put("/updateInquiry/:id", authentecation, updateInquiry);
inquiryRouter.delete("/deleteInquiry/:id", authentecation, deleteInquiry);

module.exports = inquiryRouter;
