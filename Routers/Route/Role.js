const express = require("express");
const roleRouter = express.Router();
const { creatRole, getRoles } = require("./../Controller/Role");

roleRouter.post("/createRole",  creatRole);
roleRouter.get("/roles",  getRoles);

module.exports = roleRouter;
