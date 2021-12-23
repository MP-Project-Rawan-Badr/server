const postModel = require("./../../db/Models/post");


//
const addPost = (req, res) => {
    const { title, imgs, dec , user } = req.body;
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


  



module.exports = {addPost }