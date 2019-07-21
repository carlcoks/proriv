const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/users');

  app.route('/api/v1/auth')
    .post(api.login(models.Users));

  app.route('/api/v1/signup')
    .post(api.signup(models.Users));

  app.route('/api/v1/user')
    .get(api.getUser(models.Users))
}
