const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/treners');

  app.route('/api/v1/treners')
    .get(api.getTreners(models.User, models.UserInfo, models.UserBookmarks))
}
