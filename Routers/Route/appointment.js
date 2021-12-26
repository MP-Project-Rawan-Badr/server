const express = require("express");
const appointmentRouter = express.Router();
const {
  addAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require("./../Controller/appointment");

//middleware
const authentecation = require("./../MiddleWare/authentecation");

appointmentRouter.post("/addinquiry", authentecation, addAppointment);
appointmentRouter.get("/getInquiries", getAppointment);
appointmentRouter.put("/updateInquiry/:id", authentecation, updateAppointment);
appointmentRouter.delete(
  "/deleteInquiry/:id",
  authentecation,
  deleteAppointment
);

module.exports = appointmentRouter;
