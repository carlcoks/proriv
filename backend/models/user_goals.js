module.exports = function(sequelize, Sequelize) {

  const UserGoals = sequelize.define('user_goals', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    about: {
      type: Sequelize.STRING,
    },
    category: {
      type: Sequelize.INTEGER,
    },
    src: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_goals',
  });

  return UserGoals;

}
