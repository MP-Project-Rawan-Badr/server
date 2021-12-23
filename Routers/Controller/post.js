const postModel = require("./../../db/Models/post");

//
const addPost = (req, res) => {
  const { title, imgs, dec, user } = req.body;
  const newPost = new postModel({
    title,
    imgs,
    dec,
    user,
  });
  newPost
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//
const getAllPosts = (req, res) => {
  postModel
    .find({ isDel: false })
    .populate("user")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("post not found");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//update post
const updatePost = (req, res) => {
  const { id } = req.params;
  const { title, imgs, dec } = req.body;
  postModel
    .findByIdAndUpdate(
      { _id: id, isDel: false },
      {
        title,
        imgs,
        dec,
      }
    )
    .populate("user")
    .then((result) => {
      if (!result) {
        res.status(400).json(" This post not found");
      } else {
        res.status(200).json("update post");
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

// delete post
const deletePost = (req, res) => {
    const { id } = req.params;
    postModel
      .findByIdAndUpdate(
        { _id: id,  isDel: false },
        { isDel: true },
        { new: true }
      )
      .populate("user")
      .then((result) => {
        if (result) {
          commentModel.find({ isDel: true }).catch((err) => {
            res.status(400).json(err);
          });
          likeModel.find({ like: false }).catch((err) => {
            res.status(400).json(err);
          })
            res.status(200).json("deleted");
        } else {
          res.status(404).json("already deleted");
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };



module.exports = { addPost, getAllPosts , updatePost , deletePost };
