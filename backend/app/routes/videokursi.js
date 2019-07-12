const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/videokursi');

  app.route('/api/v1/videokursi')
    .get(api.getVideokursi(models.UserVideokursi))
    .post(passport.authenticate('jwt', config.session), api.addVideokurs(models.User, models.UserVideokursi, app.get('secretpass')))

  app.route('/api/v1/videokurs')
    .get(api.getSingleKurs(models.UserVideokursi))
}
