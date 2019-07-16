const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/bookmarks');

  app.route('/api/v1/bookmarks')
    .get(passport.authenticate('jwt', config.session), api.getBookmarks(models.User, models.UserInfo, models.UserBookmarks, app.get('secretpass')))
    .post(passport.authenticate('jwt', config.session), api.addBookmark(models.User, models.UserBookmarks, app.get('secretpass')))
    .delete(passport.authenticate('jwt', config.session), api.deleteBookmark(models.User, models.UserBookmarks, app.get('secretpass')))
}
