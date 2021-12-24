const roleModel = require("./../../db/Models/Role");

const authorization = async (req, res, next) => {
  try {
      console.log(req.token.role);
    const roleId = req.token.role;
    const result = await roleModel.findById(roleId);
    if (result.role == "admin") {
      next();
    } else {
      res.status(403).json("forbidden");
    }
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = authorization;