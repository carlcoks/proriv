module.exports = function(sequelize, Sequelize) {

  const UserVideouroki = sequelize.define('user_videouroki', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    kurs_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.STRING,
    },
    src: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
    preview: {
      type: Sequelize.STRING,
    },
    files: {
      type: Sequelize.STRING,
    },
    date_created: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'user_videouroki',
  });

  return UserVideouroki;

}
