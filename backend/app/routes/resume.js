const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/resume');

  app.route('/api/v1/resume')
    .get(api.getResume(models.UserResume))
    .put(passport.authenticate('jwt', config.session), api.editResume(models.User, models.UserResume, app.get('secretpass')))
}
