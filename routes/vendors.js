const express = require("express");
const routes = express.Router();
const controller = require("../controllers/vendors");
const {validate, validationRules} = require("../middleware/vendorsValidation");
const {authorizeAdmin} = require("../middleware/authenticate");


routes.get("/findbyname/:name", controller.findByName);
routes.get("/findbyitin/:itin", controller.findByITIN);
routes.get("/", controller.getAll);
routes.post("/", authorizeAdmin, validationRules(), validate, controller.createVendor);
routes.put("/:id", authorizeAdmin, validationRules(), validate, controller.updateVendor);
routes.delete("/:id", authorizeAdmin, controller.deleteVendor);



module.exports = routes;