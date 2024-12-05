const express = require("express");
const routes = express.Router();
const controller = require("../controllers/clients");
const validator = require('../middleware/clientsValidator')

routes.get("/", controller.getAllClients);

routes.get("/findbyssid/:ssid", controller.findBySSID);

routes.get("/findbyphone/:phone", controller.findByPhone);

routes.post("/", 
    validator.clientsValidationRules(),
    validator.checkValidation,
    controller.createClient);

routes.put("/:clientId", 
    validator.clientsValidationRules(),
    validator.checkValidation,
    controller.updateClient);

routes.delete("/:clientId", controller.deleteClient);


module.exports = routes;