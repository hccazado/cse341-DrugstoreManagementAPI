const express = require("express");
const routes = express.Router();
const controller = require("../controllers/drugs");

routes.get("/findbycn", controller.findByCN);
routes.get("/findbysn", controller.findBySN);
routes.get("/findbysn", controller.findAll);
routes.put("/:drugId", controller.updateDrug);
routes.delete("/:drugId", controller.deleteDrug);
routes.post("/", controller.createDrug);

module.exports = routes;