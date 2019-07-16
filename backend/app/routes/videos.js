const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/videos');

  app.route('/api/v1/video')
    .get(api.getVideo(models.UserVideos))
    .put(passport.authenticate('jwt', config.session), api.updateVideo(models.User, models.UserVideos, app.get('secretpass')))
    .post(passport.authenticate('jwt', config.session), api.addNewVideo(models.User, models.UserVideos, app.get('secretpass')))

  app.route('/api/v1/videos')
    .get(api.getVideos(models.UserVideos))

  app.route('/api/v1/user-videos')
    .get(api.getVideosMain(models.UserVideos))

}
