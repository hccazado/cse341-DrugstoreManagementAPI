const express = require('express');
const routes = express.Router();
const controller = require('../controllers/drugs');
const validator = require('../middleware/validatorDrugs');

routes.get('/:findbycn', controller.findByCN);
routes.get('/:findbysn', controller.findBySN);
routes.get('/', controller.findAll);
routes.put(
  '/:drugId',
  validator.drugsRules(),
  validator.checkDrugsData,
  controller.updateDrug
);
routes.delete('/:drugId', controller.deleteDrug);
routes.post(
  '/',
  validator.drugsRules(),
  validator.checkDrugsData,
  controller.createDrug
);

module.exports = routes;
