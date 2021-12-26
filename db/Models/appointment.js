const mongoose = require("mongoose");

const appointment = new mongoose.Schema({
    date: { type:  Date , required: true},
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User" },
    Note: {type: String},
    isDel: {type: Boolean , default: false},

});

module.exports = mongoose.model("Appointment" , appointment);