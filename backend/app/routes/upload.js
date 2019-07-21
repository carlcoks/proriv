const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/upload');

  app.route('/api/v1/upload')
    .post(passport.authenticate('jwt', config.session), api.uploadFile(models.Users, models.Peoples, models.Service, models.Vectors, app.get('secretpass')))
}
