const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/dialogs');

  app.route('/api/v1/dialogs')
    .get(passport.authenticate('jwt', config.session), api.getDialogs(models.User, models.UserInfo, models.UserDialogs, models.UserMessages, models.UserToDialog, app.get('secretpass')))

  app.route('/api/v1/messages')
    .get(passport.authenticate('jwt', config.session), api.getMessages(models.User, models.UserInfo, models.UserMessages, app.get('secretpass')))
    .post(passport.authenticate('jwt', config.session), api.addMessage(models.User, models.UserInfo, models.UserDialogs, models.UserMessages, models.UserToDialog, app.get('secretpass')))
}
