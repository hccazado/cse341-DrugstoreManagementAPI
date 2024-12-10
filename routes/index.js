const express = require('express');
const passport = require('passport');
const routes = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-document.json');

routes.use('/clients', require('./clients'));
routes.use('/drugs', require('./drugs'));
routes.use('/vendors', require('./vendors'));
routes.use('/users', require('./users'));
routes.use('/store', require('./store'));
routes.use(
  '/api-docs',
  // #swagger.ignore = true
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

routes.use(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    // #swagger.ignore = true
    req.session.user = req.user;
    res.redirect('/');
  }
);

routes.get('/', (req, res) => {
  // #swagger.ignore = true
  res.send(
    req.session.user !== undefined
      ? `Welcome: ${req.session.user.displayName}`
      : 'Logged out'
  );
});

routes.get('*', (req, res) => {
  res.send("404 That route doesn't exist");
});

module.exports = routes;
