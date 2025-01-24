const express = require("express");
const route = express.Router();
const {createUser, loginUser, deleteUser} = require("../controller/user.controller")

route.post("/user", createUser);
route.post("/user", loginUser);
route.delete("/user", deleteUser)

module.exports = route;


