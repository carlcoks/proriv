module.exports = function(sequelize, Sequelize) {

  const UserVideos = sequelize.define('user_videos', {
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
    src: {
      type: Sequelize.STRING,
    },
    video: {
      type: Sequelize.STRING,
    },
    link: {
      type: Sequelize.STRING,
    },
    date_created: {
      type: Sequelize.DATE,
    },
  }, {
    tableName: 'user_videos',
  });

  return UserVideos;

}
