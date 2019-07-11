module.exports = function(sequelize, Sequelize) {

  const UserInfo = sequelize.define('user_info', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    src: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    bg_image: {
      type: Sequelize.STRING,
    },
    main_sport: {
      type: Sequelize.STRING,
    },
    dop_sport: {
      type: Sequelize.STRING,
    }
  }, {
    tableName: 'user_info',
  });

  return UserInfo;

}
