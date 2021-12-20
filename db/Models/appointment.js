const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
    Date: { type: new Date },
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User" },
    isDel: {type: Boolean , default: false},

});

module.exports = mongoose.model("Appointment" , appointment);