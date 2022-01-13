const mongoose = require("mongoose");

const user = new mongoose.Schema({
    userName: { type: String , required: true  },
    email: { type: String , required: true , unique: true },
    password: { type: String, required: true },
    isDel: { type: Boolean, default: false },
    // active: { type: Boolean, default: false },
    avatar: {type: String , default: "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"},
    bio:  {type: String},
    specialty: {type: String , default: "لم يحدد"},
    Email: {type: String},
    Phone_Number: {type: String },
    city: {type: String , default: "لم يحدد"},
    role: { type: mongoose.Schema.Types.ObjectId , ref: "Role" },
    status: {type: String , default: "متوفر"},
});

module.exports = mongoose.model("User" , user);