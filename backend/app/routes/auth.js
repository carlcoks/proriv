const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/auth');

  app.route('/')
    .get((req, res) => res.send('Fitlance API'));

  app.route('/api/v1/auth')
    .post(api.login(models.User, models.UserInfo));

  app.route('/api/v1/get-user')
    .post(passport.authenticate('jwt', config.session), api.getUser(models.User, app.get('secretpass')))
}
