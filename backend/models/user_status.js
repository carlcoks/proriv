module.exports = function(sequelize, Sequelize) {

  const UserStatus = sequelize.define('user_status', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'user_status',
  });

  return UserStatus;

}
