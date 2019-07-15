const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/users');

  app.route('/api/v1/signup')
    .post(api.signup(models.User));
  app.route('/api/v1/reset-password')
    .post(api.resetPassword(models.User))
  app.route('/api/v1/accept-email')
    .post(api.acceptEmail(models.User));

  app.route('/api/v1/user')
    .get(api.getUser(models.User, models.UserStatus, models.UserInfo, models.UserFree))
    .put(passport.authenticate('jwt', config.session), api.updateUser(models.User, app.get('secretpass')))

  app.route('/api/v1/sport')
    .get(api.getSport(models.SportType))

  app.route('/api/v1/countries')
    .get(api.getCountries(models.GeoCity, models.GeoCountry))

  app.route('/api/v1/user-info')
    .put(passport.authenticate('jwt', config.session), api.updateUserInfo(models.User, models.UserInfo, app.get('secretpass')))

  app.route('/api/v1/user-avatar')
    .post(passport.authenticate('jwt', config.session), api.updateUserAvatar(models.User, models.UserInfo, app.get('secretpass')))

  app.route('/api/v1/user-contacts')
    .put(passport.authenticate('jwt', config.session), api.updateUserContacts(models.User, app.get('secretpass')))
}
