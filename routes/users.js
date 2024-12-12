const express = require('express');
const routes = express.Router();
const controller = require('../controllers/users');
const passport = require('passport');

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

module.exports = routes;
