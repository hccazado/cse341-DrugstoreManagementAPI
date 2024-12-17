const express = require('express');
const routes = express.Router();
const controller = require('../controllers/users');
const passport = require('passport');
const validatorUser = require('../middleware/validatorUsers');
const { authorizeAdmin, isAuthenticated } = require('../middleware/authenticate');


routes.get(
  '/login/google',
  // #swagger.ignore = true
  passport.authenticate('google'),
  controller.login
);
routes.get(
  '/login/github',
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
routes.delete('/:id', isAuthenticated, controller.deleteUser);
routes.put(
  '/:id',
  isAuthenticated,
  validatorUser.usersValidationRules(),
  validatorUser.checkValidation,
  controller.updateUser
);

routes.post(
  '/',
  isAuthenticated,
  validatorUser.usersValidationRules(),
  validatorUser.checkValidation,
  controller.createUser
);

module.exports = routes;
