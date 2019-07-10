const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/albums');

  app.route('/api/v1/user-albums')
    .post(passport.authenticate('jwt', config.session), api.createAlbum(models.User, models.UserAlbums, models.UserPhotos, app.get('secretpass')))
    .get(api.getAlbums(models.UserAlbums, models.UserPhotos))

  app.route('/api/v1/user-album')
    .get(api.getAlbum(models.UserAlbums, models.UserPhotos))

  app.route('/api/v1/user-photos')
    .get(api.getPhotosMini(models.UserPhotos))

  app.route('/api/v1/photo')
    .get(api.getPhoto(models.UserPhotos, models.PhotoComments, models.User, models.UserInfo))
    .put(passport.authenticate('jwt', config.session), api.updatePhoto(models.User, models.UserPhotos, app.get('secretpass')))

  app.route('/api/v1/photo-comments')
    .post(passport.authenticate('jwt', config.session), api.addPhotoComment(models.User, models.PhotoComments, app.get('secretpass')))
}
