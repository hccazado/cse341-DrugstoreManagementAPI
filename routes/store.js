const express = require("express");
const routes = express.Router();
const controller = require("../controllers/store")

//routes.get("/inventory", controller.findInventory);
//routes.get("/clients", controller.findClients);
//routes.get("/order/:orderId", controller.findOrder);
//routes.put("/order/:orderId", controller.updateOrder)
//routes.delete("/order/:orderId", controller.deleteOrder);
//routes.post("/order", controller.createOrder);

module.exports = routes;