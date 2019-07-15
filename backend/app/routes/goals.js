const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/goals');

  app.route('/api/v1/goals-main')
    .get(api.getMainGoals(models.UserGoals))

  app.route('/api/v1/goals')
    .get(api.getGoals(models.UserGoals))
    .post(passport.authenticate('jwt', config.session), api.addGoal(models.User, models.UserGoals, app.get('secretpass')))

  app.route('/api/v1/goal')
    .get(api.getSingleGoal(models.UserGoals, models.SportType))
    .delete(passport.authenticate('jwt', config.session), api.deleteSingleGoal(models.User, models.UserGoals, app.get('secretpass')))

}
