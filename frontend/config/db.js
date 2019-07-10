const mysql = require('mysql');
const config = require('./common.json');

const db  = mysql.createPool({
  connectionLimit : 500,
  host: config.db.host,
  port: config.db.port,
  user: config.db.dbuser,
  password: config.db.dbpass,
  database: config.db.dbname
});

module.exports = db;
