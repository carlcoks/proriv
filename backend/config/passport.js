const PassportJWT = require('passport-jwt'),
      ExtractJWT = PassportJWT.ExtractJwt,
      Strategy = PassportJWT.Strategy,
      config = require('./index.js'),
      models = require('../app/setup');

module.exports = (passport) => {
  const User = models.User;

  const parameters = {
    secretOrKey: config.secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  };

  passport.use(new Strategy(parameters, (payload, done) => {

    User.findOne({
      attributes: ['id'],
      where: {
        id: payload.user.id
      }
    })
    .then(user => {
      if (user)
        done(null, user)
      else
        done(null, false)
    })

  }));
}
