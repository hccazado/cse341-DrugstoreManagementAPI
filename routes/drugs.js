const express = require('express');
const routes = express.Router();
const controller = require('../controllers/drugs');
const validator = require('../middleware/validatorDrugs');
const { authorizeAdmin } = require('../middleware/authenticate');

routes.get('/cn/:findbycn', controller.findByCN);
routes.get('/sn/:findbysn', controller.findBySN);
routes.get('/category/:category', controller.findByCTG);
routes.get('/:drugId', controller.findByDrugId);
routes.get('/', controller.findAll);
routes.put(
  '/:drugId',
  authorizeAdmin,
  validator.drugsRules(),
  validator.checkDrugsData,
  controller.updateDrug
);
routes.delete('/:drugId', authorizeAdmin, controller.deleteDrug);
routes.post(
  '/',
  authorizeAdmin,
  validator.drugsRules(),
  validator.checkDrugsData,
  controller.createDrug
);

module.exports = routes;
