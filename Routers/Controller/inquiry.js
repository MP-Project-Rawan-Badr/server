const inquiryModel = require("./../../db/Models/inquiry");
const userModel = require("./../../db/Models/user");
const roleModel = require("./../../db/Models/Role");

//
const addinquiry = (req, res) => {
  const { title, dec, user } = req.body;
      const newInquiry = new inquiryModel({
        title,
        dec,
        user,
      });
      newInquiry
        .save()
        .then((result) => {
          res.status(201).json(result);
        })
        .catch((error) => {
          res.status(400).json(error);
        });
};

//
const getInquiries = (req, res) => {
    inquiryModel
      .find({ isDel: false })
      .populate("user")
      .then((result) => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(400).json("inquiry not found");
        }
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  };

  //
  const updateInquiry = (req, res) => {
    const { id } = req.params;
    const { title, dec } = req.body;
    inquiryModel
      .findByIdAndUpdate(
        { _id: id, isDel: false },
        {
            title,
             dec
        }
      )
      .populate("user")
      .then((result) => {
        if (!result) {
          res.status(400).json(" This inquiry not found");
        } else {
          res.status(200).json("update inquiry");
        }
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  };
//





module.exports = { addinquiry , getInquiries, updateInquiry };
