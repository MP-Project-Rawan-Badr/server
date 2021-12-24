const postModel = require("./../../db/Models/post");
const userModel = require("./../../db/Models/user");
const roleModel = require("./../../db/Models/Role");

//
const addPost = (req, res) => {
  const { title, imgs, dec } = req.body;
  console.log(req.token);
  userModel
    .findById(req.token.id)
    .populate("role")
    .then((result) => {
      console.log(result);
      if (result) {
        if (result.role?.role == "service provider") {
          const newPost = new postModel({
            title,
            imgs,
            dec,
            user: req.token.id,
          });
          newPost
            .save()
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((error) => {
              res.status(400).json(error);
            });
        } else {
          res.status(400).json("not allowd");
        }
      }
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
  console.log(req.token);
  userModel
    .findById(req.token.id)
    .populate("role")
    .then((result) => {
      console.log(result);
      if (result) {
        if (result.role?.role == "service provider") {
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
  } else {
    res.status(400).json("not allowd");
  }
}
});
};

// delete post
const deletePost = (req, res) => {
  const { id } = req.params;
  console.log(req.token);
  userModel
    .findById(req.token.id)
    .populate("role")
    .then((result) => {
      console.log(result);
      if (result) {
        if (
          result.role?.role == "service provider" ||
          result.role?.role == "admin"
        ) {
          postModel
            .findByIdAndUpdate(
              { _id: id, user: req.token.id, isDel: false },
              { isDel: true },
              { new: true }
            )
            .populate("user")
            .then((result) => {
              if (result) {
                res.status(200).json("deleted");
              } else {
                res.status(404).json("already deleted");
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          res.status(400).json("not allowd");
        }
      }
    });
};

module.exports = {
  addPost,
  getAllPosts,
  updatePost,
  deletePost,
};
