const session = require('cookie-session');
const config = require('../../config');
const sessionStore = require('../../config/mysqlStore');

module.exports = session({
  name: config.session.name,
  keys: config.session.keys,
  secret: 'eqi3aS14Di3sa6d5IA2SdN8saDinx123SAD12SDdsfZA9w',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    path: '/',
    expires: 24 * 60 * 60 * 1000, // 24 hour
  },
});
