const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./common');

const NODE_ENV = process.env.NODE_ENV || 'dev';
const isProduction = NODE_ENV === 'production';
const dbName = isProduction ? 'dbProd' : 'dbDev';

const options = {
    host: config[dbName].host,
    user: config[dbName].dbuser,
    password: config[dbName].dbpass,
    database: config[dbName].dbname
};

const sessionStore = new MySQLStore(options);

module.exports = sessionStore;
