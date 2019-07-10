module.exports = function(sequelize, Sequelize) {

  const UserToDialog = sequelize.define('user_to_dialog', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    dialog_id: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'user_to_dialog',
  });

  return UserToDialog;

}
