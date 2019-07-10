module.exports = function(sequelize, Sequelize) {

  const UserResume = sequelize.define('user_resume', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    value: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'user_resume',
  });

  return UserResume;

}
