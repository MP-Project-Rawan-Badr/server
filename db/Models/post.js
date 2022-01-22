const mongoose = require("mongoose");

const post = new mongoose.Schema({
    title: { type: String , required: true  },
    image: [{ type: String , required: true  }],
    dec: {type: String , required: true},
    // images: { type: Array , required: true  },
    price: {type: Number ,  default: "none"}, 
    workingTime: { type: String , required: true  },
    delivery: {type: String},
    isDel: {type: Boolean , default: false},
    datePost: { type: Date , default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId , ref: "User"  }
});

module.exports = mongoose.model("Post" , post);