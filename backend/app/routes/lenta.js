const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/lenta');

  app.route('/api/v1/lenta')
    .get(api.getLenta(models.UserLenta, models.LentaFiles))
    .post(passport.authenticate('jwt', config.session), api.addToLenta(models.User, models.UserLenta, models.LentaFiles, app.get('secretpass')))
    .delete(passport.authenticate('jwt', config.session), api.deleteInLenta(models.User, models.UserLenta, models.LentaFiles, app.get('secretpass')))
}
