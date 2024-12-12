const express = require('express');
const routes = express.Router();
const controller = require('../controllers/drugs');
const validator = require('../middleware/validatorDrugs');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/cn/:findbycn', controller.findByCN);
routes.get('/sn/:findbysn', controller.findBySN);
routes.get('/category/:category', controller.findByCTG);
routes.get('/:drugId', controller.findByDrugId);
routes.get('/', controller.findAll);
routes.put(
  '/:drugId',
  isAuthenticated,
  validator.drugsRules(),
  validator.checkDrugsData,
  controller.updateDrug
);
routes.delete('/:drugId', isAuthenticated, controller.deleteDrug);
routes.post(
  '/',
  isAuthenticated,
  validator.drugsRules(),
  validator.checkDrugsData,
  controller.createDrug
);

module.exports = routes;
