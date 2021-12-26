const appointmentModel = require("./../../db/Models/appointment");
const userModel = require("./../../db/Models/user");
const roleModel = require("./../../db/Models/Role");

// service provider can add appointment
const addAppointment = (req, res) => {
  const { date, Note } = req.body;
  console.log(req.token);
  userModel
    .findById(req.token.id)
    .populate("role")
    .then((result) => {
      console.log(result);
      if (result) {
        if (result.role?.role == "service provider") {
          const newAppointment = new appointmentModel({
            date,
            Note,
            user: req.token.id,
          });
          newAppointment
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

// service provider can see appointment
const getAppointment = (req, res) => {
  appointmentModel
    .find({ isDel: false })
    .populate("user")
    .then((result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(400).json("appointment not found");
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

// service provider can update appointment
const updateAppointment = (req, res) => {
  const { id } = req.params;
  const { date, Note } = req.body;
  console.log(req.token);
  userModel
    .findById(req.token.id)
    .populate("role")
    .then((result) => {
      console.log(result);
      if (result) {
        if (result.role?.role == "service provider") {
          appointmentModel
            .findByIdAndUpdate(
              { _id: id, user: req.token.id, isDel: false },
              {
                date,
                Note,
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
        } else {
          res.status(400).json("not allowd");
        }
      }
    });
};
//service provider can delete appointment
const deleteAppointment = (req, res) => {
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
          appointmentModel
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
        } else {
          res.status(400).json("not allowd");
        }
      }
    });
};

module.exports = {
  addAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
