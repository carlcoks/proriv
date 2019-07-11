module.exports = function(sequelize, Sequelize) {

  const UserLenta = sequelize.define('user_lenta', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    text: {
      type: Sequelize.STRING,
    },
    src: {
      type: Sequelize.STRING,
    },
    date_creatd: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_lenta',
  });

  return UserLenta;

}
