const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/analitics');

  app.route('/api/v1/analitics/:id')
    .get(api.analitics(models.Users, models.Peoples, models.Service, models.Vectors, app.get('secretpass')))
}
