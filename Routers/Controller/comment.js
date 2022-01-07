const commentsModel = require("./../../db/Models/comment");
const inquiryModel = require("./../../db/Models/inquiry");
// const roleModel = require("./../../db/models/role");

//Done 
const createComments = (req, res) => {
  if (!req.token.deleted) {
    const { id } = req.params; // Inquiry id 
    const { comment } = req.body;

    const newComment = new commentsModel({
      comment,
      user: req.token.id,
      inquiry: id, 
    });
 
    newComment
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(404).json({ message: "your user is deleted .." });
  }
};

const getAllComments = (req, res) => {
  const { id } = req.params; // Inquiry id 

  if (!req.token.deleted) {
    commentsModel
      .find({deleted: false, inquiry:id })
      .populate('user')
      .then((result) => {
        res.status(200).json(result);
        // if (result.length > 0) {
        // } else {
        //   res.status(200).json({ message: "there is no add tasks !" });
        // }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    res.status(404).json({ message: "your user is deleted .." });
  }
};

// delete
const deleteComment= (req, res) => {
  const { id } = req.params;
  console.log(id);
  commentsModel
    .findOneAndUpdate(
      { _id: id, deleted: false , user:req.token.id },
      { deleted: true },
      { new: true }
    )
    // .populate("user")
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json("deleted comment");
      } else {
        res.status(404).json("already deleted");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



module.exports = {
  createComments,
  getAllComments,
  deleteComment,
}; 