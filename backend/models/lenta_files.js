module.exports = function(sequelize, Sequelize) {

  const LentaFiles = sequelize.define('lenta_files', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    lenta_id: {
      type: Sequelize.INTEGER,
    },
    type: {
      type: Sequelize.STRING,
    },
    src: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'lenta_files',
  });

  return LentaFiles;

}
