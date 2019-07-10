const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/files');

  app.route('/api/public*')
    .get(api.getFileUser());

}
