const mongoose = require("mongoose");

const inquiry = new mongoose.Schema({
    title: { type: String , required: true  },
    city: {type: String , default: "لم يحدد"},
    complete: {type: String , default: " غير مكتمل "},
    isDel: {type: Boolean , default: false},
    dateInquiry: { type: Date , default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User"  }
});

module.exports = mongoose.model("Inquiry" , inquiry);