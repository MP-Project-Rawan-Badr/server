const mongoose = require("mongoose");

const inquiry = new mongoose.Schema({
    title: { type: String , required: true  },
    dec: {type: String , required: true},
    isDel: {type: Boolean , default: false},
    Date: { type: new Date }

});

module.exports = mongoose.model("Inquiry" , inquiry);