const express = require("express");
const routes = express.Router();
const controller = require("../controllers/vendors");
const {validate, validationRules} = require("../middleware/vendorsValidation");


routes.get("/findbyname/:name", controller.findByName);
routes.get("/findbyitin/:itin", controller.findByITIN);
routes.get("/", controller.getAll);
routes.post("/", validationRules(), validate, controller.createVendor);
routes.put("/:id", validationRules(), validate, controller.updateVendor);
routes.delete("/:id", controller.deleteVendor);



module.exports = routes;