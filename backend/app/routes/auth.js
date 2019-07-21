const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/auth');

  app.route('/')
    .get((req, res) => res.send('Fitlance API'));

}
