module.exports = function(sequelize, Sequelize) {

  const UserPhotos = sequelize.define('user_photos', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    album_id: {
      type: Sequelize.INTEGER,
    },
    src: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    cover: {
      type: Sequelize.INTEGER,
    },
    date_created: {
      type: Sequelize.DATE,
    },
    about: {
      type: Sequelize.STRING,
    }
  }, {
    tableName: 'user_photos',
  });

  return UserPhotos;

}
