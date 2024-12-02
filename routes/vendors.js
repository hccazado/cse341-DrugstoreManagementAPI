const express = require("express");
const routes = express.Router();
const controller = require("../controllers/vendors")

routes.get("/findbyname", controller.findByName);
routes.get("/findbyitin", controller.findByITIN);
routes.put("/:vendorId", controller.updateVendor);
routes.delete("/:vendorId", controller.deleteVendor);
routes.post("/", controller.createVendor);

module.exports = routes;