const express = require("express");
const routes = express.Router();
const controller = require("../controllers/users")

routes.get("/login", controller.login);
routes.get("/logout", controller.logout);

module.exports = routes;