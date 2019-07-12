module.exports = function(sequelize, Sequelize) {

  const UserBookmarks = sequelize.define('user_bookmarks', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    bookmark_user: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: 'user_bookmarks',
  });

  return UserBookmarks;

}
