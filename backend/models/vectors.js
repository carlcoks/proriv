module.exports = function(sequelize, Sequelize) {

  const Vectors = sequelize.define('vectors', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    people_id: {
      type: Sequelize.STRING,
    },
    vector: {
      type: Sequelize.STRING,
    },
  }, {
    tableName: 'vectors',
  });

  return Vectors;

}
