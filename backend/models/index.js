const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require('../config/index');

const NODE_ENV = process.env.NODE_ENV || 'dev';
const isProduction = NODE_ENV === 'production';
const dbName = isProduction ? 'dbProd' : 'dbDev';

const sequelize = new Sequelize(config[dbName].dbname, config[dbName].dbuser, config[dbName].dbpass, {
  host: config[dbName].host,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  pool: {
    max: 100,
    min: 1,
    acquire: 30000,
    idle: 10000
  },
});
const db = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
