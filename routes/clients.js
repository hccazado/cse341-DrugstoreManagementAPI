const express = require("express");
const routes = express.Router();
const controller = require("../controllers/clients")

routes.get("/findbyssid", controller.findBySSID);
routes.get("/findbyphone", controller.findByPhone);
routes.put("/:cliendId", controller.updateClient);
routes.delete("/:cliendId", controller.deleteClient);
routes.post("/", controller.createClient);

module.exports = routes;