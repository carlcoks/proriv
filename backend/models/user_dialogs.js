module.exports = function(sequelize, Sequelize) {

  const UserDialogs = sequelize.define('user_dialogs', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    date_updated: {
      type: Sequelize.DATE,
    },
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_dialogs',
  });

  return UserDialogs;

}
