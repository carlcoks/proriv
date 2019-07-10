module.exports = function(sequelize, Sequelize) {

  const PhotoComments = sequelize.define('photo_comments', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    photo_id: {
      type: Sequelize.INTEGER,
    },
    comment: {
      type: Sequelize.STRING,
    },
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'photo_comments',
  });

  return PhotoComments;

}
