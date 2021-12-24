const inquiryModel = require("./../../db/Models/inquiry");
const userModel = require("./../../db/Models/user");
const roleModel = require("./../../db/Models/Role");

// all registerants can add inquiry
const addinquiry = (req, res) => {
  const { title, dec } = req.body;
  const newInquiry = new inquiryModel({
    title,
    dec,
    user: req.token.id,
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

// all registerants can see inquiry
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

// all registerants can update inquiry
const updateInquiry = (req, res) => {
  const { id } = req.params;
  const { title, dec } = req.body;
  inquiryModel
    .findByIdAndUpdate(
      { _id: id,user: req.token.id, isDel: false },
      {
        title,
        dec,
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
//all registerants can delete inquiry
const deleteInquiry = (req, res) => {
  const { id } = req.params;
  inquiryModel
    .findByIdAndUpdate(
      { _id: id, isDel: false },
      { isDel: true },
      { new: true }
    )
    .populate("user")
    .then((result) => {
      if (result) {
        res.status(200).json("deleted inquiry");
      } else {
        res.status(404).json("already deleted");
      }
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { addinquiry, getInquiries, updateInquiry, deleteInquiry };
