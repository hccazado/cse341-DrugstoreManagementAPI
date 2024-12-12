const express = require("express");
const routes = express.Router();
const controller = require("../controllers/clients");
const validator = require('../middleware/clientsValidator');
const {isAuthenticated} = require("../middleware/authenticate");

routes.get("/", controller.getAllClients);

routes.get("/findbyssid/:ssid", controller.findBySSID);

routes.get("/findbyphone/:phone", controller.findByPhone);

routes.post("/", 
    isAuthenticated,
    validator.clientsValidationRules(),
    validator.checkValidation,
    controller.createClient);

routes.put("/:clientId", 
    isAuthenticated,
    validator.clientsValidationRules(),
    validator.checkValidation,
    controller.updateClient);

routes.delete("/:clientId", isAuthenticated, controller.deleteClient);


module.exports = routes;