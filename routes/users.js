const express = require('express');
const routes = express.Router();
const controller = require('../controllers/users');
const passport = require('passport');
const validatorUser = require('../middleware/validatorUsers');
const { authorizeAdmin } = require('../middleware/authenticate');

routes.get(
  '/login',
  // #swagger.ignore = true
  passport.authenticate('github'),
  controller.login
);
routes.get(
  '/logout',
  // #swagger.ignore = true
  controller.logout
);
routes.get('/:id', controller.findById);
routes.get('/', controller.getAll);
routes.delete('/', authorizeAdmin, controller.deleteUser);
routes.put(
  '/',
  authorizeAdmin,
  validatorUser.usersValidationRules(),
  validatorUser.checkValidation,
  controller.updateUser
);

routes.post(
  '/',
  authorizeAdmin,
  validatorUser.usersValidationRules(),
  validatorUser.checkValidation,
  controller.createUser
);

module.exports = routes;
