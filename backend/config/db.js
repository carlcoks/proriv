const Sequelize = require('sequelize');
const config = require('./index');

const NODE_ENV = process.env.NODE_ENV || 'dev';
const isProduction = NODE_ENV === 'production';
const dbName = isProduction ? 'dbProd' : 'dbDev';

const db = new Sequelize(config[dbName].dbname, config[dbName].dbuser, config[dbName].dbpass, {
  host: config[dbName].host,
  port: config[dbName].port,
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 1,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = db;
