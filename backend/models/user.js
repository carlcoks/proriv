const bcrypt = require('bcrypt');

module.exports = function(sequelize, Sequelize) {

  const User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    firstname: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    user_status_id: {
      type: Sequelize.INTEGER,
    },
    user_free_id: {
      type: Sequelize.INTEGER,
    },
    gender: {
      type: Sequelize.INTEGER,
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
    accept_email: {
      type: Sequelize.INTEGER
    },
    accept_email_hash: {
      type: Sequelize.STRING,
    },
    reset_password_hash: {
      type: Sequelize.STRING,
    }
  }, {
    tableName: 'users',
    // classMethods: {
    //   associate: function(models) {
    //     User.hasMany(models.UserRewards, {
    //       foreignKey: "user_id"
    //     });
    //   }
    //  }
  });

  User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  User.validatePassword = function(password, userpassword, callback) {
    bcrypt.compare(password, userpassword, (error, matches) => {
      if (error) return callback(error);
      callback(null, matches);
    });
  };

  return User;

}
