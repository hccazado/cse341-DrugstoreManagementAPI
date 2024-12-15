const express = require("express");
const routes = express.Router();
const controller = require("../controllers/vendors");
const {validate, validationRules} = require("../middleware/vendorsValidation");
const {authorizeAdmin, isAuthenticated} = require("../middleware/authenticate");


routes.get("/findbyname/:name", controller.findByName);
routes.get("/findbyitin/:itin", controller.findByITIN);
routes.get("/", controller.getAll);
routes.post("/", isAuthenticated, validationRules(), validate, controller.createVendor);
routes.put("/:id", isAuthenticated, validationRules(), validate, controller.updateVendor);
routes.delete("/:id", isAuthenticated, controller.deleteVendor);



module.exports = routes;