module.exports = function(sequelize, Sequelize) {

  const UserAlbums = sequelize.define('user_albums', {
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
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_albums',
  });

  return UserAlbums;

}
