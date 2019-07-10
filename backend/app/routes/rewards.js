const passport = require('passport'),
      config = require('../../config'),
      models = require('../setup');

module.exports = (app) => {
  const api = require('../api/rewards');

  app.route('/api/v1/rewards')
    .post(passport.authenticate('jwt', config.session), api.createReward(models.User, models.UserRewards, app.get('secretpass')))
    .get(api.getRewards(models.UserRewards))

  app.route('/api/v1/rewards-main')
    .get(api.getRewardsMain(models.UserRewards))

}
