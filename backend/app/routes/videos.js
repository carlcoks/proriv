const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/videos');

  app.route('/api/v1/video')
    .post(passport.authenticate('jwt', config.session), api.addNewVideo(models.User, models.UserVideos, app.get('secretpass')))

  app.route('/api/v1/videos')
    .get(api.getVideos(models.UserVideos))

}
