const express = require("express");
const roleRouter = express.Router();
const { creatRole, getRoles } = require("./../Controller/Role");

//middleware
const authentecation = require("./../MiddleWare/authentecation")
const authorization = require("./../MiddleWare/authorization")


roleRouter.post("/createRole", authentecation , authorization ,  creatRole);
roleRouter.get("/roles", authentecation , authorization , getRoles);

module.exports = roleRouter;
