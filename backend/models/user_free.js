module.exports = function(sequelize, Sequelize) {

  const UserFree = sequelize.define('user_free', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'user_free',
  });

  return UserFree;

}
