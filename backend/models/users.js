const bcrypt = require('bcrypt');

module.exports = function(sequelize, Sequelize) {

  const Users = sequelize.define('users', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
    telefon: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'users',
  });

  Users.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  Users.validatePassword = function(password, userpassword, callback) {
    bcrypt.compare(password, userpassword, (error, matches) => {
      if (error) return callback(error);
      callback(null, matches);
    });
  };

  return Users;

}
