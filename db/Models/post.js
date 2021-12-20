const mongoose = require("mongoose");

const post = new mongoose.Schema({
    title: { type: String , required: true  },
    imgs: [{ type: Array , required: true  }],
    dec: {type: String , required: true},
    isDel: {type: Boolean , default: false},
    Date: { type: new Date }

});

module.exports = mongoose.model("Post" , post);