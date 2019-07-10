module.exports = function(sequelize, Sequelize) {

  const UserMessages = sequelize.define('user_messages', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    dialog_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.STRING,
    },
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_messages',
  });

  return UserMessages;

}
