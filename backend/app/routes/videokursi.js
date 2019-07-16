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

  app.route('/api/v1/videourok')
    .get(api.getSingleUrok(models.UserVideouroki))
    .post(passport.authenticate('jwt', config.session), api.addVideourok(models.User, models.UserVideouroki, app.get('secretpass')))

  app.route('/api/v1/videouroki')
    .get(api.getVideouroki(models.UserVideouroki))
}
