const express = require('express');
const routes = express.Router();
const controller = require('../controllers/store');
const validator = require('../middleware/storeValidator');
const {isAuthenticated} = require("../middleware/authenticate");

routes.get('/', controller.getStore); 
routes.get('/:orderId', controller.findOrder); 

routes.post('/', 
    isAuthenticated,
    validator.storeValidationRules(),
    validator.checkValidation,
    controller.createOrder)

routes.put('/:orderId', 
    isAuthenticated,
    validator.storeValidationRules(),
    validator.checkValidation,
    controller.updateOrder)

routes.delete('/:orderId', 
    isAuthenticated,
    controller.deleteOrder);
    
routes.get('/send/:orderId', 
    isAuthenticated,
    controller.sendOrder);

module.exports = routes;
