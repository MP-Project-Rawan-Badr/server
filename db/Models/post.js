const mongoose = require("mongoose");

const post = new mongoose.Schema({
    title: { type: String , required: true  },
    imgs: [{ type: Array , required: true  }],
    dec: {type: String , required: true},
    isDel: {type: Boolean , default: false},
    datePost: { type: Date , default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User"  }

});

module.exports = mongoose.model("Post" , post);